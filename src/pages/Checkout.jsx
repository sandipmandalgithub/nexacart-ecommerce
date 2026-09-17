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

  const [paymentMethod, setPaymentMethod] = useState("")

  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const [orderId, setOrderId] = useState("")
  const [orderTotal, setOrderTotal] = useState(0)
  const [placedPaymentMethod, setPlacedPaymentMethod] = useState("")

  // Generate Order ID
  const generateOrderId = () => {
    const date = new Date()

    const year = date.getFullYear()

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0")

    const day = String(
      date.getDate()
    ).padStart(2, "0")

    const randomNumber = Math.floor(
      1000 + Math.random() * 9000
    )

    return `NC-${year}${month}${day}-${randomNumber}`
  }

  // Place Order
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

    if (!paymentMethod) {
      alert("Please select a payment method")
      return
    }

    if (name.trim().length < 3) {
      alert("Please enter a valid name")
      return
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      alert("Please enter a valid email address")
      return
    }

    if (address.trim().length < 10) {
      alert(
        "Please enter a complete delivery address"
      )
      return
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert(
        "Please enter a valid 10-digit phone number"
      )
      return
    }

    setIsProcessing(true)

    const newOrderId = generateOrderId()

    setOrderId(newOrderId)

    setOrderTotal(grandTotal)

    setPlacedPaymentMethod(paymentMethod)

    dispatch(clearCart())

    setOrderPlaced(true)

    setIsProcessing(false)
  }

  // Order Success Page
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

        <p>
          Order ID:{" "}
          <strong>
            {orderId}
          </strong>
        </p>

        <p>
          Payment Method:{" "}
          <strong>
            {placedPaymentMethod}
          </strong>
        </p>

        <p>
          Total Paid: ₹{orderTotal}
        </p>

        <Link to="/products">
          Continue Shopping
        </Link>

      </div>
    )
  }

  // Empty Cart
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

  return (
    <div className="checkout-container">

      <h1>
        Checkout
      </h1>

      <p>
        Complete your order
      </p>

      {/* Order Summary */}
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

      {/* Checkout Form */}
      <form onSubmit={handleSubmit}>

        {/* Full Name */}
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

        {/* Email */}
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

        {/* Phone */}
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

        {/* Address */}
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

        {/* Payment Method */}
        <div>

          <label>
            Payment Method
          </label>

          <div className="payment-methods">

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={
                  paymentMethod ===
                  "Cash on Delivery"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              💵 Cash on Delivery
            </label>

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="UPI"
                checked={
                  paymentMethod === "UPI"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              📱 UPI
            </label>

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Card"
                checked={
                  paymentMethod === "Card"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              💳 Card
            </label>

          </div>

        </div>

        {/* Place Order */}
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