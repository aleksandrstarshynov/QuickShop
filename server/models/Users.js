import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  dateofbirth: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true }
});

export const User = mongoose.model('User', userSchema);
