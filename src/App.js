// App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Home from './pages/home';
import Product from './pages/productpage';
import Account from './pages/account';
import CategoryPage from './pages/categories';
import Viewpro from './components/viewproduct';
import Cart from './pages/cart';
import NotFound from './pages/NotFound';
import Checkoutpage from './components/checkoutpage';
import Categories from './components/categoriesview';
import Wishlistpage from './pages/wishlistpage';
import Footer from './components/footer';
import Login from './components/login';
import Register from './components/register';
import { WishlistProvider } from './components/wishlistcontext';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from './components/cartcontext'; // Adjust the path as needed
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Adjusted import for named export
import CartSection from './components/cartsection'; // Adjust the path as needed
import Deleteproduct from './components/deleteproduct'
import Editcategory from './components/editcategory'
function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded = jwtDecode(token); // Use jwtDecode here
        setUserId(decoded.userId); // Extract userId from the token
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <Router>
      <WishlistProvider>
        <CartProvider>
          {/* Conditionally render Header and Footer based on the current path */}
          <ConditionalHeader />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/productpage' element={<Product />} />
            <Route path='/category/:id/productpage/:id' element={<Viewpro />} />
            <Route path='/account' element={<Account />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/deleteproduct' element={<Deleteproduct />} />
            <Route path='/editcategory' element={<Editcategory />} />
            <Route path='/category' element={<CategoryPage />} />
            <Route path='/category/:id' element={<Categories />} />
            <Route path='/wishlistpage' element={<Wishlistpage />} />
            <Route path='/checkout/:price' element={<Checkoutpage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>

          {/* Render CartSection if userId is available */}
          {userId && <CartSection userId={userId} />}

          <ConditionalFooter />
        </CartProvider>
      </WishlistProvider>
    </Router>
  );
}

const ConditionalHeader = () => {
  const location = useLocation();
  const hideHeaderRoutes = ['/login', '/register', '*']; // Add other routes if needed

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
    </>
  );
};

const ConditionalFooter = () => {
  const location = useLocation();
  const hideFooterRoutes = ['/login', '/register', '*']; // Add other routes if needed

  return (
    <>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

export default App;
