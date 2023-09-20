import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cart from './cart/slice'
import filter from './filter/slice'
import pizzas from './pizza/slice'

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizzas
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
