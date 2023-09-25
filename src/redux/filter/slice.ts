import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FilterSliceState, Pagination, Sort } from './types'

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: {
    value: 'популярности',
    type: 'rating'
  },
  pagination: {
    page: 1,
    limit: 4,
    allPages: [1, 2, 3]
  }
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },

    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload
    },

    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload
    },

    setPagination: (state, action: PayloadAction<{ type: string; page: number }>) => {
      if (action.payload.type === 'back' && state.pagination.page !== 1) {
        state.pagination.page = state.pagination.page - 1
      } else if (action.payload.type === 'go' && state.pagination.page !== 3) {
        state.pagination.page = state.pagination.page + 1
      } else if (action.payload.type === 'default') {
        state.pagination.page = action.payload.page
      }
    },

    setFilters: (
      state,
      action: PayloadAction<{ categoryId: number; sort: Sort; pagination: Pagination }>
    ) => {
      state.categoryId = Number(action.payload.categoryId)
      state.sort = action.payload.sort
      state.pagination = action.payload.pagination
    }
  }
})

export const { setCategoryId, setSort, setPagination, setFilters, setSearchValue } =
  filterSlice.actions

export default filterSlice.reducer
