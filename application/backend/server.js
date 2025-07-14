import express from 'express';
import cors from 'cors';
import { expressjwt as jwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserProfile from './models/UserProfile.js';
import Gig from './models/Gig.js';

dotenv.config({ path: './backend/.env' });

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Found' : 'Not found');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Auth0 config
const authConfig = {
  domain: 'dev-ettqxdag4t56suua.us.auth0.com',
  audience: 'https://eventfinder/api', // Set this in Auth0 API settings
};

// JWT middleware
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256']
});

// Example protected route
app.get('/api/protected', checkJwt, (req, res) => {
  res.json({ message: 'You are authenticated!', user: req.auth });
});

// Create or update user profile
app.post('/api/profile', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.sub;
    const profileData = req.body;
    let profile = await UserProfile.findOne({ auth0Id });
    if (profile) {
      // Update existing profile
      Object.assign(profile, profileData);
      await profile.save();
    } else {
      // Create new profile
      profile = new UserProfile({ ...profileData, auth0Id });
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    console.error('Profile save error:', err);
    res.status(500).json({ error: 'Failed to save profile' });
  }
});

// Get current user's profile
app.get('/api/profile', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.sub;
    const profile = await UserProfile.findOne({ auth0Id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Create a new gig
app.post('/api/gigs', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.sub;
    const gigData = req.body;
    
    // Create new gig with user reference
    const gig = new Gig({
      ...gigData,
      auth0Id,
      date: new Date(gigData.date)
    });
    
    await gig.save();
    res.status(201).json(gig);
  } catch (err) {
    console.error('Gig save error:', err);
    res.status(500).json({ error: 'Failed to save gig' });
  }
});

// Get all gigs (for the main app)
app.get('/api/gigs', async (req, res) => {
  try {
    const gigs = await Gig.find().sort({ date: 1, time: 1 });
    res.json(gigs);
  } catch (err) {
    console.error('Gigs fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch gigs' });
  }
});

// Get gigs for a specific user
app.get('/api/gigs/my-gigs', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.sub;
    const gigs = await Gig.find({ auth0Id }).sort({ date: 1, time: 1 });
    res.json(gigs);
  } catch (err) {
    console.error('User gigs fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch user gigs' });
  }
});

// Get a specific gig by ID
app.get('/api/gigs/:id', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.sub;
    const gig = await Gig.findOne({ _id: req.params.id, auth0Id });
    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }
    res.json(gig);
  } catch (err) {
    console.error('Gig fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch gig' });
  }
});

// Update a gig
app.put('/api/gigs/:id', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.sub;
    const gigData = req.body;
    
    const gig = await Gig.findOne({ _id: req.params.id, auth0Id });
    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }
    
    // Update gig fields
    Object.assign(gig, {
      ...gigData,
      date: new Date(gigData.date),
      updatedAt: Date.now()
    });
    
    await gig.save();
    res.json(gig);
  } catch (err) {
    console.error('Gig update error:', err);
    res.status(500).json({ error: 'Failed to update gig' });
  }
});

// Delete a gig
app.delete('/api/gigs/:id', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.sub;
    const gig = await Gig.findOneAndDelete({ _id: req.params.id, auth0Id });
    if (!gig) {
      return res.status(404).json({ error: 'Gig not found' });
    }
    res.json({ message: 'Gig deleted successfully' });
  } catch (err) {
    console.error('Gig delete error:', err);
    res.status(500).json({ error: 'Failed to delete gig' });
  }
});

app.listen(4000, () => console.log('API listening on http://localhost:4000'));