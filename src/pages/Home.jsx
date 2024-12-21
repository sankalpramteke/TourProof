import React from 'react';
import { Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Home = () => {
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
              <Button variant="contained" component={Link} to="/submit" size="large">
                Submit a Review
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" component={Link} to="/browse" size="large">
                Browse Reviews
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ py: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <VerifiedUserIcon sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Verified Reviews
              </Typography>
              <Typography variant="body1" color="text.secondary">
                All reviews are verified through blockchain technology, ensuring authenticity and trust.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <SecurityIcon sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Blockchain Security
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Immutable and transparent review system powered by blockchain technology.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <MonetizationOnIcon sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Earn Rewards
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Get rewarded with tokens for submitting verified reviews and contributing to the platform.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
