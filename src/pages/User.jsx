import { useState } from "react";
import Button from "../components/ui/Button";
import Visibility from "../components/ui/Visibility";
import { storeUserData, getUserData } from "../utils/storageFuncs";
import { redirect, useNavigate } from "react-router-dom";

export const userLoader = () => {
  const data = getUserData();
  if (data?.emailAddress?.length > 0) {
    return redirect("/");
  } else {
    return null;
  }
};

const User = () => {
  const [userData, setUserData] = useState({
    emailAddress: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleRegister = (e) => {
    e.preventDefault();
    storeUserData(userData);
    navigate("/");
  };
  return (
    <div className=" flex justify-center items-center h-5/6">
      <form className=" min-w-72 w-1/3 border-2 border-gray-300 rounded-md flex flex-col items-center">
        <p className="text-xl self-center my-4 font-semibold">Register</p>
        <div className="flex flex-col m-4 text-gray-600 text-sm min-w-64">
          <label className="my-2" htmlFor="email ">
            Email address
          </label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={userData?.emailAddress}
            id="emailAddress"
            className=" border-2 border-blue-400 rounded-lg px-2 py-1 text-black text-base"
          />
        </div>
        <div className="flex flex-col m-4 text-gray-600 text-sm min-w-64">
          <Visibility
            password={userData?.password}
            handleChange={handleChange}
          />
        </div>
        <div className="min-w-64 my-6 text-end">
          <span className="  hover:underline ">Forgot your password?</span>
        </div>
        <div className=" my-6">
          <Button handleClick={handleRegister} content={"Submit"} />
        </div>
      </form>
    </div>
  );
};

export default User;
