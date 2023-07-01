import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },

    setCategoryId: (state, action) => {
      state.categoryId = action.payload
    },

    setSort: (state, action) => {
      state.sort = action.payload
    },

    setPagination: (state, action) => {
      state.pagination = action.payload
    },

    setFilters: (state, action) => {
      state.categoryId = Number(action.payload.categoryId)
      state.sort = action.payload.sort
      state.pagination = action.payload.pagination
    }
  }
})

export const selectFilter = state => state.filter

export const { setCategoryId, setSort, setPagination, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
