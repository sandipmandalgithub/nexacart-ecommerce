import {Link, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"

import { addToCart } from "../../redux/slice.js"
import products from "../data/products"

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const product = products.find(
    (item) => item.id === Number(id)
  )

  if (!product) {
    return <h1>Product Not Found</h1>
  }

  return (
    <div>
      <img
        src={product.image}
        alt={product.name}
      />

      <h1>
        {product.name}
      </h1>

      <h2>
        ₹{product.price}
      </h2>

      <p>
        {product.description}
      </p>

      <button
        onClick={() => dispatch(addToCart(product))}
      >
        Add To Cart
      </button>

      <Link to="/cart">
      Go To Cart
      </Link> 

    </div>
  )
}

export default ProductDetails