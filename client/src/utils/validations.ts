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
  if (!values.username) {
    errors.username = "Name is required";
  };

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

  if (!values.role) {
    errors.role = "Role is required";
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
}
