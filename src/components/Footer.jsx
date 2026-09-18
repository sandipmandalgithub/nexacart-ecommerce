import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="NexaCart home">
              <span className="footer-logo-mark" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 17V7.6a.6.6 0 0 1 1.05-.4l8.9 9.6a.6.6 0 0 0 1.05-.4V7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="footer-logo-name">NexaCart</span>
            </Link>
            <p className="footer-desc">
              A modern e-commerce experience built for simple and seamless online shopping.
            </p>
          </div>

          <nav className="footer-col" aria-label="Quick links">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Customer support">
            <h3 className="footer-heading">Customer Support</h3>
            <ul className="footer-links">
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#shipping">Shipping &amp; Delivery</a></li>
              <li><a href="#returns">Returns &amp; Refunds</a></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Company">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              <li><a href="#about">About NexaCart</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms &amp; Conditions</a></li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">&copy; 2026 NexaCart. All rights reserved.</p>
          <p className="footer-built">Built with React, Redux Toolkit &amp; REST API</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
