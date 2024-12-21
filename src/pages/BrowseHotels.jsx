import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Rating,
  Button,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Mock data - Replace with actual API call later
const mockHotels = [
  {
    id: 1,
    name: "Luxury Palace Hotel",
    location: "Downtown City",
    price: 200,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500",
    description: "Experience luxury at its finest with our premium accommodations."
  },
  {
    id: 2,
    name: "Seaside Resort",
    location: "Beach Front",
    price: 300,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=500",
    description: "Beachfront paradise with stunning ocean views."
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: "Alpine Heights",
    price: 250,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1601919051950-bb9f3ffb3fee?auto=format&fit=crop&w=500",
    description: "Cozy mountain retreat with breathtaking views and outdoor activities."
  },
  // Add more mock hotels as needed
];

const BrowseHotels = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState(mockHotels);

  const handleHotelClick = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom component="h1">
        Browse Hotels
      </Typography>
      
      <Grid container spacing={3}>
        {hotels.map((hotel) => (
          <Grid item key={hotel.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out'
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={hotel.image}
                alt={hotel.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {hotel.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {hotel.location}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={hotel.rating} precision={0.5} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({hotel.rating})
                  </Typography>
                </Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  ${hotel.price}/night
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hotel.description}
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  onClick={() => handleHotelClick(hotel.id)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BrowseHotels;
