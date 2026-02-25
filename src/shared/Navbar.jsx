import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../AuthContext/AuthProvider";
import { LogOut, LayoutDashboard, ChevronDown, Menu } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, LogOut: firebaseLogOut } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/${user.email}`)
        .then((res) => setRole(res.data.role))
        .catch((err) => console.error("Error fetching role", err));
    }
  }, [user]);

  const handleLogOut = async () => {
    try {
      await firebaseLogOut();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed! Please try again.");
    }
  };

  const activeLink = "text-indigo-600 font-bold border-b-2 border-indigo-600 pb-1";
  const normalLink = "text-slate-600 hover:text-indigo-600 transition-all font-medium";

  const navLinks = (
    <>
      <li><NavLink to="/" className={({ isActive }) => (isActive ? activeLink : normalLink)}>Home</NavLink></li>
      <li><NavLink to="/services" className={({ isActive }) => (isActive ? activeLink : normalLink)}>Services</NavLink></li>
      <li><NavLink to="/about" className={({ isActive }) => (isActive ? activeLink : normalLink)}>About</NavLink></li>
      <li><NavLink to="/contact" className={({ isActive }) => (isActive ? activeLink : normalLink)}>Contact</NavLink></li>
      
      {/* ইউজার লগইন না থাকলে শুধু তখন SignUp দেখাবে */}
      {!user && (
        <li>
          <NavLink to="/registition" className={({ isActive }) => (isActive ? activeLink : normalLink)}>SignUp</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-white/90 backdrop-blur-md sticky top-0 z-[100] border-b border-slate-100 px-4 lg:px-12 h-20">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <Menu className="h-6 w-6 text-slate-800" />
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-5 shadow-2xl bg-white rounded-3xl w-64 gap-4 border border-slate-50">
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="flex items-center">
          <img className="h-10 md:h-12" src="https://i.ibb.co.com/tp8P8z6F/images-2-removebg-preview.png" alt="Logo" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-10 items-center">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          /* ইউজার থাকলে শুধু প্রোফাইল ড্রপডাউন দেখাবে */
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost flex items-center gap-2 hover:bg-slate-50 rounded-2xl px-2">
              <div className="avatar">
                <div className="w-10 rounded-xl ring-2 ring-indigo-100 ring-offset-2">
                  <img src={user?.photoURL || "https://i.ibb.co/mR79Y6B/user.png"} alt="profile" />
                </div>
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden md:block" />
            </label>

            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-white rounded-[24px] w-60 border border-slate-100 gap-1">
              <li className="px-4 py-3 border-b border-slate-50 mb-2">
                <p className="font-bold text-slate-800 text-sm truncate">{user?.displayName || "User Name"}</p>
                <p className="text-[10px] text-slate-400 truncate mb-2">{user?.email}</p>
                <span className="badge bg-indigo-50 text-indigo-600 font-bold border-none text-[10px] uppercase">
                  {role || "user"}
                </span>
              </li>

              <li>
                <Link to={role === "admin" ? "/dashboard/adminHome" : "/dashboard/userHome"} className="flex items-center gap-3 py-3 hover:bg-indigo-50 rounded-xl text-slate-700">
                  <LayoutDashboard size={18} className="text-indigo-500" /> Dashboard
                </Link>
              </li>

              <li className="mt-1 pt-1 border-t border-slate-50">
                <button onClick={handleLogOut} className="flex items-center gap-3 py-3 text-rose-500 hover:bg-rose-50 rounded-xl font-bold w-full text-left">
                  <LogOut size={18} /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          /* ইউজার না থাকলে শুধু তখন Login বাটন দেখাবে */
          <Link to="/login" className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl px-8 shadow-lg shadow-indigo-100 font-bold">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;