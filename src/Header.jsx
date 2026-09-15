import { useSelector } from "react-redux"


const Header = () => {

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  )


  return (
    <header className="header">

      <div className="logo">
        <h2>ShopKart</h2>
      </div>

      <nav className="nav">
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>

      <div className="cart">

        <span className="cart-icon">
          🛒
        </span>

        <span>
          Cart
        </span>

        <span className="cart-count">
          {cartItems.length}
        </span>

      </div>

    </header>
  )
}


export default Header

