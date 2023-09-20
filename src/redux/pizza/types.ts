export type Pizza = {
  id: string
  name: string
  imageUrl: string
  types: number[]
  sizes: number[]
  count: number
  price: number
}

export interface PizzaSliceState {
  items: Pizza[]
  status: string
}

export type fetchPizzasParams = {
  url: string
  category: string
  sortBy: string
  order: string
  pagination: {
    page: number
    limit: number
  }
}
