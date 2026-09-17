import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import Product from "../components/Product"

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=6")
      .then((response) => {
        setProducts(response.data.products)
      })
      .catch((error) => {
        console.log(error)
        setError(
          "Failed to load featured products. Please try again."
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-label">
            MODERN SHOPPING EXPERIENCE
          </p>

          <h1>
            Shop Smarter with NexaCart
          </h1>

          <p className="hero-description">
            Discover quality products, explore great
            deals, and enjoy a simple and seamless
            shopping experience.
          </p>

          <div className="hero-actions">

            <Link
              to="/products"
              className="hero-primary-button"
            >
              Shop Now
            </Link>

            <Link
              to="/products"
              className="hero-secondary-button"
            >
              Explore Products
            </Link>

          </div>

        </div>

      </section>

      {/* Featured Products */}
      <section className="featured-products-section">

        <div className="featured-products-header">

          <div>
            <p className="featured-label">
              OUR PICKS
            </p>

            <h2>
              Featured Products
            </h2>

            <p>
              Explore some of our popular products
              and discover your next favorite item.
            </p>
          </div>

          <Link
            to="/products"
            className="view-all-products-button"
          >
            View All Products
          </Link>

        </div>

        {/* Loading */}
        {loading && (
          <div className="loading-container">

            <div className="loading-spinner"></div>

            <p>
              Loading featured products...
            </p>

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="error-container">

            <div className="error-icon">
              ⚠️
            </div>

            <h2>
              Something went wrong
            </h2>

            <p>
              {error}
            </p>

          </div>
        )}

        {/* Products */}
        {!loading && !error && (
          <div className="products">

            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
              />
            ))}

          </div>
        )}

      </section>

    </div>
  )
}

export default Home