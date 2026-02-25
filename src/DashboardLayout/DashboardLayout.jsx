import { LayoutDashboard, PlusCircle, History, Target, Home, LogOut, Menu, UserCircle } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Outlet, useNavigate } from "react-router";
import { AuthContext } from "../AuthContext/AuthProvider";

const DashboardLayout = () => {
  const { logOut, user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:3000/users/${user.email}`)
        .then(res => setRole(res.data?.role))
        .catch(err => console.error(err));
    }
  }, [user]);

  // মেনু আইটেমগুলো রোল অনুযায়ী ডাইনামিক করা হলো
  const menuItems = role === 'admin' ? [
    { name: "Admin Home", path: "/dashboard/adminHome", icon: <LayoutDashboard size={20} /> },
    { name: "manageTransactions", path: "/dashboard/manageTransactions", icon: <LayoutDashboard size={20} /> },
    { name: "adminUsers", path: "/dashboard/adminUsers", icon: <LayoutDashboard size={20} /> },
    { name: "AddTip", path: "/dashboard/addTip", icon: <LayoutDashboard size={20} /> },
  
  ] : [
    { name: "My Dashboard", path: "/dashboard/userHome", icon: <LayoutDashboard size={20} /> },
    { name: "Add Transaction", path: "/dashboard/addTransaction", icon: <PlusCircle size={20} /> },
    { name: "History & Analytics", path: "/dashboard/history", icon: <History size={20} /> },
    { name: "Savings Goal", path: "/dashboard/SavingsGoal", icon: <Target size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 bg-[#0F172A] text-slate-300 flex-col shadow-2xl">
        <div className="p-8 border-b border-slate-800">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <span className="p-2 bg-indigo-600 rounded-lg text-white">FT</span>
            Fin<span className="text-indigo-400">Track</span>
          </h1>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Main Menu</p>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                  isActive 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                  : "hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
          
          <div className="border-t border-slate-800 my-8 pt-6 space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Settings</p>
            <NavLink to="/" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-xl transition-all">
              <Home size={20} /> Main Home
            </NavLink>
            <button 
              onClick={() => logOut().then(() => navigate("/"))} 
              className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all mt-2"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="lg:hidden">
             <h1 className="text-xl font-bold text-slate-900">FinTrack</h1>
          </div>

          <div className="flex items-center gap-6 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">{user?.displayName || "Guest User"}</p>
              <p className="text-xs font-medium text-slate-500 capitalize">{role || "Member"}</p>
            </div>
            <div className="avatar">
              <div className="w-11 h-11 rounded-xl ring ring-indigo-50 ring-offset-2 overflow-hidden shadow-sm">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="profile" />
                ) : (
                  <div className="bg-indigo-100 flex items-center justify-center h-full text-indigo-600">
                    <UserCircle size={28} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 lg:p-12 overflow-y-auto">
           <div className="max-w-6xl mx-auto">
              <Outlet />
           </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;