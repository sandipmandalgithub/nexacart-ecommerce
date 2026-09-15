import Product from "../components/Product"
import products from "../data/products"

const Products = () => {
  return (
    <div className="products">
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}

export default Products