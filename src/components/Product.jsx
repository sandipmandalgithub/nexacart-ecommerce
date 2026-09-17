import { Link } from "react-router-dom"
import {
  useDispatch,
  useSelector
} from "react-redux"
import { addToCart,addToWishlist } from "../../redux/slice.js"

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


  return (
    <div className="product-card">
      <img
        src={product.thumbnail}
        alt={product.title}
      />

      <h3>
        {product.title}
      </h3>

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

      <button
        onClick={() => dispatch(addToCart(product))}
      >
        Add To Cart
      </button>

<button
  onClick={() => dispatch(addToWishlist(product))}
  disabled={isWishlisted}
>
  {isWishlisted
    ? "❤️ Wishlisted"
    : "♡ Add To Wishlist"}
</button>

      <Link to={`/products/${product.id}`}>
        View Details
      </Link>
    </div>
  )
}

export default Product