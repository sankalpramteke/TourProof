'use client'
import { Box, Typography, Button, Container, Grid } from '@mui/material'
import Link from 'next/link'

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item xs={12} textAlign="center">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to TourProof
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Your trusted platform for verified hotel reviews on the blockchain
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Link href="/browse-hotels" passHref style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="large">
                Browse Hotels
              </Button>
            </Link>
            <Link href="/reviews" passHref style={{ textDecoration: 'none' }}>
              <Button variant="outlined" size="large">
                View Reviews
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
