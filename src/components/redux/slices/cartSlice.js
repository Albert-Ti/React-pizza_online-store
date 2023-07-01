import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  items: []
}

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    additem: (state, action) => {
      const findItem = state.items.find(item => item.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }

      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.count, 0)
    },

    removeItem: (state, action) => {
      const findItem = state.items.find(item => item.id === action.payload.id)
      if (findItem.count !== 0) {
        findItem.count--
      }
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.count, 0)
    },

    deleteItems: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id)
    },

    clearItems: state => {
      state.items = []
    }
  }
})

export const selectCart = state => state.cart

export const { additem, deleteItems, clearItems, removeItem } = CartSlice.actions
export default CartSlice.reducer
