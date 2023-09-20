export type Sort = {
  value: string
  type: string
}

export type Pagination = {
  page: number
  limit: number
  allPages: number[]
}
export interface FilterSliceState {
  searchValue: string
  categoryId: number
  sort: Sort
  pagination: Pagination
}
