import { useState } from "react"

import Product from "../components/Product"
import products from "../data/products"

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase())

  const matchesCategory =
    selectedCategory === "All" ||
    product.category === selectedCategory

  return matchesSearch && matchesCategory
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

  <div className="products">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
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