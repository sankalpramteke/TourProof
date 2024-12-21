import express from 'express';
import { roleCheck } from '../middleware/auth.js';
import Tour from '../models/Tour.js';
import { verifyTourOnBlockchain } from '../services/blockchain.js';

const router = express.Router();

// Get all tours
router.get('/', async (req, res) => {
  try {
    const tours = await Tour.find()
      .populate('organizer', 'username email')
      .sort('-createdAt');
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search tours
router.get('/search', async (req, res) => {
  try {
    const tours = await Tour.search(req.query);
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get popular tours
router.get('/popular', async (req, res) => {
  try {
    const { limit } = req.query;
    const tours = await Tour.getPopularTours(parseInt(limit));
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get upcoming tours
router.get('/upcoming', async (req, res) => {
  try {
    const { limit } = req.query;
    const tours = await Tour.getUpcomingTours(parseInt(limit));
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single tour
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
      .populate('organizer', 'username email')
      .populate('reviews.user', 'username');
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create tour (organizers only)
router.post('/', roleCheck(['organizer', 'admin']), async (req, res) => {
  try {
    const tour = new Tour({
      ...req.body,
      organizer: req.user._id
    });
    
    const savedTour = await tour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update tour
router.put('/:id', roleCheck(['organizer', 'admin']), async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    if (tour.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedTour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete tour
router.delete('/:id', roleCheck(['organizer', 'admin']), async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    if (tour.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await tour.remove();
    res.json({ message: 'Tour deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add review to tour
router.post('/:id/reviews', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    const review = {
      user: req.user._id,
      rating: req.body.rating,
      comment: req.body.comment
    };

    tour.reviews.push(review);
    await tour.save();
    
    res.status(201).json(tour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Verify tour on blockchain
router.post('/:id/verify', roleCheck(['admin']), async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    const hash = await verifyTourOnBlockchain(tour);
    tour.verified = true;
    tour.blockchainHash = hash;
    await tour.save();
    
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
