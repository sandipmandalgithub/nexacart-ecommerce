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

    <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
      <span className="logo-mark">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 10H24L22.5 24.5C22.4 25.3 21.7 26 20.8 26H11.2C10.3 26 9.6 25.3 9.5 24.5L8 10Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
          <path d="M11 10C11 7.2 13.2 5 16 5C18.8 5 21 7.2 21 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      </span>
      <span className="logo-text">
        <span className="logo-nexa">Nexa</span><span className="logo-cart">Cart</span>
      </span>
    </Link>

<button
  className="menu-button"
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label="Toggle menu"
>
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
</button>

    <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
     <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
     <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
     <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
       Wishlist
       {wishlistItems.length > 0 && (
         <span className="nav-badge">{wishlistItems.length}</span>
       )}
     </Link>
     <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
    </nav>

<Link to="/cart" className="cart" onClick={() => setMenuOpen(false)}>
  <span className="cart-icon">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 8H18L16.8 20.3C16.7 21.3 15.9 22 14.9 22H9.1C8.1 22 7.3 21.3 7.2 20.3L6 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9 8C9 5.8 10.8 4 13 4C15.2 4 17 5.8 17 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  </span>

  <span className="cart-label">
    Cart
  </span>

  <span className="cart-count">{totalCartItems}</span>
  
</Link>

    </header>
  )
}


export default Header
