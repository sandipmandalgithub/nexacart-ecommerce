import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


const Header = () => {

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

      <div className="logo">
        <h2>ShopKart</h2>
      </div>

    <nav className="nav">
     <Link to="/">Home</Link>
     <Link to="/products">Products</Link>
     <Link to="/wishlist">Wishlist({wishlistItems.length})</Link>
     <Link to="/cart">Cart</Link>
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

