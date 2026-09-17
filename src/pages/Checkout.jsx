import { useState } from "react"

import {
  useSelector,
  useDispatch
} from "react-redux"

import { Link } from "react-router-dom"

import { clearCart } from "../../redux/slice.js"

const Checkout = () => {
  const cartItems = useSelector(
    (state) => state.cart.cartItems
  )

  const dispatch = useDispatch()

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  const shipping = totalPrice > 0 ? 50 : 0

  const grandTotal = totalPrice + shipping

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")

  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  if (orderPlaced) {
    return (
      <div className="success-container">

        <div className="success-icon">
          ✅
        </div>

        <h1>
          Order Placed Successfully!
        </h1>

        <p>
          Thank you for your purchase.
          Your order has been placed successfully.
        </p>

        <Link to="/products">
          Continue Shopping
        </Link>

      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">

        <h1>
          Your Cart is Empty
        </h1>

        <p>
          Please add products to your cart
          before checkout.
        </p>

        <Link to="/products">
          Continue Shopping
        </Link>

      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !name ||
      !email ||
      !phone ||
      !address
    ) {
      alert("Please fill in all fields")
      return
    }

    if (name.trim().length < 3) {
      alert("Please enter a valid name")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address")
      return
    }

    if (address.trim().length < 10) {
      alert("Please enter a complete delivery address")
      return
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number")
      return
    }

    setIsProcessing(true)

    dispatch(clearCart())

    setOrderPlaced(true)
  }

  return (
    <div className="checkout-container">

      <h1>
        Checkout
      </h1>

      <p>
        Complete your order
      </p>

      <div className="checkout-summary">

        <h2>
          Order Summary
        </h2>

        {cartItems.map((item) => (
          <div
            className="checkout-item"
            key={item.id}
          >

            <span>
              {item.title} × {item.quantity}
            </span>

            <span>
              ₹{item.price * item.quantity}
            </span>

          </div>
        ))}

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

      </div>

      <form onSubmit={handleSubmit}>

        <div>

          <label>
            Full Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Enter your full name"
            required
          />

        </div>

        <div>

          <label>
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            required
          />

        </div>

        <div>

          <label>
            Phone Number
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              const value = e.target.value

              if (
                /^\d*$/.test(value) &&
                value.length <= 10
              ) {
                setPhone(value)
              }
            }}
            placeholder="Enter your phone number"
            maxLength="10"
            required
          />

        </div>

        <div>

          <label>
            Address
          </label>

          <textarea
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            placeholder="Enter your delivery address"
            required
          />

        </div>

        <button
          type="submit"
          disabled={isProcessing}
        >
          {isProcessing
            ? "Processing Order..."
            : "Place Order"}
        </button>

      </form>

    </div>
  )
}

export default Checkout
