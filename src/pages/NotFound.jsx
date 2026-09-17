import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="not-found-container">

      <div className="not-found-content">

        <div className="not-found-code">
          404
        </div>

        <div className="not-found-icon">
          🔍
        </div>

        <h1>
          Page Not Found
        </h1>

        <p>
          Sorry, the page you are looking for
          does not exist or may have been moved.
        </p>

        <div className="not-found-actions">

          <Link
            to="/"
            className="not-found-home-button"
          >
            Go Home
          </Link>

          <Link
            to="/products"
            className="not-found-products-button"
          >
            Browse Products
          </Link>

        </div>

      </div>

    </div>
  )
}

export default NotFound