import { tourStore } from '../services/store.js';

class Tour {
  static async create(tourData) {
    return tourStore.create({
      ...tourData,
      reviews: [],
      ratings: [],
      averageRating: 0,
      verified: false
    });
  }

  static async findById(id) {
    return tourStore.getById(id);
  }

  static async findAll() {
    return tourStore.getAll();
  }

  static async update(id, data) {
    return tourStore.update(id, data);
  }

  static async delete(id) {
    return tourStore.delete(id);
  }

  static async addReview(tourId, review) {
    const tour = await this.findById(tourId);
    if (!tour) return null;

    tour.reviews = tour.reviews || [];
    tour.ratings = tour.ratings || [];
    
    tour.reviews.push(review);
    tour.ratings.push(review.rating);
    
    // Calculate average rating
    tour.averageRating = tour.ratings.reduce((a, b) => a + b, 0) / tour.ratings.length;
    
    return tourStore.update(tourId, tour);
  }

  static async findByOrganizer(organizerId) {
    return tourStore.query(tour => tour.organizer === organizerId);
  }

  // Add search functionality
  static async search(params) {
    const {
      query,
      minPrice,
      maxPrice,
      location,
      startDate,
      endDate,
      duration
    } = params;

    return tourStore.query(tour => {
      let matches = true;

      // Text search
      if (query) {
        const searchText = query.toLowerCase();
        matches = matches && (
          tour.name.toLowerCase().includes(searchText) ||
          tour.description.toLowerCase().includes(searchText) ||
          tour.location.toLowerCase().includes(searchText)
        );
      }

      // Price range
      if (minPrice) matches = matches && tour.price >= minPrice;
      if (maxPrice) matches = matches && tour.price <= maxPrice;

      // Location
      if (location) {
        matches = matches && tour.location.toLowerCase().includes(location.toLowerCase());
      }

      // Date range
      if (startDate) matches = matches && new Date(tour.startDate) >= new Date(startDate);
      if (endDate) matches = matches && new Date(tour.endDate) <= new Date(endDate);

      // Duration
      if (duration) matches = matches && tour.duration === parseInt(duration);

      return matches;
    });
  }

  // Add popular tours feature
  static async getPopularTours(limit = 5) {
    const tours = await tourStore.getAll();
    return tours
      .sort((a, b) => (b.ratings?.length || 0) - (a.ratings?.length || 0))
      .slice(0, limit);
  }

  // Add upcoming tours feature
  static async getUpcomingTours(limit = 5) {
    const now = new Date();
    const tours = await tourStore.query(tour => 
      new Date(tour.startDate) > now
    );
    return tours
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      .slice(0, limit);
  }
}

export default Tour;
