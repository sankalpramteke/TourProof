import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { tourAPI } from '../services/api';

const Home = () => {
  const [popularTours, setPopularTours] = useState([]);
  const [upcomingTours, setUpcomingTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const [popularRes, upcomingRes] = await Promise.all([
          tourAPI.getPopular(3),
          tourAPI.getUpcoming(3)
        ]);
        setPopularTours(popularRes.data);
        setUpcomingTours(upcomingRes.data);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setError('Failed to load tours. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography color="error" align="center">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Grid container spacing={4} sx={{ py: 8 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" component="h1" gutterBottom>
            Decentralized Review Platform
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Trust in reviews, powered by blockchain technology. Submit verified reviews and earn rewards.
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                component={Link}
                to="/tours"
                variant="contained"
                color="primary"
                size="large"
              >
                Explore Tours
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/register"
                variant="outlined"
                size="large"
              >
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ py: 8 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <SecurityIcon sx={{ fontSize: 40, mb: 2 }} color="primary" />
              <Typography variant="h5" component="h2" gutterBottom>
                Secure & Transparent
              </Typography>
              <Typography>
                All reviews are stored on the blockchain, ensuring transparency and immutability.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <VerifiedUserIcon sx={{ fontSize: 40, mb: 2 }} color="primary" />
              <Typography variant="h5" component="h2" gutterBottom>
                Verified Reviews
              </Typography>
              <Typography>
                Only verified users can submit reviews, maintaining authenticity.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <MonetizationOnIcon sx={{ fontSize: 40, mb: 2 }} color="primary" />
              <Typography variant="h5" component="h2" gutterBottom>
                Earn Rewards
              </Typography>
              <Typography>
                Get rewarded for contributing authentic reviews to the platform.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Popular Tours Section */}
      <Typography variant="h4" sx={{ mt: 6, mb: 3 }}>
        Popular Tours
      </Typography>
      <Grid container spacing={3}>
        {popularTours.map((tour) => (
          <Grid item xs={12} sm={6} md={4} key={tour.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{tour.name}</Typography>
                <Typography color="text.secondary">{tour.location}</Typography>
                <Typography>Price: ${tour.price}</Typography>
                <Button
                  component={Link}
                  to={`/tours/${tour.id}`}
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Upcoming Tours Section */}
      <Typography variant="h4" sx={{ mt: 6, mb: 3 }}>
        Upcoming Tours
      </Typography>
      <Grid container spacing={3}>
        {upcomingTours.map((tour) => (
          <Grid item xs={12} sm={6} md={4} key={tour.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{tour.name}</Typography>
                <Typography color="text.secondary">{tour.location}</Typography>
                <Typography>
                  Date: {new Date(tour.startDate).toLocaleDateString()}
                </Typography>
                <Button
                  component={Link}
                  to={`/tours/${tour.id}`}
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
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

export default Home;
