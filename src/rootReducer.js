import { combineReducers } from '@reduxjs/toolkit'

// Reducers
import counterReducer from 'slice/counterSlice'
import cartReducer from 'slice/cartSlice'

import productReducer from "slice/productSlice";
import categoryReducer from "slice/categorySlice";

import userReducer from "slice/userSlice";
import userDetailReducer from "slice/userDetailSlice";
import userUpdateProfileReducer from "slice/userUpdateProfileSlice";


const rootReducer = combineReducers({

    cart: cartReducer,

    users: userReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,

    products: productReducer,
    categories: categoryReducer,

})


export default rootReducer
