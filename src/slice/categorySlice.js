import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { urlApi } from "./url";

// Utils


//Reducer thunk
export const getProductCategoryList = createAsyncThunk(
  'categories/listCategorys',
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${urlApi}products/categories`);


      console.log(`${urlApi}products/categories`);
      console.log('listCategorys action', data);
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
  categories: [],
  loading: false,
  error: '',
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {

  },
  extraReducers: {
    [getProductCategoryList.pending]: (state, action) => {
      if (state.loading === false) {
        state.loading = true
      }
    },
    [getProductCategoryList.fulfilled]: (state, { payload }) => {
      if (state.loading === true) {
        state.loading = false
        state.categories = payload
      }
    },
    [getProductCategoryList.rejected]: (state, action) => {
      console.log("payload", action);
      if (state.loading === true) {
        state.loading = false

        state.error = action.error.message
      }
    },
  },
})

// Selectors
export const categorySelector = (state) => state.categories

//export reducer
export default categorySlice.reducer
