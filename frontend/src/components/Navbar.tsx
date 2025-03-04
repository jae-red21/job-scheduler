import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className="text-white text-lg font-semibold hover:text-gray-200 transition duration-300"
        >
          Dashboard
        </NavLink>
        <div className="space-x-4">
          <NavLink
            to="/supervisor-dashboard/new-task"
            className={({ isActive }) =>
              `${
                isActive ? "cursor-not-allowed opacity-50" : ""
              } bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300`
            } onClick={(e) => {
                if (e.currentTarget.classList.contains("cursor-not-allowed")) {
                  e.preventDefault(); 
                }
              }}
          >
            Add Task
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
