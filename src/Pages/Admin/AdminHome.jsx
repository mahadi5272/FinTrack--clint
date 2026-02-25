import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/axiosSecure"; // axios এর বদলে useAxiosSecure ব্যবহার করুন
import { Users, Repeat, Banknote, PieChart as ChartIcon, ShieldCheck } from "lucide-react";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure(); // টোকেন ইন্টারসেপ্টর সক্রিয় করা হলো
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    totalRevenue: 0, // আপনার আগের কোডে এই ভ্যালুটি কল করা ছিল
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // এখন রিকোয়েস্টের সাথে অটোমেটিক Authorization টোকেন যাবে
    setLoading(true);
    axiosSecure
      .get("/admin-stats")
      .then((res) => {
        setAdminStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Admin stats fetch error:", err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-500 font-bold italic">Loading system statistics...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <ShieldCheck className="text-indigo-600" size={32} /> System Overview
          </h2>
          <p className="text-slate-500 font-medium">
            Monitoring platform-wide financial activity in real-time.
          </p>
        </div>
      </div>

      {/* Admin Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-md transition-shadow">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
            <Users size={32} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Total Users
            </p>
            <h3 className="text-3xl font-black text-slate-800">
              {adminStats.totalUsers}
            </h3>
          </div>
        </div>

        {/* Total Transactions Card */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-md transition-shadow">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
            <Repeat size={32} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Transactions
            </p>
            <h3 className="text-3xl font-black text-slate-800">
              {adminStats.totalTransactions}
            </h3>
          </div>
        </div>

        {/* Total System Volume Card */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-md transition-shadow">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
            <Banknote size={32} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              System Volume
            </p>
            <h3 className="text-3xl font-black text-slate-800">
              ৳{(adminStats.totalRevenue || 0).toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      {/* Admin Insight Section */}
      <div className="bg-slate-900 p-8 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-5 relative z-10">
          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
            <ChartIcon className="text-indigo-400" size={28} />
          </div>
          <div>
            <h4 className="font-bold text-xl tracking-tight">System Performance Monitor</h4>
            <p className="text-slate-400 text-sm">
              All financial endpoints are secured and logs are synced.
            </p>
          </div>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-14 rounded-2xl font-bold transition-all relative z-10 shadow-lg shadow-indigo-500/20 active:scale-95">
          Generate System Audit
        </button>
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </div>
    </div>
  );
};

export default AdminHome;