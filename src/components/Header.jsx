import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useState } from "react"


const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false)

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  )
  const wishlistItems = useSelector(
  (state) => state.cart.wishlistItems
  ) 

  const totalCartItems = cartItems.reduce(
  (total, item) => total + item.quantity,0)


  return (
    <header className="header">

      <Link to="/" className="logo" aria-label="NexaCart home">
        <span className="logo-mark" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 5h2l1.5 11.5a1 1 0 0 0 1 .9h8.2a1 1 0 0 0 1-.8L20 8H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="9.5" cy="20" r="1.3" fill="currentColor"/>
            <circle cx="17.5" cy="20" r="1.3" fill="currentColor"/>
          </svg>
        </span>
        <h2>NexaCart</h2>
      </Link>

      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {menuOpen ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          )}
        </svg>
      </button>

      <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>

        <Link to="/wishlist" className="nav-action" onClick={() => setMenuOpen(false)}>
          <span className="nav-action-icon" aria-hidden="true">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 20s-7-4.35-9.3-8.6C1.2 8.7 2.3 5.5 5.4 5.1c1.8-.24 3.5.64 4.6 2 1.1-1.36 2.8-2.24 4.6-2 3.1.4 4.2 3.6 2.7 6.3C19 15.65 12 20 12 20z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
            </svg>
          </span>
          <span>Wishlist</span>
          <span className="badge">{wishlistItems.length}</span>
        </Link>
      </nav>

      <Link to="/cart" className="cart">
        <span className="cart-icon" aria-hidden="true">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 5h2l1.5 11.5a1 1 0 0 0 1 .9h8.2a1 1 0 0 0 1-.8L20 8H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="9.5" cy="20" r="1.3" fill="currentColor"/>
            <circle cx="17.5" cy="20" r="1.3" fill="currentColor"/>
          </svg>
        </span>
        <span>Cart</span>
        <span className="cart-count">{totalCartItems}</span>
      </Link>

    </header>
  )
}


export default Header
