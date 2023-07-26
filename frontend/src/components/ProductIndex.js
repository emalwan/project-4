import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductIndex({ cartItems }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await axios.get('/product/index', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    console.log(updatedCartItems);
  };

  const handleDelete = async (productId) => {
    try {
      console.log(productId);
      const response = await axios.post(`/product/delete?id=${productId}`);
      console.log(response);
      getAllProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const allProducts = products.map((product, index) => {
    return (
      <div key={index}>
        <h3 className="heading">{product.name}</h3>
        <h3>{product.type}</h3>
        <button onClick={() => handleDelete(product._id)}>Delete</button>
        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
      </div>
    );
  });

  return <>{allProducts}</>;
}
