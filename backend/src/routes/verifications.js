import express from 'express';
import { roleCheck } from '../middleware/auth.js';
import { verifyTourOnBlockchain } from '../services/blockchain.js';
import Tour from '../models/Tour.js';

const router = express.Router();

// Verify a tour on blockchain
router.post('/:tourId', roleCheck(['admin']), async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.tourId);
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    const hash = await verifyTourOnBlockchain(tour);
    tour.verified = true;
    tour.blockchainHash = hash;
    await tour.save();

    res.json({ message: 'Tour verified successfully', tour });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check verification status
router.get('/:tourId', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.tourId)
      .select('verified blockchainHash');
    
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.json({
      verified: tour.verified,
      blockchainHash: tour.blockchainHash
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
