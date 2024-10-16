import React, {useState} from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

function AddProduct() {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({...productDetails, [e.target.name]: e.target.value});
  };

  const Add_Product = async() => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append('product', image);
    await fetch('http://localhost:4000/upload', {
      method: 'Post',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then(res => res.json()).then(data => responseData = data);
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct', {
        method: 'Post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then(res => res.json()).then(data => {
        data.success?alert("Product added!") : alert("Failed")
      })
    }
  };

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name='name'
          placeholder='Type here'
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="text"
            value={productDetails.old_price}
            onChange={changeHandler}
            name='old_price'
            placeholder='Type here'
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="text"
            value={productDetails.new_price}
            onChange={changeHandler}
            name='new_price'
            placeholder='Type here'
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className='addproduct-selector'
        >
          <option>Select</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className='addproduct-itemfield'>
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='addproduct-image' />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={Add_Product} className='addproduct-button'>ADD</button>
    </div>
  );
}

export default AddProduct;
