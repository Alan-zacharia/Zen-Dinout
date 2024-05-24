import { FC } from "react";
import loginImageAdmin from "../../assets/login-admin.jpg";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/api";
import useAdminLogin from "../../hooks/useAdminLogin";


interface Credentials {
  email: string;
  password: string;
}

const AdminLogin: FC = () => {
  const navigate = useNavigate();
  const {error , login , loading} = useAdminLogin();
  const validate = (values: Credentials) => {
    const errors: Partial<Credentials> = {};

    if (!values.email) {
      errors.email = "Email is required";
    }else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }else if(values.password.length < 8){
      errors.password = "Password must be greater than 8 characters"
    }

    return errors;
  };

  const formik = useFormik<Credentials>({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (credentials) => {
      await login(credentials)
    },
  });

  return (
    <div className="flex h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-70"
        style={{ backgroundImage: `url(${loginImageAdmin})` }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-80 "></div>
      <div className="absolute inset-0 flex items-center justify-center w-full p-8 ">
        <div className="opacity-70 w-[380px] px-8 py-10 rounded-md relative shadow-lg shadow-slate-700">
          <h1 className="text-3xl font-bold text-white pb-24">
            Welcome Admin
          </h1>
         {error && (
          <div className="text-red-500">{error}</div>
         )}
          <form className="pb-16" onSubmit={formik.handleSubmit}>
            <label className="block pb-2 text-white font-bold text-lg">
              Email
            </label>
            <input
              {...formik.getFieldProps("email")}
              className="w-full px-2 py-2 focus:outline-none "
              placeholder="Enter your email"
              type="text"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
            <label className="block pb-2 pt-2 text-white font-bold text-lg">
              Password
            </label>
            <input
              {...formik.getFieldProps("password")}
              className="w-full px-2 py-2 focus:outline-none"
              type="password"
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
            <button
              className="w-full py-3 mt-5 block text-white font-bold text-xl bg-blue-700"
              type="submit"
            >
              {loading ? (
                'Loading'
              ):(
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
