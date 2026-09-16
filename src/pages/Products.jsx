import { useState } from "react"

import Product from "../components/Product"
import products from "../data/products"

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="products-page">
      <h1>Products</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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