import { LayoutDashboard, PlusCircle, History, Target, Home, LogOut, Menu, UserCircle, ShieldCheck, Users, MessageSquarePlus } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { AuthContext } from "../AuthContext/AuthProvider";
import useAxiosSecure from "../hooks/axiosSecure";

const DashboardLayout = () => {
  const { logOut, user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); 
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // লোডিং স্টেট
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          setLoading(true);
          // axiosSecure ব্যবহার করে টোকেনসহ রিকোয়েস্ট পাঠানো হচ্ছে
          const res = await axiosSecure.get(`/users/${user.email}`);
          setRole(res.data?.role);
        } catch (err) {
          console.error("Role fetching error:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserRole();
  }, [user?.email, axiosSecure]);

  // মেনু আইটেমগুলো রোল অনুযায়ী ডাইনামিক
  const menuItems = role === 'admin' ? [
    { name: "Admin Home", path: "/dashboard/adminHome", icon: <ShieldCheck size={20} /> },
    { name: "Manage Transactions", path: "/dashboard/manageTransactions", icon: <History size={20} /> },
    { name: "Manage Users", path: "/dashboard/adminUsers", icon: <Users size={20} /> },
    { name: "Add Financial Tip", path: "/dashboard/addTip", icon: <MessageSquarePlus size={20} /> },
  ] : [
    { name: "My Dashboard", path: "/dashboard/userHome", icon: <LayoutDashboard size={20} /> },
    { name: "Add Transaction", path: "/dashboard/addTransaction", icon: <PlusCircle size={20} /> },
    { name: "History & Analytics", path: "/dashboard/history", icon: <History size={20} /> },
    { name: "Savings Goal", path: "/dashboard/SavingsGoal", icon: <Target size={20} /> },
  ];

  // রোল লোড না হওয়া পর্যন্ত একটি সুন্দর লোডার দেখানো হচ্ছে
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-bold animate-pulse">Syncing your profile...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 bg-[#0F172A] text-slate-300 flex-col shadow-2xl">
        <div className="p-8 border-b border-slate-800">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <span className="p-2 bg-indigo-600 rounded-lg text-white text-base">FT</span>
            Fin<span className="text-indigo-400">Track</span>
          </h1>
          {role === 'admin' && (
            <span className="mt-2 inline-block px-2 py-1 bg-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-tighter rounded">Admin Panel</span>
          )}
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            {role === 'admin' ? 'Administration' : 'Main Menu'}
          </p>
          
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
              className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all mt-2 font-bold"
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
              <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-tight">
                {role === 'admin' ? '🛡️ Administrator' : '👤 Member'}
              </p>
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