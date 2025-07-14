import mongoose from 'mongoose';

const GigSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true }, // Reference to the user who created the gig
  band: { type: String, required: true },
  venue: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  description: { type: String },
  genre: { type: String },
  ticketPrice: { type: String },
  ticketLink: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

GigSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Gig', GigSchema); 