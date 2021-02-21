import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Utils
import { mockIncrement } from 'utilities/mockAPI'

// Async actions
export const incrementByAmountAsync = createAsyncThunk(
  'counter/incrementByAmount',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await mockIncrement(payload)
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)



const initialState = {
  value: 0,
  loading: 'idle',
  error: null,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value = state.value + 1
    },
    decrement: (state) => {
      state.value = state.value - 1
    },
    incrementByAmount: (state, { payload }) => {
      state.value = state.value + payload
    },
    reset: () => initialState,
  },
  extraReducers: {
    [incrementByAmountAsync.pending.type]: (state) => {
      state.loading = 'pending'
    },
    [incrementByAmountAsync.fulfilled.type]: (state, { payload }) => {
      state.loading = 'idle'
      state.value = state.value + payload
    },
    [incrementByAmountAsync.rejected.type]: (state, { payload }) => {
      state.loading = 'idle'
      state.error = payload
    },
  },
})

// Slice action creators
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions

export const selectCounter = (state) => state.counter

export default counterSlice.reducer
