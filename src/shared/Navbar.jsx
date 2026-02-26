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
        .get(`https://fintrack-server-4n3g.onrender.com/users/${user.email}`)
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
      toast.error("Logout failed!");
    }
  };

  // ডার্ক ব্যাকগ্রাউন্ডের জন্য কালার আপডেট
  const activeLink = "text-emerald-400 font-bold border-b-2 border-emerald-400 pb-1";
  const normalLink = "text-gray-300 hover:text-emerald-400 transition-all font-medium";

  const navLinks = (
    <>
      <li><NavLink to="/" className={({ isActive }) => (isActive ? activeLink : normalLink)}>Home</NavLink></li>
      <li><NavLink to="/services" className={({ isActive }) => (isActive ? activeLink : normalLink)}>Services</NavLink></li>
      <li><NavLink to="/about" className={({ isActive }) => (isActive ? activeLink : normalLink)}>About</NavLink></li>
      <li><NavLink to="/contact" className={({ isActive }) => (isActive ? activeLink : normalLink)}>Contact</NavLink></li>
      {!user && (
        <li><NavLink to="/registition" className={({ isActive }) => (isActive ? activeLink : normalLink)}>SignUp</NavLink></li>
      )}
    </>
  );

  return (
    // মেইন নেভবার কন্টেইনার (Glass Look)
    <div className="navbar bg-[#070b15]/70 backdrop-blur-xl sticky top-0 z-[100] border-b border-white/10 px-4 lg:px-12 h-20">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <Menu className="h-6 w-6 text-white" />
          </label>
          {/* মোবাইল মেনু - ডার্ক ব্যাকগ্রাউন্ড */}
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-5 shadow-2xl bg-[#0f172a] rounded-3xl w-64 gap-4 border border-white/10">
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-2">
          <img className="h-10 md:h-12" src="https://i.ibb.co.com/Pz5z6bN6/Gemini-Generated-Image-ita1w9ita1w9ita1.png" alt="Logo" />
          <span className="text-xl font-black tracking-tighter text-white hidden sm:block">FIN<span className="text-emerald-400">TRACK</span></span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-10 items-center">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost flex items-center gap-2 hover:bg-white/5 rounded-2xl px-2">
              <div className="avatar">
                <div className="w-10 rounded-xl ring-2 ring-emerald-500/30 ring-offset-2 ring-offset-[#070b15]">
                  <img src={user?.photoURL || "https://i.ibb.co/mR79Y6B/user.png"} alt="profile" />
                </div>
              </div>
              <ChevronDown size={14} className="text-gray-400 hidden md:block" />
            </label>

            {/* প্রোফাইল ড্রপডাউন - ডার্ক গ্লাস লুক */}
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-[#0f172a]/95 backdrop-blur-2xl rounded-2xl w-60 border border-white/10 gap-1 text-white">
              <li className="px-4 py-3 border-b border-white/5 mb-2">
                <p className="font-bold text-white text-sm truncate">{user?.displayName || "User Name"}</p>
                <p className="text-[10px] text-gray-400 truncate mb-2">{user?.email}</p>
                <span className="badge bg-emerald-500/10 text-emerald-400 font-bold border-none text-[10px] uppercase px-3">
                  {role || "user"}
                </span>
              </li>

              <li>
                <Link to={role === "admin" ? "/dashboard/adminHome" : "/dashboard/userHome"} className="flex items-center gap-3 py-3 hover:bg-white/5 rounded-xl transition-colors">
                  <LayoutDashboard size={18} className="text-emerald-400" /> Dashboard
                </Link>
              </li>

              <li className="mt-1 pt-1 border-t border-white/5">
                <button onClick={handleLogOut} className="flex items-center gap-3 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl font-bold w-full transition-colors">
                  <LogOut size={18} /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn bg-emerald-500 hover:bg-emerald-600 text-[#070b15] border-none rounded-xl px-8 shadow-lg shadow-emerald-500/20 font-bold transition-all transform hover:scale-105">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;