import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">ListingApp</h1>
      <nav className="space-x-4">
        <button className="text-sm">Sign In</button>
        <button className="text-sm bg-blue-500 text-white px-3 py-1 rounded">
          Sign Up
        </button>
      </nav>
    </header>
  );
};

export default Header;
