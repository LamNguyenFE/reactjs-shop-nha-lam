import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { urlApi } from "./url";
import { signin, userSelector } from '../slice/userSlice'

// Utils


//Reducer thunk
export const updateUserProfile = createAsyncThunk(
  'userUpdateProfile/updateUserProfile',
  async (user, { getState, rejectWithValue }) => {
    const { userInfo } = getState().users

    try {
      // console.log('im here');
      // console.log(user);


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
  success: false,
  loading: false,
  error: '',
}

export const userUpdateProfileSlice = createSlice({
  name: 'userUpdateProfile',
  initialState,
  reducers: {},
  extraReducers: {
    [updateUserProfile.pending]: (state, action) => {
      if (state.loading === false) {
        state.success = false
        state.loading = true
      }
    },
    [updateUserProfile.fulfilled]: (state, { payload }) => {
      if (state.loading === true) {
        state.loading = false
        state.success = true

      }
    },
    [updateUserProfile.rejected]: (state, action) => {
      console.log("payload", action);
      if (state.loading === true) {
        state.loading = false
        state.error = action.error.message
        state.success = false
      }
    },
  },
})



// Selectors
export const userUpdateProfileSelector = (state) => state.userUpdateProfile

//export reducer
export default userUpdateProfileSlice.reducer
