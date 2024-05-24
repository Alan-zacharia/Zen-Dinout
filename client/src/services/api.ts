import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000"


interface credentials {
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
const login = async (data: credentials): Promise<APIresponse> => {
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
const adminLogin = async (data: credentials): Promise<APIresponse> => {
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

export { login, register, adminLogin };
