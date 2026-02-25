import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Repeat, Banknote, PieChart as ChartIcon } from "lucide-react";

const AdminHome = () => {
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    systemBalance: 0,
  });

  useEffect(() => {
    // এই এপিআই-টি আপনার সার্ভারে আগের ধাপে দেওয়া লজিক অনুযায়ী কল হবে
    axios
      .get("http://localhost:3000/admin-stats")
      .then((res) => setAdminStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
          System Overview
        </h2>
        <p className="text-slate-500 font-medium">
          Monitoring platform-wide financial activity.
        </p>
      </div>

      {/* Admin Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
            <Users size={32} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Total Users
            </p>
            <h3 className="text-3xl font-black text-slate-800">
              {adminStats.totalUsers}
            </h3>
          </div>
        </div>

        {/* Total Transactions Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
            <Repeat size={32} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Transactions
            </p>
            <h3 className="text-3xl font-black text-slate-800">
              {adminStats.totalTransactions}
            </h3>
          </div>
        </div>

        {/* Total System Volume Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
            <Banknote size={32} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Total Volume
            </p>
            <h3 className="text-3xl font-black text-slate-800">
              ৳{adminStats.totalRevenue?.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      {/* Admin Logic Info Section */}
      <div className="bg-slate-900 p-8 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <ChartIcon className="text-indigo-400" />
          </div>
          <div>
            <h4 className="font-bold text-xl">Global Financial Health</h4>
            <p className="text-slate-400">
              All data is synced from the central database.
            </p>
          </div>
        </div>
        <button className="btn btn-primary rounded-xl px-8">
          Download Detailed Report
        </button>
      </div>
    </div>
  );
};

export default AdminHome;
