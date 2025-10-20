import React from "react";

const Loader = ({ size = 5, color = "mainstack-primary-black" }) => {
  const sizeClass = `w-${size} h-${size}`;
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-4 border-t-${color} border-b-${color} border-l-transparent border-r-transparent ${sizeClass}`}
      ></div>
    </div>
  );
};

export default Loader;
