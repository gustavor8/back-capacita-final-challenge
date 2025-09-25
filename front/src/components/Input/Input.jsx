import React from "react";

const style =
  "w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-300 shadow-sm";

const Input = ({ id, type, placeholder, value, onChange }) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={style}
    />
  );
};

export default Input;
