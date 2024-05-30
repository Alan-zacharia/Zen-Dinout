import axios from "axios";
import { OtpType } from "../utils/validations";
axios.defaults.baseURL = "http://localhost:3000"


interface credentials {
  username: string;
  email: string;
  password: string;
  role:string;
}
/** return api response */
export interface APIresponse {
  data: {
    message?: string;
    user?: credentials;
    token?: string;
    refreshToken?: string;
    otp?:string
  };
}

/**
 * Function for user and seller registeration
 * @param data - Object containing name , email and password for registeration
 * @returns Promise that resolves to an object containing the registeration details
 */
const register = async (credentials: credentials) => {
  try {
    const {
      data: { message, user, token },
    } = await axios.post("/api/register", credentials);
    return { data: { message, user, token } };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Function for user and seller login
 * @param data - Object containing email and password for login
 * @returns Promise that resolves to an object containing the logged-in  user , mesage , jwt, or null if login fails
 */
const login = async (data: Partial<credentials>): Promise<APIresponse> => {
  try {
    const {
      data: { message, user, token },
    } = await axios.post("/api/login", data);
    return { data: { message, user, token } };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Function for admin login
 * @param data - Object containing email and password for login
 * @returns Promise that resolves to an object containing the logged-in  admin , mesage , jwt, or null if login fails
 */
const adminLogin = async (data: Partial<credentials>): Promise<APIresponse> => {
  try {
    const {
      data: { message, user, token },
    } = await axios.post("/admin/login", data);
    return { data: { message, user, token } };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const otpForm = async(otp : OtpType , userId : string)=>{
 try{
    const {data :  { message , success }} = await axios.post('/api/otp',{otp, userId});
    console.log(message , success )
    return {data : {message , success}};
 }catch(error){
  console.log(error); 
  throw error;
 }
}
const resendOtp = async( userId : string)=>{
 try{
    const {data :  { message , success }} = await axios.post('/api/resend-otp',{userId});
    console.log(message , success )
    return {data : {message , success}};
 }catch(error){
  console.log(error); 
  throw error;
 }
}
const OtpSend = async( email : string)=>{
 try{
    const { data:{otp} } = await axios.post('/api/send-otp',{email});
    console.log(otp)
    return {otp};
 }catch(error){
  console.log(error); 
  throw error;
 }
}

export { login, register, adminLogin , otpForm , resendOtp , OtpSend };
