import { Link, useParams } from "react-router-dom"
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

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImage, setSelectedImage] = useState("")

  const wishlistItems = useSelector(
    (state) => state.cart.wishlistItems
  )

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product?.id
  )

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
      <div className="product-details">
        <h1>Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="product-details">
        <h1>{error}</h1>

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

        <p>
          Stock: {product.stock}
        </p>

        <h2>
          ₹{product.price}
        </h2>

        <p>
          Discount: {product.discountPercentage}%
        </p>

        <p>
          {product.description}
        </p>

        <button
          onClick={() =>
            dispatch(addToCart(product))
          }
        >
          Add To Cart
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

