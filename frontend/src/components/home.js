import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home-container">
      <h1 className="heading">Welcome to West Coast Coffee Store</h1>
      <h2 className="sub-heading">Explore our selection of coffee beans:</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Roast Level: {product.roastLevel}</p>
            <p>Origin: {product.origin}</p>
            <p>Flavor Profile: {product.flavorProfile}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
