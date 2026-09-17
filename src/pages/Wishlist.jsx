import {
  useSelector,
  useDispatch
} from "react-redux"

import { useNavigate } from "react-router-dom"

import {
  removeFromWishlist,
  addToCart
} from "../../redux/slice.js"

const Wishlist = () => {
  const wishlistItems = useSelector(
    (state) => state.cart.wishlistItems
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="wishlist-container">
      <h2>
        My Wishlist
      </h2>

      {wishlistItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            ❤️
          </div>

          <h2>
            Your Wishlist is Empty
          </h2>

          <p>
            Save products you love and find them here later.
          </p>

          <button
            onClick={() =>
              navigate("/products")
            }
          >
            Explore Products
          </button>
        </div>
      ) : (
        wishlistItems.map((item) => {
          const originalPrice =
            item.originalPrice || item.price

          const discountedPrice =
            item.originalPrice
              ? item.price
              : item.price -
                (item.price *
                  item.discountPercentage) /
                  100

          return (
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

                <div className="wishlist-price">
                  <span className="wishlist-original-price">
                    ₹{originalPrice}
                  </span>

                  <span className="wishlist-discounted-price">
                    ₹{discountedPrice.toFixed(2)}
                  </span>

                  <span className="wishlist-discount-badge">
                    {item.discountPercentage}% OFF
                  </span>
                </div>

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
                    dispatch(
                      removeFromWishlist(item.id)
                    )
                  }}
                >
                  Move to Cart
                </button>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default Wishlist
