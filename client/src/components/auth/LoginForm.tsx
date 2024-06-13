import loginImage from "../../assets/Login-image.jpg";
import { useFormik } from "formik";
import GoogleLoginButton from "../auth/GooglLoginButton";
import useLogin from "../../hooks/useLogin";
import { loginValidation } from "../../utils/validations";
import { Link } from "react-router-dom";
import { localStorageRemoveItem } from "../../utils/localStorageImpl";
import { useAppContext } from "../../Contexts/AppContext";
import { Toaster } from "react-hot-toast";

interface UserType {
  email: string;
  password: string;
  role: string;
};

const LoginForm: React.FC = () => {
  localStorageRemoveItem("&reset%pas%%");
  const { isLoggedIn } = useAppContext();
  const { loading, loginFn, error } = useLogin();
  const formik = useFormik<UserType>({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },
    validate: loginValidation,
    onSubmit: async (credentials: UserType) => {
      console.log(credentials);
      try {
        loginFn(credentials, credentials.role);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Toaster position="top-center" />
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
              {error && <div className="text-red-500">{error}</div>}
              <input
                type="text"
                placeholder="Email"
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
            <div className="flex items-center mb-6">
              {isLoggedIn ? (
                <>
                  {formik.errors.role &&
                  formik.submitCount > 0 &&
                  formik.touched.role ? (
                    <select
                      {...formik.getFieldProps("role")}
                      className="font-bold focus:outline-none text-red-500"
                    >
                      <option value="choose">Please choose role</option>
                      <option value="seller">Seller</option>
                    </select>
                  ) : (
                    <select
                      {...formik.getFieldProps("role")}
                      className="font-bold focus:outline-none text-gray-700"
                    >
                      <option value="choose">Choose role</option>
                      <option value="seller">Seller</option>
                    </select>
                  )}
                </>
              ) : (
                <select
                  {...formik.getFieldProps("role")}
                  className="font-bold focus:outline-none text-gray-700"
                >
                  <option value="choose">Choose user or seller</option>
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                </select>
              )}
            </div>
            <div className="flex flex-col mb-4">
              <button
                disabled={false}
                className="w-full bg-black text-white rounded-md py-3 text-center font-bold cursor-pointer mb-2"
                type="submit"
              >
                {loading ? "Loading" : "Login"}
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

export default LoginForm;
