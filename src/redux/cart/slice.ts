import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getPizzaStorage } from '../../utils/getPizzaStorage'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { CartItem, CartSliceState } from './types'

const initialState: CartSliceState = getPizzaStorage()

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    additem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(item => item.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice = calcTotalPrice(state.items)
    },

    removeItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(item => item.id === action.payload.id)
      if (findItem) {
        findItem.count--
      }
      state.totalPrice = calcTotalPrice(state.items)
    },

    removeItems: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id)
      state.totalPrice = calcTotalPrice(state.items)
    },

    clearItems: state => {
      state.items = []
    }
  }
})

export const { additem, removeItems, clearItems, removeItem } = CartSlice.actions
export default CartSlice.reducer
