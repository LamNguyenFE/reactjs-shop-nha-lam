import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { urlApi } from "./url";

// Utils


export const detail = createAsyncThunk(
  'users/detailAsync',
  async (
    args
    , { getState, rejectWithValue }) => {
    const { userInfo } = getState().users

    try {
      // alert('im here')//ok
      // console.log(userInfo);
      // console.log(`${urlApi}users/${userInfo.userId}`);
      // console.log(`Bearer ${userInfo?.token}`);

      const { data } = await axios.get(`${urlApi}users/${userInfo._id}`, {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      });
      //return payload
      console.log(data)
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
  loading: false,
  error: '',
  //user detail page
  user: {},
}

export const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    // signout: (state) => {
    //   localStorage.removeItem("userInfo")
    //   localStorage.removeItem("cartItems")
    //   state = {}
    //   document.location.href = '/signin'
    // },
  },
  extraReducers: {

    //detail
    [detail.pending]: (state, action) => {
      if (state.loading === false) {
        state.loading = true
      }
    },
    [detail.fulfilled]: (state, { payload }) => {
      if (state.loading === true) {
        state.loading = false
        state.user = payload
      }
    },
    [detail.rejected]: (state, action) => {
      console.log("payload", action);
      if (state.loading === true) {
        state.loading = false
        state.error = action.error.message
      }
    },

  },
})

// Slice action creators
// export const { signout } = userSlice.actions

// Selectors
export const userDetailSelector = (state) => state.userDetail

//export reducer
export default userDetailSlice.reducer
