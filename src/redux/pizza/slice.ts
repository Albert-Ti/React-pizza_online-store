import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchPizzas } from './actions'
import { Pizza, PizzaSliceState } from './types'

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading'
}

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPizzas.pending, state => {
        state.status = 'loading'
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
        state.items = action.payload
        state.status = 'success'
      })
      .addCase(fetchPizzas.rejected, state => {
        state.status = 'error'
        state.items = []
      })
  }
})

export default pizzaSlice.reducer
