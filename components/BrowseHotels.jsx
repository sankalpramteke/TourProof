'use client'
import { useState, useEffect } from 'react'
import { Box, Typography, Grid, Card, CardContent } from '@mui/material'
import Link from 'next/link'

export default function BrowseHotels() {
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    // Fetch hotels logic here
  }, [])

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Browse Hotels
      </Typography>
      <Grid container spacing={3}>
        {hotels.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel.id}>
            <Link href={`/hotel/${hotel.id}`} passHref style={{ textDecoration: 'none' }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{hotel.name}</Typography>
                  <Typography color="text.secondary">{hotel.location}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
