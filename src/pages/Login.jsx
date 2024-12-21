import React from 'react';
import { Container, Typography, Button, Paper, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAccount, useConnect } from 'wagmi';

const Login = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  React.useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  const handleConnect = () => {
    const connector = connectors[0];
    if (connector) {
      connect({ connector });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Connect to DeFi Reviews
          </Typography>
          
          <Box sx={{ my: 4 }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleConnect}
            >
              Connect Wallet
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body1" align="center" color="text.secondary">
            Connect your wallet to access DeFi Reviews. We support MetaMask and other Web3 wallets.
          </Typography>

          <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
            Don't have a wallet?{' '}
            <a
              href="https://metamask.io/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit' }}
            >
              Install MetaMask
            </a>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
