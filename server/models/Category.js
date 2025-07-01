import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
});

categorySchema.pre('validate', function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().trim().replace(/\s+/g, '-');
  }
  next();
});

export default mongoose.model('Category', categorySchema);
