import loginImage from "../../assets/Login-image.jpg";
import { useFormik } from "formik";
import GoogleLoginButton from "../auth/GooglLoginButton";
import { loginValidation } from "../../utils/validations";
import { Link, useNavigate } from "react-router-dom";
import { localStorageRemoveItem, localStorageSetItem } from "../../utils/localStorageImpl";
import { useEffect, useRef , useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { login } from "../../services/api";
import { setUser } from "../../redux/user/userSlice";

interface UserType {
  email: string;
  password: string;
};

const UserLoginForm: React.FC = () => {
  localStorageRemoveItem("&reset%pas%%");
  const userRef = useRef<HTMLInputElement>(null);
  const [loading , setLoading] = useState<boolean>(false);
  const [errorMessage , setError] = useState<string>("");
  useEffect(()=>{
    userRef.current?.focus() 
  },[]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik<UserType>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidation,
    onSubmit: async (credentials: UserType) => {
      setLoading(true)
      console.log(credentials);
      await login(credentials).then((res)=>{
      console.log(res.data.user);
      const {username , role , _id} = res.data.user
      const {token , refreshToken } = res.data
      dispatch(setUser({
        isAuthenticated : true,
        name : username,
        role : role,
        id: _id,
      }));
      setLoading(false)
      localStorageSetItem("accessToken", token);
      navigate("/");
    }).catch(({response})=>{
      setLoading(false)
      console.log(response?.data?.message)
      setError(response?.data?.message);
    });
    },
  });
 

  return (
    <>
      
      <div className="relative w-full lg:w-1/2 h-96 lg:h-screen lg:block hidden md:block">
        <div className="absolute top-1/4 left-10 flex flex-col">
          <h1 className="text-4xl text-white font-bold mb-4">
            Turn your ideas into reality
          </h1>
          <p className="text-xl text-white font-semibold">
            Free for the community
          </p>
        </div>
        <img
          src={loginImage}
          alt="Login"
          className="w-full h-full object-cover  "
        />
      </div>
      <div className="w-full lg:w-1/2 bg-white flex flex-col p-8 lg:p-20 justify-between">
        <h1 className="text-xl text-black font-semibold mb-8">Zen Dinout</h1>

        <div className="w-full flex flex-col max-w-md mx-auto lg:mx-20 ">
          <div className="mb-10">
            <h3 className="text-3xl font-semibold mb-2">Login</h3>
            <p className="text-base mb-2">
              Welcome Back! Please Enter your details.
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <div className="text-red-500">{errorMessage}</div>
              <input
                type="text"
                placeholder="Email"
                ref={userRef}
                className="w-full py-2 px-2 my-2 bg-transparent text-black border-black border-b outline-none focus:outline-none"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email &&
                formik.submitCount > 0 &&
                formik.errors.email && (
                  <div className="text-red-500">{formik.errors.email}</div>
                )}
              <input
                type="password"
                placeholder="Password"
                className="w-full py-2 px-2 my-2 bg-transparent text-black border-black border-b outline-none focus:outline-none"
                {...formik.getFieldProps("password")}
              />
               {formik.touched.password &&
                formik.submitCount > 0 &&
                formik.errors.password && (
                  <div className="text-red-500">{formik.errors.password}</div>
                )}
              <p className="ml-auto text-sm underline flex justify-end">
                <Link to={"/reset-password"}>
                  <a className="cursor-pointer ">Forgot password ?</a>
                </Link>
              </p>
             
            </div>
          
            <div className="flex flex-col mb-4">
              <button
                className="w-full bg-black text-white rounded-md py-3 text-center font-bold cursor-pointer mb-2"
                type="submit"
               disabled={loading}
              >
              {loading ? "loading" : "Login"}
              </button>
              <Link to={"/register"}>
                <button className="w-full bg-white border border-black rounded-md py-3 text-center font-semibold cursor-pointer">
                  Register
                </button>
              </Link>
            </div>
          </form>
          <div className="relative w-full flex items-center justify-center py-2">
            <div className="w-full bg-black/40 h-[1px]"></div>
            <p className="absolute bg-white text-black/80 px-2">or</p>
          </div>
          <GoogleLoginButton label={"In"} />
        </div>
        <div className="flex justify-center">
          <p className="text-sm font-normal text-black">
            Don't have an account?
            <span className="font-semibold underline cursor-pointer">
              Sign up for free
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserLoginForm;