import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#fdf6e3] px-4">
      <h1 className="text-6xl font-bold text-[#5d4634]">404</h1>
      <p className="text-xl mt-4 text-gray-600">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-[#5d4634] text-[#fdf6e3] rounded hover:bg-[#4b3727] transition-all"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
