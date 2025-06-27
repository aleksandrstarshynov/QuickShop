import React, { useState } from 'react';
import InputField from '../components/InputField';
import { addProduct } from '../services/productService';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productBrand: '',
    productCategory: '',
    productDescription: '',
    oldPrice: '',
    newPrice: '',
    productRating: '',
    inStock: true,
    imageURL: '',
    secondaryImageURL: '',
    createdAt: new Date().toISOString(),
    authorId: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: finalValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setServerMessage('');

    // validation
    const errors = {};
    if (!formData.productName) errors.productName = 'Product name is required';
    if (!formData.productBrand) errors.productBrand = 'Brand is required';
    if (!formData.newPrice) errors.newPrice = 'New price is required';
    if (!formData.imageURL) errors.imageURL = 'Main image URL is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

try {
  const response = await addProduct(formData);

  // successful response
  console.log('Product added:', response.data);
  setServerMessage('Product added successfully');

} catch (error) {
  // В axios errors

  if (error.response) {
    console.error('Server error:', error.response.data);
    setServerMessage(`Server error: ${error.response.data.message || 'Unknown error'}`);
  } else if (error.request) {

    console.error('No response received:', error.request);
    setServerMessage('No response from server');
  } else {
    console.error('Error setting up request:', error.message);
    setServerMessage('Request setup error');
  }
}
  };

  return (
    <div className="form-wrapper">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          error={formErrors.productName}
          placeholder="Product Name"
        />
        <InputField
          name="productBrand"
          value={formData.productBrand}
          onChange={handleChange}
          error={formErrors.productBrand}
          placeholder="Brand"
        />
        <InputField
          name="productCategory"
          value={formData.productCategory}
          onChange={handleChange}
          placeholder="Category"
        />
        <InputField
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          placeholder="Description"
        />
        <InputField
          name="oldPrice"
          type="number"
          value={formData.oldPrice}
          onChange={handleChange}
          placeholder="Old Price"
        />
        <InputField
          name="newPrice"
          type="number"
          value={formData.newPrice}
          onChange={handleChange}
          error={formErrors.newPrice}
          placeholder="New Price"
        />
        <InputField
          name="productRating"
          type="number"
          value={formData.productRating}
          onChange={handleChange}
          placeholder="Rating (0-5)"
        />
        <label>
          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
          />{' '}
          In Stock
        </label>
        <InputField
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
          error={formErrors.imageURL}
          placeholder="Image URL"
        />
        <InputField
          name="secondaryImageURL"
          value={formData.secondaryImageURL}
          onChange={handleChange}
          placeholder="Secondary Image URL"
        />

        <button type="submit">Add Product</button>
      </form>

      {serverMessage && <p>{serverMessage}</p>}
    </div>
  );
};

export default AddProduct;
