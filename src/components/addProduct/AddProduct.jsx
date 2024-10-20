import { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import PasswordModal from '../passwordModal/PasswordModal';

function AddProduct() {
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'phones',
    new_price: '',
    old_price: '',
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    let newErrors = {};

    // Check if the product name is empty
    if (!productDetails.name) newErrors.name = 'Product name is required';

    // Check if the old price is a number and not empty
    if (!productDetails.old_price) {
      newErrors.old_price = 'Old price is required';
    } else if (isNaN(productDetails.old_price)) {
      newErrors.old_price = 'Old price must be a number';
    }

    // Check if the new price is a number and not empty
    if (!productDetails.new_price) {
      newErrors.new_price = 'Offer price is required';
    } else if (isNaN(productDetails.new_price)) {
      newErrors.new_price = 'Offer price must be a number';
    }

    // Check if an image is uploaded
    if (!image) newErrors.image = 'Product image is required';

    return newErrors;
  };

  const Add_Product = async () => {
    // Validate fields before submitting
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if validation fails
      return; // Stop the function from continuing
    } else {
      setErrors({}); // Clear errors if validation passes
    }

    let responseData;
    let formData = new FormData();
    formData.append('product', image);

    // Upload the image
    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      // Add product data once image is uploaded
      const product = { ...productDetails, image: responseData.image_url };

      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          data.success ? alert('Product added!') : alert('Failed');
        });

      // Reset form
      setProductDetails({
        name: '',
        image: '',
        category: 'phones',
        new_price: '',
        old_price: '',
      });
      setImage(null); // Reset image preview
    }
  };

  if (!isAuthenticated) {
    return <PasswordModal onSubmit={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className='add-product'>
      <div className='addproduct-itemfield'>
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type='text'
          name='name'
          placeholder='Type here'
        />
        {errors.name && <p className='error'>{errors.name}</p>}
      </div>
      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
          <p>Price</p>
          <input
            type='text'
            value={productDetails.old_price}
            onChange={changeHandler}
            name='old_price'
            placeholder='Type here'
          />
          {errors.old_price && <p className='error'>{errors.old_price}</p>}
        </div>
        <div className='addproduct-itemfield'>
          <p>Offer Price</p>
          <input
            type='text'
            value={productDetails.new_price}
            onChange={changeHandler}
            name='new_price'
            placeholder='Type here'
          />
          {errors.new_price && <p className='error'>{errors.new_price}</p>}
        </div>
      </div>
      <div className='addproduct-itemfield'>
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name='category'
          className='addproduct-selector'
        >
          <option value='phones'>Phones</option>
          <option value='computers'>Computers</option>
          <option value='accessories'>Accessories</option>
        </select>
      </div>
      <div className='addproduct-itemfield'>
        <label htmlFor='file-input'>
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt='Upload Area'
            className='addproduct-image'
          />
        </label>
        <input 
          onChange={imageHandler} 
          type='file' 
          name='image' 
          id='file-input' 
          hidden 
          key={image ? image.name : ''} // Add key to force re-render
        />
        {errors.image && <p className='error'>{errors.image}</p>}
      </div>
      <button onClick={Add_Product} className='addproduct-button'>
        ADD
      </button>
    </div>
  );
}

export default AddProduct;
