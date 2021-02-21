import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import Axios from "axios";
import { urlApi } from './url'



// Async actions
export const addToCart = createAsyncThunk(
  'cart/addToCartAsync',
  async (params, { rejectWithValue }) => {

    console.log(params);

    const [productId, qty] = params
    try {
      console.log('eee');
      const { data } = await Axios.get(urlApi + "products/" + productId);
      console.log('eeedata', data);
      const item = {
        _id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        qty
      }
      console.log('eeeitem', item);
      return item
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)



const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  loading: false,
  error: '',
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeFromCart: (state, { payload }) => {
      console.log('xx');
      console.log('xxpl', payload);
      console.log('xx', state);

      state.cartItems = state.cartItems.filter(x => x._id !== payload)
      console.log('xy', state);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },

  },
  extraReducers: {
    [addToCart.pending]: (state) => {
      state.loading = true
    },
    [addToCart.fulfilled]: (state, { payload }) => {
      state.loading = false

      //get item
      const item = payload;
      console.log(item);
      //check item in cartItems or not
      const product = state.cartItems.find(x => x._id === item._id);

      console.log("product", product);
      //if in
      if (product) {
        //not work
        //return { ...state, cartItems: state.cartItems.map(x => x._id === product._id ? item : x) }

        state.cartItems = state.cartItems.map(x => x._id === product._id ? item : x)
      } else {
        state.cartItems.push(item)
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

    },
    [addToCart.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

// Slice action creators
export const { removeFromCart, clearCart } = cartSlice.actions

export const cartSelector = (state) => state.cart

export default cartSlice.reducer
