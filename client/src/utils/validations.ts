import { credentials } from "../services/SellerApiClient";
import * as Yup from  "yup";


export interface UserType {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
  _id?: string;
}
export interface OtpType {
   otp:string;
}

/** Login Validation */
export const loginValidation = (values: Partial<UserType>) => {
  const errors: Partial<UserType> = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Please enter a valid email address";
  };

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be 8 characters long";
  };

  if (!values.role) {
    errors.role = "Role is required";
  };

  return errors;
};


/** Validation for registeration */
export const registerValidation = (values: Partial<UserType>) => {
  const errors: Partial<UserType> = {};
  if (!values.username || !values.username.trim()) {
    errors.username = "Please enter your full name!";
} else if (!/^[A-Za-z]/.test(values.username)) {
    errors.username = "First letter should be a capital letter.";
} else if (!/^[A-Za-z\s]+$/.test(values.username)) {
    errors.username = "Name can only contain letters and spaces.";
}


  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Please enter a valid email address";
  };

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be 8 characters long";
  };

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  }else if (values.confirmPassword.length < 8) {
    errors.confirmPassword = "Password must be 8 characters long";
  }else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Password do not matching";
  };

  return errors;
};

/** Otp Validation */
export const validateOtp = (value : OtpType) => {
    const error : Partial<OtpType>  = {}
    if(!value.otp){
        error.otp = "Otp is required";
    }else if(value.otp.length < 6){
        error.otp = "Otp must be 6 characters long";
    }
    return error;
};
/**  Seller registeration confirmation Validation  */
export const SellerRegisterationValidate = () =>{
  return Yup.object().shape({
    restaurantName : Yup.string().required("Please enter your Restaurant name !").test('capitalized', 'Restaurant name must start with a capital letter', (value) => {
      if (value) {
        return /^[A-Z]/.test(value); 
      }
      return true;
    }).min(2,"Please enter your Restaurant name!"),
    email: Yup.string().email("Invalid email format").nullable().required("Please enter your email address !"),
    contact: Yup.string() 
    .required("Please enter your contact number!")
    .matches(/^[0-9]+$/, "Invalid contact number") 
    .min(10, 'Invalid phone number') 
    .max(10, 'Invalid phone number'), 
    password : Yup.string().required("Please enter your password !").min(8,'Password must be 8 characters length').max(20 , 'Password must be less than 20 characters').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
  })
}

/**  Seller Validation  */
export const sellerRegiseterationValidation = ()=>{
  return Yup.object().shape({
    restaurantName : Yup.string().required("Restaurant name is required !"),
    email : Yup.string().email("Invalid Email Format").required("Email is required !"),
    contact : Yup.string().required("Contact is required !").length(10),
    address : Yup.string().required("Address is required !"),
    description : Yup.string().required("Description is required !"),
    location : Yup.string().required("Location is required !"),
    openingTime : Yup.string().required("Opening time is required !"),
    closingTime : Yup.string().required("Closing time is required !"),
    TableRate : Yup.number().required("Table rate is required !").min(1,"Table Rate must be valid !").max(1000,"Table rate limit is 1000"),
    featuredImage: Yup.mixed()
      .required("Image is required !")
      .test(
        "FILE_SIZE",
        "Too big!",
        (value: any) => value && value.size < 1024 * 1024
      )
      .test(
        "FILE_TYPE",
        "Invalid!",
        (value: any) =>
          value && ["image/png", "image/jpeg"].includes(value.type)
      ),
      secondaryImages: Yup.mixed()
      .required("Image is required !")
      .test(
        "FILE_SIZE",
        "Too big!",
        (value: any) => value && value.size < 1024 * 1024
      )
      .test(
        "FILE_TYPE",
        "Invalid!",
        (value: any) =>
          value && ["image/png", "image/jpeg"].includes(value.type)
      ),
  })
}


export const valdateResetPassword = ()=>{
     return Yup.object().shape({
      password : Yup.string().required("Please enter the password !").max(20,"Please enter a password less than 20 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!"),
      confirmPassword:Yup.string().required("Confirm password is required !").min(8,"Password must be 8 characters long !").max(20,"Please enter a password less than 20 characters")
      .oneOf([Yup.ref("password")],"Passwords must match")
     })
}