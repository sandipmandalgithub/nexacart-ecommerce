import { useEffect, useState } from "react"
import axios from "axios"

import Product from "../components/Product"

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOption, setSortOption] = useState("default")

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)

  const productsPerPage = 30

  // Fetch products
  useEffect(() => {
  const skip = (currentPage - 1) * productsPerPage

  axios
    .get(
      `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`
    )
    .then((response) => {
      setProducts(response.data.products)
      setTotalProducts(response.data.total)
    })
    .catch((error) => {
      console.log(error)
      setError("Failed to load products. Please try again.")
    })
    .finally(() => {
      setLoading(false)
    })
  }, [currentPage])

  // Fetch categories
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/category-list")
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  // Retry current page
  const handleRetry = () => {
    const skip = (currentPage - 1) * productsPerPage

    setLoading(true)
    setError("")

    axios
      .get(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`
      )
      .then((response) => {
        setProducts(response.data.products)
        setTotalProducts(response.data.total)
      })
      .catch((error) => {
        console.log(error)
        setError("Failed to load products. Please try again.")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // Search and category filtering
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low") {
      return a.price - b.price
    }

    if (sortOption === "price-high") {
      return b.price - a.price
    }

    return 0
  })

  // Total pages
  const totalPages = Math.ceil(
    totalProducts / productsPerPage
  )

  return (
    <div className="products-page">
      <h1>Products</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">
          All Categories
        </option>

        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>

      {/* Sorting */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="default">
          Sort By
        </option>

        <option value="price-low">
          Price: Low to High
        </option>

        <option value="price-high">
          Price: High to Low
        </option>
      </select>

      {/* Loading */}
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        // Error
        <div>
          <p>{error}</p>

          <button onClick={handleRetry}>
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Products */}
          <div className="products">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() =>
                setCurrentPage((page) => page - 1)
              }
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((page) => page + 1)
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Products