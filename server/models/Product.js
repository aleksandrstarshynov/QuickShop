import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productBrand: { type: String, required: true },
  productCategory: { type: String },
  productDescription: { type: String },
  oldPrice: { type: String, required: true },
  newPrice: { type: String, required: true },
  productRating: { type: String },
  inStock: { type: Boolean, default: true },
  availableQuantity: { type: Number, default: 1 },  
  imageURL: { type: String },
  secondaryImageURL: { type: String },
  authorId: { type: String, required: true },            // ID из PostgreSQL
  createdAt: { type: Date, default: Date.now },   
  highlighted: { type: Number,  default: 0 },       
});

const Product = mongoose.model('Product', productSchema);
export default Product;