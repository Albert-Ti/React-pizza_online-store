import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  items: [],
  status: 'loading'
}

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async params => {
  const { url, category, sortBy, order, pagination } = params

  const { data } = await axios.get(`${url}?page=${pagination.page}&limit=${pagination.limit}&${category}&
      sortBy=${sortBy}&order=${order}`)
  return data
})

const fetchSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},

  extraReducers: {
    [fetchPizzas.pending]: state => {
      state.status = 'loading'
    },

    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'success'
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error'
      console.log('ERROR')
    }
  }
})

export const selectPizzas = state => state.pizzas
export const selectPizzaItemsById = id => state => state.cart.items.find(obj => obj.id === id)

export const { setDataPizzas, setLoading } = fetchSlice.actions
export default fetchSlice.reducer
