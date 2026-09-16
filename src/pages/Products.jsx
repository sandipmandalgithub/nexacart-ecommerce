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

  const productsPerPage = 30

  // Fetch products
  const fetchProducts = () => {
    setLoading(true)
    setError("")

    axios
      .get("https://dummyjson.com/products?limit=0")
      .then((response) => {
        setProducts(response.data.products)
      })
      .catch((error) => {
        console.log(error)
        setError("Failed to load products. Please try again.")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // Initial products load
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=0")
      .then((response) => {
        setProducts(response.data.products)
      })
      .catch((error) => {
        console.log(error)
        setError("Failed to load products. Please try again.")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

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
    sortedProducts.length / productsPerPage
  )

  // Current page products
  const startIndex =
    (currentPage - 1) * productsPerPage

  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage
  )

  return (
    <div className="products-page">
      <h1>Products</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          setCurrentPage(1)
        }}
      />

      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value)
          setCurrentPage(1)
        }}
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
        onChange={(e) => {
          setSortOption(e.target.value)
          setCurrentPage(1)
        }}
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
        <div>
          <p>{error}</p>

          <button onClick={fetchProducts}>
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Products */}
          <div className="products">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
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
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() =>
                  setCurrentPage(
                    (page) => page - 1
                  )
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
                  setCurrentPage(
                    (page) => page + 1
                  )
                }
                disabled={
                  currentPage === totalPages
                }
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Products

