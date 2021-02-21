import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { urlApi } from "./url";

// Utils


//Reducer thunk
export const listProductsAsync = createAsyncThunk(
  'products/listProducts',
  async ({
    pageNumber = '',
    name = '',
    category = '',
    order = '',
    min = 0,
    max = 0,
    rating = 0,
  }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${urlApi}products?pageNumber=${pageNumber}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`)


      // console.log('listProducts action', data);
      //return payload
      return data
    } catch (err) {
      console.log("error hhh", err)

      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility

      console.log(rejectWithValue(err.response.data));
      return rejectWithValue(err.response.data)
    }


  }
)



const initialState = {
  products: [],
  pages: 1,
  page: 1,
  loading: false,
  error: '',
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

  },
  extraReducers: {
    [listProductsAsync.pending]: (state, action) => {
      if (state.loading === false) {
        state.loading = true
      }
    },
    [listProductsAsync.fulfilled]: (state, { payload }) => {
      if (state.loading === true) {
        state.loading = false
        state.products = payload.products
        state.pages = payload.pages
        state.page = payload.page
      }
    },
    [listProductsAsync.rejected]: (state, action) => {
      console.log("payload", action);
      if (state.loading === true) {
        state.loading = false

        state.error = action.error.message
      }
    },
  },
})

// Selectors
export const productSelector = (state) => state.products

//export reducer
export default productSlice.reducer
