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

    <Link to="/" className="logo">
    <h2>NexaCart</h2>
    </Link>

<button
  className="menu-button"
  onClick={() => setMenuOpen(!menuOpen)}
>
  ☰
</button>

    <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
     <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
     <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
     <Link to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist ({wishlistItems.length})</Link>
     <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
    </nav>

<Link to="/cart" className="cart">
  <span className="cart-icon">
    🛒
  </span>

  <span>
    Cart
  </span>

  <span className="cart-count">{totalCartItems}</span>
  
</Link>

    </header>
  )
}


export default Header

