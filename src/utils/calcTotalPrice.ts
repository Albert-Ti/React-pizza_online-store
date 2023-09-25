import { CartItem } from '../redux/cart/types'

export const calcTotalPrice = (items: CartItem[]) =>
  items.reduce((acc, item) => acc + item.price * item.count, 0)
