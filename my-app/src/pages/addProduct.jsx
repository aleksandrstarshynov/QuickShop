import React, { useState, useContext } from 'react';
import InputField from '../components/InputField';
import { addProduct } from '../services/productService';
import { useAuth } from '../context/authContext';

const AddProduct = () => {
  const { user } = useAuth();
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
  });

  const [formErrors, setFormErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setServerMessage('');

    // Валидация обязательных полей
    const errors = {};
    if (!formData.productName.trim())   errors.productName   = 'Название товара обязательно';
    if (!formData.productBrand.trim())  errors.productBrand  = 'Бренд обязателен';
    if (!formData.oldPrice)             errors.oldPrice      = 'Старая цена обязательна';
    if (!formData.newPrice)             errors.newPrice      = 'Новая цена обязательна';
    if (!formData.imageURL.trim())      errors.imageURL      = 'URL изображения обязателен';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!user || !user.id) {
      setServerMessage('Не авторизован. Невозможно добавить товар.');
      return;
    }

    try {
      const payload = {
        ...formData,
        oldPrice:   Number(formData.oldPrice),
        newPrice:   Number(formData.newPrice),
        authorId:   user.id,
      };

      const response = await addProduct(payload);
      console.log('Product added:', response.data);
      setServerMessage('Товар успешно добавлен');

      // Сброс формы
      setFormData({
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
      });
    } catch (error) {
      if (error.response) {
        console.error('Server error:', error.response.data);
        setServerMessage(`Ошибка сервера: ${error.response.data.message || 'Неизвестная ошибка'}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setServerMessage('Сервер не отвечает');
      } else {
        console.error('Error setting up request:', error.message);
        setServerMessage('Ошибка при настройке запроса');
      }
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Добавить товар</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          error={formErrors.productName}
          placeholder="Название товара"
        />
        <InputField
          name="productBrand"
          value={formData.productBrand}
          onChange={handleChange}
          error={formErrors.productBrand}
          placeholder="Бренд"
        />
        <InputField
          name="productCategory"
          value={formData.productCategory}
          onChange={handleChange}
          placeholder="Категория"
        />
        <InputField
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          placeholder="Описание"
        />
        <InputField
          name="oldPrice"
          type="number"
          value={formData.oldPrice}
          onChange={handleChange}
          error={formErrors.oldPrice}
          placeholder="Старая цена"
        />
        <InputField
          name="newPrice"
          type="number"
          value={formData.newPrice}
          onChange={handleChange}
          error={formErrors.newPrice}
          placeholder="Новая цена"
        />
        <InputField
          name="productRating"
          type="number"
          value={formData.productRating}
          onChange={handleChange}
          placeholder="Рейтинг (0-5)"
        />
        <label>
          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
          />{' '}
          В наличии
        </label>
        <InputField
          name="imageURL"
          value={formData.imageURL}
          onChange={handleChange}
          error={formErrors.imageURL}
          placeholder="URL изображения"
        />
        <InputField
          name="secondaryImageURL"
          value={formData.secondaryImageURL}
          onChange={handleChange}
          placeholder="Доп. URL изображения"
        />

        <button type="submit">Добавить товар</button>
      </form>

      {serverMessage && <p>{serverMessage}</p>}
    </div>
  );
};

export default AddProduct;
