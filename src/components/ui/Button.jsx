import React from "react";

const Button = ({ content, handleClick }) => {
  return (
    <div
      className=" cursor-pointer bg-sky-600 text-white py-1 px-4 rounded-lg w-32 text-center"
      onClick={handleClick}>
      {content}
    </div>
  );
};

export default Button;
