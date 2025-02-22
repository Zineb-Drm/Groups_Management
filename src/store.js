import { configureStore } from "@reduxjs/toolkit";
//import rootReducer from './slice';
import APISlice from './APIslice'
const store=configureStore({
    reducer:{
        
        groups:APISlice,}
    
})
export default store