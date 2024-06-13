import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { localStorageSetItem } from "../../utils/localStorageImpl";
import {toast} from 'react-hot-toast';
interface GoogleLoginResponse {
  name: string;
  given_name: string;
  email: string;
  picture: string;
}

const GoogleLoginButton = ({label}:{label : string}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
 const login = useGoogleLogin({
  onSuccess : async (response)=>{
      try{
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
          headers:{
            Authorization:`Bearer ${response.access_token}`
          },
          withCredentials: false,
        })
        await axios.post("http://localhost:3000/api/google-login",{email : res.data.email , password : res.data.sub, username : res.data.given_name }).then((res)=>{
        localStorageSetItem("%%register%%" , "true");
        queryClient.invalidateQueries("validateToken");
        navigate("/");
        }).catch((error)=>{
          toast.error(error.response.data.message);
        })
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
