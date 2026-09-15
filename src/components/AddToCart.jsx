import { useDispatch, useSelector } from "react-redux"
import { removeFromCart, clearCart } from "../../redux/slice.js"


const AddToCart = () => {

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  )

  const dispatch = useDispatch()


  return (
    <div className="cart-container">

      <h2>
        Shopping Cart
      </h2>


      {
        cartItems.length === 0 ? (

          <p>
            Your cart is empty
          </p>

        ) : (

          <>
            {
              cartItems.map((item) => (

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

                    <button
                      onClick={() =>
                        dispatch(removeFromCart(item.id))
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))
            }


            <button
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>

          </>

        )
      }

    </div>
  )
}


export default AddToCart

