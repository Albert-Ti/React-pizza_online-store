import { RootState } from '../store'

export const selectFilter = (state: RootState) => state.filter
export const selectPagination = (state: RootState) => state.filter.pagination
export const selectSearch = (state: RootState) => state.filter.searchValue
