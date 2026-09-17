import { Link } from "react-router-dom"
import {
  useDispatch,
  useSelector
} from "react-redux"

import {
  addToCart,
  addToWishlist
} from "../../redux/slice.js"

const Product = ({ product }) => {
  const dispatch = useDispatch()

  const wishlistItems = useSelector(
    (state) => state.cart.wishlistItems
  )

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  )

  const discountedPrice =
    product.price -
    (product.price * product.discountPercentage) / 100

  const isOutOfStock = product.stock === 0

  return (
    <div className="product-card">
      {/* Product Image */}
      <img
        src={product.thumbnail}
        alt={product.title}
      />

      {/* Product Title */}
      <h3>
        {product.title}
      </h3>

      {/* Rating */}
      <p className="product-rating">
        ⭐ {product.rating}
      </p>

      {/* Stock Status */}
      <p
        className={
          isOutOfStock
            ? "stock-out"
            : product.stock <= 5
            ? "stock-low"
            : "stock-available"
        }
      >
        {isOutOfStock
          ? "Out of Stock"
          : product.stock <= 5
          ? `Only ${product.stock} left`
          : `${product.stock} available`}
      </p>

      {/* Price */}
      <div className="product-price">
        <span className="product-original-price">
          ₹{product.price}
        </span>

        <span className="product-discounted-price">
          ₹{discountedPrice.toFixed(2)}
        </span>

        <span className="product-discount-badge">
          {product.discountPercentage}% OFF
        </span>
      </div>

      {/* Add To Cart */}
      <button
        onClick={() =>
          dispatch(addToCart(product))
        }
        disabled={isOutOfStock}
      >
        {isOutOfStock
          ? "Out of Stock"
          : "Add To Cart"}
      </button>

      {/* Wishlist */}
      <button
        onClick={() =>
          dispatch(addToWishlist(product))
        }
        disabled={isWishlisted}
      >
        {isWishlisted
          ? "❤️ Wishlisted"
          : "♡ Add To Wishlist"}
      </button>

      {/* View Details */}
      <Link to={`/products/${product.id}`}>
        View Details
      </Link>
    </div>
  )
}

export default Product
