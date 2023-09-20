import { CartItem } from '../cart/types'
import { RootState } from '../store'

export const selectCart = (state: RootState) => state.cart
export const selectCartByItemId = (id: string) => (state: RootState) =>
  state.cart.items.find((obj: CartItem) => obj.id === id)
