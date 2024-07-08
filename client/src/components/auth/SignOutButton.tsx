import React from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/user/userSlice";
import logout from "../../utils/Logout";
import { useNavigate } from "react-router-dom";

const SignOutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(clearUser());
    logout("Logout Successfully completed");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <button
      onClick={handleClick}
      className="text-white mx-5 px-3 p-[6px] font-bold bg-red-500 hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default SignOutButton;
