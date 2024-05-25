import { Navigate } from 'react-router-dom';
import OtpPage from '../pages/Otp'
import { localStorageGetItem } from '../utils/localStorageImpl'


export const renderComponent = () => {
    const otpSessionExists =  localStorageGetItem("otpSession"); 
    return otpSessionExists ? <OtpPage /> : <Navigate to='/register'/>;
  };