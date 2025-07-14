import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  email: { type: String },
  name: { type: String },
  fullName: { type: String },
  age: { type: Number },
  address: { type: String },
  about: { type: String },
  bands: { type: String },
  musicGenres: { type: String },
  photoUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('UserProfile', UserProfileSchema); 