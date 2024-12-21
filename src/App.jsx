import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Import components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SubmitReview from './pages/SubmitReview';
import BrowseReviews from './pages/BrowseReviews';
import Wallet from './pages/Wallet';
import BrowseHotels from './pages/BrowseHotels';
import HotelDetails from './pages/HotelDetails';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
          <Navbar />
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/submit" element={<SubmitReview />} />
              <Route path="/browse" element={<BrowseReviews />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/hotels" element={<BrowseHotels />} />
              <Route path="/hotel/:id" element={<HotelDetails />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
