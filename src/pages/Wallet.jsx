import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const Wallet = () => {
  // Mock data - replace with actual data from your blockchain/backend
  const walletData = {
    address: '0x1234...5678',
    balance: '1000',
    rewards: '50',
    transactions: [
      {
        id: 1,
        type: 'Reward',
        amount: '10',
        date: '2024-12-19',
        status: 'Completed',
      },
      {
        id: 2,
        type: 'Withdrawal',
        amount: '20',
        date: '2024-12-18',
        status: 'Pending',
      },
    ],
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" sx={{ my: 4 }}>
        Wallet & Rewards
      </Typography>

      <Grid container spacing={4}>
        {/* Wallet Info */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Wallet Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                Address: {walletData.address}
              </Typography>
              <Typography variant="h5" gutterBottom>
                Balance: {walletData.balance} TOKENS
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                Available Rewards: {walletData.rewards} TOKENS
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Button variant="contained" fullWidth>
                Withdraw Rewards
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Transaction History */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Transaction History
            </Typography>
            <List>
              {walletData.transactions.map((transaction, index) => (
                <React.Fragment key={transaction.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={`${transaction.type} - ${transaction.amount} TOKENS`}
                      secondary={`${transaction.date} • ${transaction.status}`}
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Rewards Info */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              How to Earn Rewards
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Submit Verified Reviews
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Earn 10 tokens for each verified review you submit
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Engage with Community
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Earn tokens by participating in discussions and voting
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Refer Friends
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get bonus tokens when your referrals submit their first review
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Wallet;
