'use client'
import { Box, Typography, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { getHotelReviews } from '@/services/api'

export default function Dashboard() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getHotelReviews()
        setReviews(data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }
    fetchReviews()
  }, [])

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Dashboard content */}
      </Grid>
    </Box>
  )
}
