export interface userType {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  _id?: string;
}

export interface otpType {
  otp: string;
}

/** return api response */
export interface credentials {
  username: string;
  email: string;
  password: string;
}

/** return api response */
export interface APIresponse {
  data: {
    message?: string;
    user?: credentials;
    token?: string;
    refreshToken?: string;
    otp?: string;
  };
}
