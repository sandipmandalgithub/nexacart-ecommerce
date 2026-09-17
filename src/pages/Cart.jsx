import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

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

  const totalSavings = cartItems.reduce(
    (total, item) =>
      total +
      (item.originalPrice - item.price) *
        item.quantity,
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

                <div className="cart-price">

                  <span className="cart-original-price">
                    ₹{item.originalPrice}
                  </span>

                  <span className="cart-discounted-price">
                    ₹{item.price}
                  </span>

                </div>

                <p
                  className={
                    item.quantity >= item.stock
                      ? "stock-low"
                      : "stock-available"
                  }
                >
                  {item.quantity >= item.stock
                    ? "Maximum available quantity added"
                    : `${item.stock - item.quantity} left in stock`}
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
                    disabled={item.quantity === 1}
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
                    disabled={
                      item.quantity >= item.stock
                    }
                  >
                    +
                  </button>

                </div>

                {/* Remove Item */}
                <button
                  onClick={() => {
                    const confirmed =
                      window.confirm(
                        "Are you sure you want to remove this item from your cart?"
                      )

                    if (confirmed) {
                      dispatch(
                        removeFromCart(item.id)
                      )

                      toast.success(
                        "Item removed from cart"
                      )
                    }
                  }}
                >
                  Remove
                </button>

                {/* Move To Wishlist */}
                <button
                  onClick={() => {
                    const confirmed =
                      window.confirm(
                        "Move this item to your wishlist?"
                      )

                    if (confirmed) {
                      dispatch(
                        addToWishlist(item)
                      )

                      dispatch(
                        removeFromCart(item.id)
                      )

                      toast.success(
                        "Item moved to wishlist"
                      )
                    }
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

            <div className="summary-row">
              <span>
                You Saved
              </span>

              <span>
                ₹{totalSavings.toFixed(2)}
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

            {/* Clear Cart */}
            <button
              onClick={() => {
                const confirmed =
                  window.confirm(
                    "Are you sure you want to clear your cart?"
                  )

                if (confirmed) {
                  dispatch(clearCart())

                  toast.success(
                    "Cart cleared successfully"
                  )
                }
              }}
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
