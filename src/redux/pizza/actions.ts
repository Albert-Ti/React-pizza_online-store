import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Pizza, fetchPizzasParams } from './types'

export const fetchPizzas = createAsyncThunk<Pizza[], fetchPizzasParams>(
  'pizzas/fetchPizzasStatus',
  async params => {
    const { url, category, sortBy, order, pagination } = params

    const { data } = await axios.get<Pizza[]>(
      `${url}?page=${pagination.page}&limit=${pagination.limit}&${category}&sortBy=${sortBy}&order=${order}`
    )
    return data
  }
)
