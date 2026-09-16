import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToCart,addToWishlist } from "../../redux/slice.js"

const Product = ({ product }) => {
  const dispatch = useDispatch()

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
      />

      <h3>
        {product.name}
      </h3>

      <p>
        ₹{product.price}
      </p>

      <button
        onClick={() => dispatch(addToCart(product))}
      >
        Add To Cart
      </button>

      <button
       onClick={() => dispatch(addToWishlist(product))}
      >
      ❤️ Add To Wishlist
      </button>

      <Link to={`/products/${product.id}`}>
        View Details
      </Link>
    </div>
  )
}

export default Product