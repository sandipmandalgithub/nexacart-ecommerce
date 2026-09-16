import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  addToWishlist
} from "../../redux/slice.js"

const Cart = () => {
  const cartItems = useSelector(
    (state) => state.cart.cartItems
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const totalPrice = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,0)

  const totalItems = cartItems.reduce(
  (total, item) => total + item.quantity,0)

  return (
    <div className="cart-container">
      <h2>
        Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty
        </p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              className="cart-item"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div>
                <h3>
                  {item.name}
                </h3>

                <p>
                  ₹{item.price}
                </p>
                <p>
                   Subtotal: ₹{item.price * item.quantity}
                </p>

                <div>
                  <button onClick={() =>dispatch(decreaseQuantity(item.id))}>-</button>

                  <span>
                    {item.quantity}
                  </span>

                  <button onClick={() =>dispatch(increaseQuantity(item.id))}>+</button>
                </div>

                <button onClick={() =>dispatch(removeFromCart(item.id))}>Remove</button>

                <button onClick={() => {dispatch(addToWishlist(item))
                   dispatch(removeFromCart(item.id))}}>Move to Wishlist</button>



              </div>
            </div>
          ))}

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Total Items: {totalItems}</p><p>Total Price: ₹{totalPrice}</p>

        <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>

      </div>

        
        </>
      )}
    </div>
  )
}

export default Cart