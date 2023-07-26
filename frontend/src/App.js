import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import ProductIndex from './components/ProductIndex';
import ProductCreate from './components/ProductCreate';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import About from './components/About';
import Home from './components/home';
import ContactUs from './components/ContactUs';
import Reviews from './components/Reviews';
import Cart from './components/Cart';
import './App.css'

export default function App() {
  const [isAuth, setIsAuth] = useState(false); // user is logged in or not
  const [user, setUser] = useState({}); // Contain User, if any.
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token != null) {
      let user = jwt_decode(token);
      setIsLoggedIn(true);

      if (user) {
        setIsAuth(true);
        setUser(user);
      } else if (!user) {
        localStorage.removeItem('token');
        setIsAuth(false);
      }
    }
  }, []);
  

  const registerHandler = (user) => {
    axios
      .post('auth/signup', user)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginHandler = (cred) => {
    axios
      .post('auth/signin', cred)
      .then((res) => {
        console.log(res.data.token);

        let token = res.data.token;
        if (token != null) {
          localStorage.setItem('token', token);
          let user = jwt_decode(token);
          setIsAuth(true);
          setUser(user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setIsAuth(false);
    setUser(null);
  };

  return (
    <>
      <h1 className='brand'>west-coast coffee</h1>
      <Router>
        <nav>
          <div>
          <Link to="/home">Home</Link> &nbsp;
       <Link to="/products">Products</Link> &nbsp;
       {!isLoggedIn && (
            <>
              <Link to="/signup">Signup</Link> &nbsp;
              <Link to="/signin">Signin</Link> &nbsp;
            </>
          )}
       <Link to="/about">About</Link> &nbsp;
       <Link to="/contact-us">Contact Us</Link> &nbsp;
       <Link to="/reviews">Reviews</Link> &nbsp;
       <Link to="/cart">Cart</Link> &nbsp;
       <Link to="/logout" onClick={logoutHandler}>
              Logout
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/products"
            element={
              isAuth ? (
                <ProductIndex />
              ) : (
                <Signin login={loginHandler}></Signin>
              )
            }
          />
          <Route path="/signup" element={<Signup register={registerHandler} />} />
          <Route path="/signin" element={<Signin login={loginHandler}></Signin>} />
          <Route path="/about" element={<About />} />
          <Route path="/create-product" element={<ProductCreate />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/cart"
     element={<Cart cartItems={cartItems} />}
   />
        </Routes>
      </Router>
    </>
  );
}
