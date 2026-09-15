import { useDispatch } from "react-redux"
import { addToCart } from "../../redux/slice.js"


const Product = ({ product }) => {

  const dispatch = useDispatch()


  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
      />

      <h3>
        {product.name}
      </h3>

      <p>
        ₹{product.price}
      </p>

      <button
        onClick={() => dispatch(addToCart(product))}
      >
        Add To Cart
      </button>

    </div>
  )
}


export default Product

