import React from 'react';

const style = "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105 shadow-lg";

const Button = ({ children, onClick, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick} className={style}>
      {children}
    </button>
  );
};

export default Button;
