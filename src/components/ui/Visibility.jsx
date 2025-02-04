import React from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";

const Visibility = ({ password, handleChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <label className="my-2 flex justify-between" htmlFor="password ">
        <div className="">Password</div>
        <div
          onClick={() => setIsVisible(!isVisible)}
          className=" flex justify-center items-center">
          {!isVisible ? (
            <>
              <VisibilityIcon style={{ width: "18px" }} />
              <p className="hover:underline ml-1">Show</p>
            </>
          ) : (
            <>
              <VisibilityOffIcon style={{ width: "18px" }} />
              <p className="hover:underline ml-1">Hide</p>
            </>
          )}
        </div>
      </label>
      <input
        type={isVisible ? "text" : "password"}
        name="password"
        id="password"
        value={password}
        onChange={handleChange}
        className=" border-2 w-full border-blue-400 rounded-lg px-2 py-1 text-black text-base"
      />
    </div>
  );
};

export default Visibility;
