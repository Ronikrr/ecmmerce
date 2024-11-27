import React from 'react';
// import './Footer.css'; 
import { Link } from 'react-router-dom';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top:0,
            behavior:'smooth'
        });
    };
  return (
    <footer className="footer mt-auto py-4 bg-dark text-white">
      <div className="container">
        <div className="row py-5 ">
          {/* Column 1: Company Info */}
          <div className="col-12 col-md-4 mb-3">
            <h5>websolex infotech</h5>
            <p>123 Main St, Toronto, ON M1A 2B3, Canada</p>
            <p>Email: websolexinfotech@gmail.com</p>
            <p>Phone: +919727168583</p>
          </div>
          <div className="col-6 col-md-2 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" onClick={scrollToTop}  className="text-white">Home</Link></li>
              <li><Link to="/productpage" onClick={scrollToTop}  className="text-white">Product</Link></li>
              <li><Link to="/category" onClick={scrollToTop}  className="text-white">Categorys</Link></li>
              <li><Link to="#contact"  onClick={scrollToTop} className="text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div className="col-6 col-md-2 mb-3">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><Link to="#facebook" onClick={scrollToTop}  className="text-white">Facebook</Link></li>
              <li><Link to="#twitter" onClick={scrollToTop}  className="text-white">Twitter</Link></li>
              <li><Link to="#instagram" onClick={scrollToTop}  className="text-white">Instagram</Link></li>
              <li><Link to="#linkedin" onClick={scrollToTop}  className="text-white">LinkedIn</Link></li>
            </ul>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <h5>Subscribe to our Newsletter</h5>
            <form>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Enter your email" />
                <button className="btn btn-primary" type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-12 text-center">
            <p className="mt-3">© 2024 websolex . All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
