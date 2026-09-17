/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"

import Product from "../components/Product"

const Products = () => {
  const [searchParams, setSearchParams] =
    useSearchParams()

  const categoryFromUrl =
    searchParams.get("category")

  const [searchTerm, setSearchTerm] = useState("")

  const [selectedCategory, setSelectedCategory] =
    useState(categoryFromUrl || "All")

  const [selectedRating, setSelectedRating] =
    useState("All")

  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const [sortOption, setSortOption] =
    useState("default")

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [currentPage, setCurrentPage] =
    useState(1)

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

        setError(
          "Failed to load products. Please try again."
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // Initial products load
  useEffect(() => {
    fetchProducts()
  }, [])

  // Fetch categories
  useEffect(() => {
    axios
      .get(
        "https://dummyjson.com/products/category-list"
      )
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  // Filter products
  const filteredProducts = products.filter(
    (product) => {
      const activeCategory =
        categoryFromUrl || selectedCategory

      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

      const matchesCategory =
        activeCategory === "All" ||
        product.category === activeCategory

      const matchesRating =
        selectedRating === "All" ||
        product.rating >=
          Number(selectedRating)

      const matchesMinPrice =
        minPrice === "" ||
        product.price >= Number(minPrice)

      const matchesMaxPrice =
        maxPrice === "" ||
        product.price <= Number(maxPrice)

      return (
        matchesSearch &&
        matchesCategory &&
        matchesRating &&
        matchesMinPrice &&
        matchesMaxPrice
      )
    }
  )

  // Sorting
  const sortedProducts =
    [...filteredProducts].sort((a, b) => {
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
    sortedProducts.length /
      productsPerPage
  )

  // Current page products
  const startIndex =
    (currentPage - 1) *
    productsPerPage

  const currentProducts =
    sortedProducts.slice(
      startIndex,
      startIndex + productsPerPage
    )

  // Smart pagination numbers
  const getPaginationPages = () => {
    const pages = []

    if (totalPages <= 7) {
      for (
        let page = 1;
        page <= totalPages;
        page++
      ) {
        pages.push(page)
      }

      return pages
    }

    pages.push(1)

    if (currentPage > 4) {
      pages.push("...")
    }

    const startPage = Math.max(
      2,
      currentPage - 1
    )

    const endPage = Math.min(
      totalPages - 1,
      currentPage + 1
    )

    for (
      let page = startPage;
      page <= endPage;
      page++
    ) {
      pages.push(page)
    }

    if (
      currentPage <
      totalPages - 3
    ) {
      pages.push("...")
    }

    pages.push(totalPages)

    return pages
  }

  // Category change
  const handleCategoryChange = (e) => {
    const category = e.target.value

    setSelectedCategory(category)
    setCurrentPage(1)

    if (category === "All") {
      searchParams.delete("category")
      setSearchParams(searchParams)
    } else {
      setSearchParams({
        category
      })
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All")
    setSelectedRating("All")
    setMinPrice("")
    setMaxPrice("")
    setSortOption("default")
    setCurrentPage(1)

    searchParams.delete("category")
    setSearchParams(searchParams)
  }

  const hasActiveFilters =
    searchTerm ||
    categoryFromUrl ||
    selectedCategory !== "All" ||
    selectedRating !== "All" ||
    minPrice !== "" ||
    maxPrice !== "" ||
    sortOption !== "default"

  return (
    <div className="products-page">

      <h1>
        Products
      </h1>

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

      {searchTerm && (
        <button
          onClick={() => {
            setSearchTerm("")
            setCurrentPage(1)
          }}
        >
          Clear Search
        </button>
      )}

      {/* Category Filter */}
      <select
        value={
          categoryFromUrl ||
          selectedCategory
        }
        onChange={handleCategoryChange}
      >
        <option value="All">
          All Categories
        </option>

        {categories.map(
          (category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          )
        )}
      </select>

      {/* Rating Filter */}
      <select
        value={selectedRating}
        onChange={(e) => {
          setSelectedRating(
            e.target.value
          )
          setCurrentPage(1)
        }}
      >
        <option value="All">
          All Ratings
        </option>

        <option value="4">
          ⭐ 4 & Above
        </option>

        <option value="3">
          ⭐ 3 & Above
        </option>

        <option value="2">
          ⭐ 2 & Above
        </option>

        <option value="1">
          ⭐ 1 & Above
        </option>
      </select>

      {/* Price Range Filter */}
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        min="0"
        onChange={(e) => {
          setMinPrice(e.target.value)
          setCurrentPage(1)
        }}
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        min="0"
        onChange={(e) => {
          setMaxPrice(e.target.value)
          setCurrentPage(1)
        }}
      />

      {/* Clear All Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      )}

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
        <div className="loading-container">

          <div className="loading-spinner"></div>

          <p>
            Loading products...
          </p>

        </div>
      ) : error ? (
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

          <button
            onClick={fetchProducts}
          >
            Try Again
          </button>

        </div>
      ) : (
        <>
          {/* Products */}
          <div className="products">

            {currentProducts.length > 0 ? (
              currentProducts.map(
                (product) => (
                  <Product
                    key={product.id}
                    product={product}
                  />
                )
              )
            ) : (
              <p>
                No products found.
              </p>
            )}

          </div>

          {/* Smart Pagination */}
          {totalPages > 1 && (
            <div className="pagination">

              <button
                onClick={() =>
                  setCurrentPage(
                    (page) => page - 1
                  )
                }
                disabled={
                  currentPage === 1
                }
              >
                Previous
              </button>

              {getPaginationPages().map(
                (page, index) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="pagination-ellipsis"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() =>
                        setCurrentPage(page)
                      }
                      className={
                        currentPage === page
                          ? "active-page"
                          : ""
                      }
                    >
                      {page}
                    </button>
                  )
              )}

              <button
                onClick={() =>
                  setCurrentPage(
                    (page) => page + 1
                  )
                }
                disabled={
                  currentPage ===
                  totalPages
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