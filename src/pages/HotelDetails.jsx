import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Rating,
  Button,
  Box,
  TextField,
  Paper,
  Divider,
  Alert,
  IconButton,
  Avatar,
  Stack
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// Mock data - Replace with actual API call
const mockHotelDetails = {
  id: 1,
  name: "Luxury Palace Hotel",
  location: "Downtown City",
  price: 200,
  rating: 4.5,
  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500",
  description: "Experience luxury at its finest with our premium accommodations.",
  amenities: [
    "Free Wi-Fi",
    "Swimming Pool",
    "Spa",
    "Fitness Center",
    "Restaurant",
    "24/7 Room Service"
  ],
  rooms: [
    { id: 1, type: "Deluxe Room", price: 200 },
    { id: 2, type: "Executive Suite", price: 350 },
    { id: 3, type: "Presidential Suite", price: 500 }
  ]
};

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    user: "John Doe",
    rating: 5,
    date: "2023-12-15",
    comment: "Amazing stay! The views were breathtaking and service was excellent.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
    ]
  },
  {
    id: 2,
    user: "Jane Smith",
    rating: 4,
    date: "2023-12-10",
    comment: "Great location and comfortable rooms. Would recommend!",
    images: [
      "https://images.unsplash.com/photo-1601919051950-bb9f3ffb3fee"
    ]
  }
];

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel] = useState(mockHotelDetails);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Review state
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewImages, setReviewImages] = useState([]);
  const [reviews, setReviews] = useState(mockReviews);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleBooking = () => {
    setBookingSuccess(true);
    setCheckIn(null);
    setCheckOut(null);
    setGuests(1);
    setSelectedRoom(null);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setReviewImages([...reviewImages, ...newImages]);
  };

  const handleReviewSubmit = () => {
    const newReview = {
      id: reviews.length + 1,
      user: "Current User",
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewComment,
      images: reviewImages
    };
    setReviews([newReview, ...reviews]);
    setReviewRating(0);
    setReviewComment('');
    setReviewImages([]);
    setReviewSubmitted(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {bookingSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Booking successful! Check your email for confirmation.
        </Alert>
      )}
      {reviewSubmitted && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Thank you for your review!
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={hotel.image}
              alt={hotel.name}
            />
            <Box sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>
                {hotel.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={hotel.rating} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({hotel.rating})
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                {hotel.description}
              </Typography>
              
              <Typography variant="h6" gutterBottom>
                Amenities
              </Typography>
              <Grid container spacing={1}>
                {hotel.amenities.map((amenity, index) => (
                  <Grid item key={index} xs={6} sm={4}>
                    <Typography variant="body2">• {amenity}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Card>

          {/* Write Review Section */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" gutterBottom>
              Write a Review
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography component="legend">Rating</Typography>
              <Rating
                value={reviewRating}
                onChange={(event, newValue) => setReviewRating(newValue)}
                precision={0.5}
              />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Review"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ mb: 2 }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                multiple
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<PhotoCamera />}
                >
                  Upload Photos
                </Button>
              </label>
            </Box>
            {reviewImages.length > 0 && (
              <ImageList sx={{ width: '100%', height: 200 }} cols={3} rowHeight={164}>
                {reviewImages.map((image, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={image}
                      alt={`Review image ${index + 1}`}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
            <Button
              variant="contained"
              onClick={handleReviewSubmit}
              disabled={!reviewRating || !reviewComment}
              sx={{ mt: 2 }}
            >
              Submit Review
            </Button>
          </Paper>

          {/* Previous Reviews Section */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" gutterBottom>
              Guest Reviews
            </Typography>
            <Stack spacing={3}>
              {reviews.map((review) => (
                <Box key={review.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ mr: 2 }}>{review.user[0]}</Avatar>
                    <Box>
                      <Typography variant="subtitle1">{review.user}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={review.rating} readOnly size="small" />
                        <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                          {review.date}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {review.comment}
                  </Typography>
                  {review.images && review.images.length > 0 && (
                    <ImageList sx={{ width: '100%', height: 200 }} cols={3} rowHeight={164}>
                      {review.images.map((image, index) => (
                        <ImageListItem key={index}>
                          <img
                            src={image}
                            alt={`Review image ${index + 1}`}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  )}
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Booking Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Book Your Stay
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ mb: 2 }}>
                <DatePicker
                  label="Check-in Date"
                  value={checkIn}
                  onChange={setCheckIn}
                  sx={{ width: '100%' }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <DatePicker
                  label="Check-out Date"
                  value={checkOut}
                  onChange={setCheckOut}
                  sx={{ width: '100%' }}
                />
              </Box>
            </LocalizationProvider>

            <TextField
              fullWidth
              type="number"
              label="Number of Guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              InputProps={{ inputProps: { min: 1, max: 10 } }}
              sx={{ mb: 2 }}
            />

            <Typography variant="h6" gutterBottom>
              Select Room Type
            </Typography>
            <Grid container spacing={1} sx={{ mb: 2 }}>
              {hotel.rooms.map((room) => (
                <Grid item xs={12} key={room.id}>
                  <Button
                    variant={selectedRoom === room.id ? "contained" : "outlined"}
                    fullWidth
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    {room.type} - ${room.price}/night
                  </Button>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleBooking}
              disabled={!checkIn || !checkOut || !selectedRoom}
            >
              Book Now
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HotelDetails;
