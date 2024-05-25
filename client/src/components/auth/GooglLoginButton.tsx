import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

import { useNavigate } from "react-router-dom";

interface GoogleLoginResponse {
  name: string;
  given_name: string;
  email: string;
  picture: string;
}

const GoogleLoginButton = () => {
 const login = useGoogleLogin({
  onSuccess : async (response)=>{
      try{
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
          headers:{
            Authorization:`Bearer ${response.access_token}`
          },
          withCredentials: false,
        })
        console.log(res)
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
        Sign In with Google
      </button>
    </>
  );
};

export default GoogleLoginButton;
