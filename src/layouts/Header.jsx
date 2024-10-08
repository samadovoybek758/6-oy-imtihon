import React from "react";
import logo from "../assets/open-book.png";
import { Link } from "react-router-dom";

function Header({ children }) {

  function log_out(e) {
    e.preventDefault()
    localStorage.removeItem('token')
  }
  return (
    <>
      <header className="bg-gray-300">
        <div className="continer max-w-[1200px] mx-auto my-2 mb-24 py-3 flex items-center justify-between">
          <img className="" src={logo} alt="" />
          <div className="flex gap-3 ">
            <Link className="text-lg text-white font-sans " to={"/login"}>Login</Link>
            <Link className="text-lg text-white font-sans " to={"/"}>Home</Link>
            <Link className="text-lg text-white font-sans " to={"/"}>About</Link>
          </div>
          <button onClick={log_out} className="px-5 hover:bg-red-400 py-2 bg-red-500 rounded-md border-none text-white">Log out</button>
        </div>
      </header>
      {children}
    </>
  );
}

export default Header;
