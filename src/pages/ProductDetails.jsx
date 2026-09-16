import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"

import { addToCart } from "../../redux/slice.js"

const ProductDetails = () => {

  const { id } = useParams()
  const dispatch = useDispatch()

  const [product, setProduct] = useState(null)

useEffect(() => {
  axios
    .get(`https://dummyjson.com/products/${id}`)
    .then((response) => {
      setProduct(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}, [id])

  if (!product) {
  return <h1>Loading...</h1>
}

  return (
    <div>
      <img
        src={product.thumbnail}
        alt={product.title}
      />

      <h1>
        {product.title}
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