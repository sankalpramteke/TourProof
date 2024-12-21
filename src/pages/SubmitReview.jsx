import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Box,
  Alert,
} from '@mui/material';

const SubmitReview = () => {
  const [formData, setFormData] = useState({
    service: '',
    review: '',
    proofFile: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const services = [
    { value: 'hotel', label: 'Hotel' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'attraction', label: 'Attraction' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      proofFile: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.service || !formData.review || !formData.proofFile) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Here you would implement the actual submission logic
      // For now, we'll just simulate success
      setSuccess(true);
      setFormData({
        service: '',
        review: '',
        proofFile: null,
      });
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" sx={{ my: 4 }}>
        Submit a Review
      </Typography>

      <Paper sx={{ p: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 3 }}>Review submitted successfully!</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            select
            fullWidth
            label="Select Service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            sx={{ mb: 3 }}
          >
            {services.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Box sx={{ mb: 3 }}>
            <input
              accept="image/*,.pdf"
              style={{ display: 'none' }}
              id="proof-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="proof-file">
              <Button variant="outlined" component="span">
                Upload Proof of Purchase
              </Button>
            </label>
            {formData.proofFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {formData.proofFile.name}
              </Typography>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
          >
            Submit Review
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SubmitReview;
