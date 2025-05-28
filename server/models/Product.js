import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productBrand: String,
  productCategory: String,
  productDescription: String,
  oldPrice: { type: Number, required: true },
  newPrice: { type: Number, required: true },  
  productRating: { type: Number, default: 0 },  
  inStock: { type: Boolean, default: true },  
  imageURL: { type: String },                
  secondaryImageURL: { type: String },      
  createdAt: { type: Date, default: Date.now }
});

export const Product = mongoose.model('Product', productSchema);
