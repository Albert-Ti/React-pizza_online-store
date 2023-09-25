import { CartItem } from '../redux/cart/types'
import { calcTotalPrice } from './calcTotalPrice'

export const getPizzasLocalStorage = () => {
  const data = localStorage.getItem('cart')
  const items = data ? JSON.parse(data) : []
  const totalPrice = calcTotalPrice(items)

  return { totalPrice, items: items as CartItem[] }
}
