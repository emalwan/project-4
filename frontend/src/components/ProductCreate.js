import React, { useState } from 'react';
import axios from 'axios';

export default function ProductCreate() {
  const [newProduct, setNewProduct] = useState({});
  const [userMessage, setUserMessage] = useState('');

  const handleChange = (e) => {
    const attribute = e.target.name;
    const value = e.target.value;
    console.log(attribute, value);

    const currentNewProduct = { ...newProduct };
    currentNewProduct[attribute] = value;
    setNewProduct(currentNewProduct);
    console.log(newProduct);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post('/product/add', newProduct);
    console.log(response);

    if (response.status === 201) {
      setUserMessage('Your Product Has Been Added');
    } else {
      setUserMessage('Something Went Wrong');
    }
  };

  return (
    <div>
      <h1>Create Product!</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} />
        </div>
        <div>
          <label>Price</label>
          <input type="text" name="price" onChange={handleChange} />
        </div>
        <div>
          <label>Description</label>
          <input type="text" name="description" onChange={handleChange} />
        </div>
        <div>
          <label>Roast Type</label>
          <input type="text" name="roastType" onChange={handleChange} />
        </div>
        <div>
          <input type="submit" value="Add Product!" />
        </div>
      </form>
      <p>{userMessage}</p>
    </div>
  );
}
