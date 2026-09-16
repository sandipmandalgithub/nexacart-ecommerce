import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { clearCart } from "../../redux/slice.js"

const Checkout = () => {

const cartItems = useSelector((state) => state.cart.cartItems)
const dispatch = useDispatch()
const totalPrice = cartItems.reduce((total, item) =>total + item.price * item.quantity,0)

const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [address, setAddress] = useState("")
const [phone, setPhone] = useState("")

if (cartItems.length === 0) {
  return (
    <div className="checkout-container">
      <h1>Your Cart is Empty</h1>
      <p>Please add products to your cart before checkout.</p>
      <Link to="/products">Continue Shopping</Link>
    </div>
  )
}



  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <p>
        Complete your order
      </p>

<div className="checkout-summary">
  <h2>Order Summary</h2>

  {cartItems.map((item) => (
    <div
      className="checkout-item"
      key={item.id}
    >
      <span>
        {item.name} × {item.quantity}
      </span>

      <span>
        ₹{item.price * item.quantity}
      </span>
    </div>
  ))}

  <h3>
    Total: ₹{totalPrice}
  </h3>
</div>

    <form 
    onSubmit={(e) => {
    e.preventDefault()

    if (!name || !email || !phone || !address) {
      alert("Please fill in all fields")
      return
    }

    dispatch(clearCart())
    alert("Order placed successfully!")
    }}
    >
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
          />
        </div>

        <div>
          <label>
            Phone Number
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="Enter your phone number"
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
          />
        </div>
        <button type="submit">Place Order</button>
    </form>


</div>
  )
}

export default Checkout