import store from "../redux/store";
import { clearUser } from "../redux/user/userSlice";
import toast from "react-hot-toast"

const  logout = (message: string): void => {
  store.dispatch(clearUser());
  toast.success(message)
};
export default logout;
