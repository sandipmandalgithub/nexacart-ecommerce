import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="home-page">

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

    </div>
  )
}

export default Home