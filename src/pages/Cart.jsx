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
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  )

  const shipping = totalPrice > 0 ? 50 : 0

  const grandTotal = totalPrice + shipping

  return (
    <div className="cart-container">

      <h2>
        Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="empty-state">

          <div className="empty-state-icon">
            🛒
          </div>

          <h2>
            Your Cart is Empty
          </h2>

          <p>
            Looks like you haven't added anything
            to your cart yet.
          </p>

          <button
            onClick={() =>
              navigate("/products")
            }
          >
            Continue Shopping
          </button>

        </div>
      ) : (
        <>

          {cartItems.map((item) => (
            <div
              className="cart-item"
              key={item.id}
            >

              <img
                src={item.thumbnail}
                alt={item.title}
              />

              <div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  ₹{item.price}
                </p>

                <p>
                  Subtotal: ₹
                  {item.price * item.quantity}
                </p>

                <div>

                  <button
                    onClick={() =>
                      dispatch(
                        decreaseQuantity(item.id)
                      )
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(
                        increaseQuantity(item.id)
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  onClick={() =>
                    dispatch(
                      removeFromCart(item.id)
                    )
                  }
                >
                  Remove
                </button>

                <button
                  onClick={() => {
                    dispatch(
                      addToWishlist(item)
                    )

                    dispatch(
                      removeFromCart(item.id)
                    )
                  }}
                >
                  Move to Wishlist
                </button>

              </div>

            </div>
          ))}

          <div className="order-summary">

            <h3>
              Order Summary
            </h3>

            <div className="summary-row">
              <span>
                Total Items
              </span>

              <span>
                {totalItems}
              </span>
            </div>

            <div className="summary-row">
              <span>
                Subtotal
              </span>

              <span>
                ₹{totalPrice}
              </span>
            </div>

            <div className="summary-row">
              <span>
                Shipping
              </span>

              <span>
                ₹{shipping}
              </span>
            </div>

            <div className="summary-total">
              <span>
                Grand Total
              </span>

              <span>
                ₹{grandTotal}
              </span>
            </div>

            <button
              onClick={() =>
                dispatch(clearCart())
              }
            >
              Clear Cart
            </button>

            <button
              onClick={() =>
                navigate("/checkout")
              }
            >
              Proceed to Checkout
            </button>

          </div>

        </>
      )}

    </div>
  )
}

export default Cart
