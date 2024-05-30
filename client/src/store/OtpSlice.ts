import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    otpSet  : false
}

const otpSlice = createSlice({
    name : 'otp',
    initialState,
    reducers : {
        setOtpSession : (state )=>{
           state.otpSet = true
        }
    }
});

export const {setOtpSession} = otpSlice.actions;
export default otpSlice.reducer;