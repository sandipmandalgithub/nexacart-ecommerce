import { useDispatch, useSelector } from "react-redux"

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} from "../../redux/slice.js"

const Cart = () => {
  const cartItems = useSelector(
    (state) => state.cart.cartItems
  )

  const dispatch = useDispatch()
  const totalPrice = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
)

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
                  <button
                    onClick={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(increaseQuantity(item.id))
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    dispatch(removeFromCart(item.id))
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

        <h3>
        Total: ₹{totalPrice}
        </h3>
        <button
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
        </button>

        
        </>
      )}
    </div>
  )
}

export default Cart