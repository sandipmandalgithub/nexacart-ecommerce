import { useState } from "react"

import Product from "../components/Product"
import products from "../data/products"

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOption, setSortOption] = useState("default")


  const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase())

  const matchesCategory =
    selectedCategory === "All" ||
    product.category === selectedCategory

  return matchesSearch && matchesCategory
})

const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortOption === "price-low") {
    return a.price - b.price
  }

  if (sortOption === "price-high") {
    return b.price - a.price
  }

  return 0
})

  return (
    <div className="products-page">
      <h1>Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

    <select
       value={selectedCategory}
       onChange={(e) => setSelectedCategory(e.target.value)}
      >
      <option value="All">All Categories</option>
      <option value="Electronics">Electronics</option>
      <option value="Accessories">Accessories</option>
    </select>

    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="default">Sort By</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
    </select>

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

    </div>
  )
}

export default Products