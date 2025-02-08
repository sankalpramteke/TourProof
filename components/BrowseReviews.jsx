'use client'
import { useState } from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Pagination,
  Chip,
} from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified'

export default function BrowseReviews() {
  const [sortBy, setSortBy] = useState('recent')
  const [page, setPage] = useState(1)

  // Mock data - replace with actual data from your backend/blockchain
  const mockReviews = [
    {
      id: 1,
      service: 'Grand Hotel',
      text: 'Excellent stay! The service was outstanding and the rooms were clean.',
      verified: true,
      date: '2024-12-19',
    },
    {
      id: 2,
      service: 'City Restaurant',
      text: 'Great food and atmosphere. Highly recommended!',
      verified: true,
      date: '2024-12-18',
    },
    // Add more mock reviews as needed
  ]

  const handleSortChange = (event) => {
    setSortBy(event.target.value)
  }

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Browse Reviews
        </Typography>

        {/* Filters and Sorting */}
        <Box sx={{ mb: 4 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={handleSortChange}
            >
              <MenuItem value="recent">Most Recent</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="rating">Highest Rated</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Reviews Grid */}
        <Grid container spacing={3}>
          {mockReviews.map((review) => (
            <Grid item xs={12} key={review.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="h2">
                      {review.service}
                    </Typography>
                    {review.verified && (
                      <Chip
                        icon={<VerifiedIcon />}
                        label="Verified"
                        color="primary"
                        size="small"
                      />
                    )}
                  </Box>
                  <Typography variant="body1" paragraph>
                    {review.text}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Posted on: {review.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination 
            count={10} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
          />
        </Box>
      </Box>
    </Container>
  )
}
