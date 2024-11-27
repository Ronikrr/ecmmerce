import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './components/cartcontext';
import { WishlistProvider } from './components/wishlistcontext'; // Import WishlistProvider

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <WishlistProvider> {/* Use WishlistProvider to wrap your app */}
        <App />
      </WishlistProvider>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
