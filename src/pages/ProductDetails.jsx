import {
  Link,
  useParams,
  useNavigate
} from "react-router-dom"
import { useEffect, useState } from "react"
import {
  useDispatch,
  useSelector
} from "react-redux"
import axios from "axios"

import {
  addToCart,
  addToWishlist
} from "../../redux/slice.js"

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImage, setSelectedImage] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const wishlistItems = useSelector(
    (state) => state.cart.wishlistItems
  )

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product?.id
  )

  const discountedPrice = product
  ? product.price -
    (product.price * product.discountPercentage) / 100
  : 0

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data)
        setSelectedImage(response.data.thumbnail)
      })
      .catch((error) => {
        console.log(error)

        setError(
          "Failed to load product details. Please try again."
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (loading) {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading product details...</p>
    </div>
  )
}

  if (error) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>

      <h2>Something went wrong</h2>

      <p>{error}</p>

      <Link to="/products">
        Back to Products
      </Link>
    </div>
  )
}

  if (!product) {
    return (
      <div className="product-details">
        <h1>Product not found</h1>

        <Link to="/products">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="product-details">

      <div className="product-details-image">
        <img
          src={selectedImage}
          alt={product.title}
        />

        <div className="product-thumbnails">
          {product.images?.map((image) => (
<img
  key={image}
  src={image}
  alt={product.title}
  className={
    selectedImage === image
      ? "thumbnail active"
      : "thumbnail"
  }
  onClick={() => setSelectedImage(image)}
/>
          ))}
        </div>
      </div>

      <div className="product-details-info">

        <h1>
          {product.title}
        </h1>

        <p>
          Brand: {product.brand || "N/A"}
        </p>

        <p>
          Category: {product.category}
        </p>

        <p>
          Rating: ⭐ {product.rating}
        </p>

<p
  className={
    product.stock === 0
      ? "stock-out"
      : product.stock <= 5
      ? "stock-low"
      : "stock-available"
  }
>
  {product.stock === 0
    ? "Out of Stock"
    : product.stock <= 5
    ? `Only ${product.stock} left in stock`
    : `${product.stock} available`}
</p>
        <div className="price-section">

  <h2>
    ₹{discountedPrice.toFixed(2)}
  </h2>

  <p className="original-price">
    ₹{product.price}
  </p>

  <p className="discount-badge">
    {product.discountPercentage}% OFF
  </p>

</div>

        <p>
          {product.description}
        </p>


 <div className="quantity-selector">

  <button
    onClick={() =>
      setQuantity((quantity) =>
        Math.max(1, quantity - 1)
      )
    }
  >
    -
  </button>

  <span>
    {quantity}
  </span>

  <button
  onClick={() =>
    setQuantity((quantity) =>
      Math.min(product.stock, quantity + 1)
    )
  }
  disabled={
    quantity >= product.stock ||
    product.stock === 0
  }
>
  +
</button>
</div>

<button
  onClick={() => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product))
    }
setAddedToCart(true)

setTimeout(() => {
  setAddedToCart(false)
}, 2000)
  }}
  disabled={product.stock === 0}
>
  {product.stock === 0
  ? "Out of Stock"
  : addedToCart
  ? "Added to Cart ✓"
  : "Add To Cart"}
</button>

<button
  onClick={() => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product))
    }

    navigate("/checkout")
  }}
  disabled={product.stock === 0}
>
  {product.stock === 0
    ? "Out of Stock"
    : "Buy Now"}
</button>

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

        <Link to="/cart">
          Go To Cart
        </Link>

        <br />

        <Link to="/products">
          Back to Products
        </Link>

      </div>

    </div>
  )
}

export default ProductDetails

