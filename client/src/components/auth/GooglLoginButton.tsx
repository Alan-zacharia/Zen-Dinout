import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { localStorageSetItem } from "../../utils/localStorageImpl";
import {toast} from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../../redux/user/UserSlice";
const PASS_KEY = import.meta.env.VITE_API_BCRYPT_PASS_KEY;


const GoogleLoginButton = ({label}:{label : string}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useGoogleLogin({
  onSuccess : async (response)=>{
      try{
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
          headers:{
            Authorization:`Bearer ${response.access_token}`
          },
          withCredentials: false,
        })
        if(label === "In"){
          await axios.post("http://localhost:3000/api/login",{email : res.data.email , password : res.data.sub + PASS_KEY , username : res.data.given_name }).then((res)=>{
            console.log(res)
            localStorageSetItem("%%register%%" , "true");
            dispatch(signInSuccess(res.data));
            queryClient.invalidateQueries("validateToken");
            navigate("/");
            }).catch((error)=>{
              console.log(error);
              dispatch(signInFailure(error.response.data.message));
              toast.error(error.response.data.message);
            })
        }else{
          await axios.post("http://localhost:3000/api/google-login",{username : res.data.given_name , email : res.data.email , password : res.data.sub + PASS_KEY}).then((res)=>{
            console.log(res)
            dispatch(signInSuccess(res.data));
            queryClient.invalidateQueries("validateToken");
            navigate("/");
            }).catch((error)=>{
              console.log(error)
              dispatch(signInFailure(error.response.data.message));
              toast.error(error.response.data.message);
            })
        }
      }catch(error){
        console.log(error)
      }
    }  
 })

  return (
    <>
      <button
        className="w-full mt-5 bg-white border border-black rounded-md py-3 text-center font-semibold flex justify-center"
        onClick={() => login()}
      >
        <FcGoogle className="size-6" />
        Sign {label} with Google
      </button>
    </>
  );
};

export default GoogleLoginButton;
