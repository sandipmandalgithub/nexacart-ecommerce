import {
  useSelector,
  useDispatch
} from "react-redux"

import {
  removeFromWishlist,
  addToCart
} from "../../redux/slice.js"

const Wishlist = () => {
  const wishlistItems = useSelector(
    (state) => state.cart.wishlistItems
  )

  const dispatch = useDispatch()

  return (
    <div className="wishlist-container">
      <h2>
        My Wishlist
      </h2>

      {wishlistItems.length === 0 ? (
        <p>
          Your wishlist is empty
        </p>
      ) : (
        wishlistItems.map((item) => (
          <div
            className="wishlist-item"
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

              <button
                onClick={() =>
                  dispatch(
                    removeFromWishlist(item.id)
                  )
                }
              >
                Remove
              </button>

              <button
                onClick={() => {
                dispatch(addToCart(item))
                dispatch(removeFromWishlist(item.id))
                }}
                >
                Move to Cart
              </button>

            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Wishlist