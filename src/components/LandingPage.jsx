import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col  items-center justify-center min-h-screen w-full">
      <p className="text-4xl mb-32">M.H Blog Content Manager</p>
      <Link
        className="text-2xl text-[#aaffcc] border-2 border-[#aaffcc] hover:text-[#d1ffdc] hover:border-[#d1ffdc] p-2 rounded-2xl"
        to="/login"
      >
        Admins Login{" "}
      </Link>
    </div>
  );
};

export default LandingPage;
