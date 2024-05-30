import {configureStore} from '@reduxjs/toolkit'
import otpReducer from './OtpSlice'


const store = configureStore({
    reducer:{
       otpAuth  : otpReducer
    }
});

export default store