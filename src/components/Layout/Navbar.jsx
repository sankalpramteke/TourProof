import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleWalletClick = async () => {
    if (isConnected) {
      await disconnect();
    } else {
      const connector = connectors[0];
      if (connector) {
        await connect({ connector });
      }
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
          TourProof
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/browse">Browse Reviews</Button>
          <Button color="inherit" component={Link} to="/hotels">Browse Hotels</Button>
          <Button color="inherit" component={Link} to="/submit">Submit Review</Button>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/wallet">Wallet</Button>
          <Button 
            variant="outlined" 
            color="inherit"
            onClick={handleWalletClick}
            sx={{ ml: 1 }}
          >
            {isConnected ? formatAddress(address) : 'Connect Wallet'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
