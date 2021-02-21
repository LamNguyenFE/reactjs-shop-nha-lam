import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { urlApi } from "./url";

// Utils


//Reducer thunk
export const signin = createAsyncThunk(
  'users/signinAsync',
  async ({
    email = '',
    password = '',
  }, { rejectWithValue }) => {
    try {
      console.log('email', email)
      console.log('p', password)

      const { data } = await axios.post(urlApi + 'users/signin', { email, password });


      console.log('signin action', data);
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

export const register = createAsyncThunk(
  'users/registerAsync',
  async ({
    name = '',
    email = '',
    password = '',
  }, { rejectWithValue }) => {
    try {

      const { data } = await axios.post(urlApi + 'users/register', { name, email, password });

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

//Reducer thunk
export const updateUserProfile = createAsyncThunk(
  'users/updateUserProfile',
  async (user, { getState, rejectWithValue }) => {
    const { userInfo } = getState().users

    try {
      console.log('im here');
      console.log(user);


      const { data } = await axios.put(`${urlApi}users/profile`, user, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log(data);
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
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
  loading: false,
  error: '',

  successUpdate: false,
  loadingUpdate: false,
  errorUpdate: '',


}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    signout: (state) => {
      //haiz clear is all
      // localStorage.removeItem("userInfo")
      //removeItem is 1 item
      localStorage.removeItem("userInfo")
      // localStorage.removeItem("cartItems") 
      state = {}
      document.location.href = '/signin'
    },

  },
  extraReducers: {
    [signin.pending]: (state, action) => {
      if (state.loading === false) {
        state.loading = true
      }
    },
    [signin.fulfilled]: (state, { payload }) => {
      if (state.loading === true) {
        state.loading = false
        state.userInfo = payload
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    },
    [signin.rejected]: (state, action) => {
      console.log("payload", action);
      if (state.loading === true) {
        state.loading = false

        state.error = action.error.message
      }
    },


    [register.pending]: (state, action) => {
      if (state.loading === false) {
        state.loading = true
      }
    },
    [register.fulfilled]: (state, { payload }) => {
      if (state.loading === true) {
        state.loading = false
        state.userInfo = payload
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    },
    [register.rejected]: (state, action) => {
      console.log("payload", action);
      if (state.loading === true) {
        state.loading = false

        state.error = action.error.message
      }
    },


    [updateUserProfile.pending]: (state, action) => {
      if (state.loading === false) {
        state.loadingUpdate = true
      }
    },
    [updateUserProfile.fulfilled]: (state, { payload }) => {
      if (state.loadingUpdate === true) {
        state.loadingUpdate = false
        state.successUpdate = true
        state.userInfo = payload
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    },
    [updateUserProfile.rejected]: (state, action) => {
      console.log("payload", action);
      if (state.loadingUpdate === true) {
        state.loadingUpdate = false
        state.errorUpdate = action.error.message
        state.successUpdate = false
      }
    },


  },
})

// Slice action creators
export const { signout } = userSlice.actions

// Selectors
export const userSelector = (state) => state.users

//export reducer
export default userSlice.reducer
