import { createSlice } from "@reduxjs/toolkit"

const savedCartItems =
  JSON.parse(localStorage.getItem("cartItems")) || []

const savedWishlistItems =
  JSON.parse(localStorage.getItem("wishlistItems")) || []

const initialState = {
  cartItems: savedCartItems,
  wishlistItems: savedWishlistItems
}

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else {
      const originalPrice = action.payload.originalPrice || action.payload.price
      
const discountedPrice =
  action.payload.originalPrice
    ? action.payload.price
    : originalPrice -
      (originalPrice *
        action.payload.discountPercentage) /
        100

        state.cartItems.push({
          ...action.payload,
          originalPrice,
          price: Number(discountedPrice.toFixed(2)),
          quantity: 1
        })
      }
    },

    addToWishlist: (state, action) => {
      const existingItem = state.wishlistItems.find(
        (item) => item.id === action.payload.id
      )

      if (!existingItem) {
        state.wishlistItems.push(action.payload)
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlistItems =
        state.wishlistItems.filter(
          (item) => item.id !== action.payload
        )
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload
      )

      if (!item) return

      if (item.quantity < item.stock) {
        item.quantity += 1
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload
      )

      if (!item) return

      if (item.quantity > 1) {
        item.quantity -= 1
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems =
        state.cartItems.filter(
          (item) => item.id !== action.payload
        )
    },

    clearCart: (state) => {
      state.cartItems = []
    }
  }
})

export const {
  addToCart,
  addToWishlist,
  removeFromWishlist,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer

