import React from 'react';
import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data - replace with actual data from your backend/blockchain
  const stats = {
    totalReviews: 12,
    tokensEarned: 240,
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" sx={{ my: 4 }}>
        My Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Stats Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">Total Reviews</Typography>
                <Typography variant="h4">{stats.totalReviews}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Tokens Earned</Typography>
                <Typography variant="h4">{stats.tokensEarned}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Actions Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                component={Link}
                to="/submit"
                fullWidth
              >
                Submit New Review
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/wallet"
                fullWidth
              >
                View Wallet
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Reviews Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              My Recent Reviews
            </Typography>
            {/* Add your reviews list component here */}
            <Typography variant="body1" color="text.secondary">
              No reviews yet. Start by submitting your first review!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
