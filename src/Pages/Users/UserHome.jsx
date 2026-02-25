import React, { useContext, useEffect, useState } from "react";
// আপনার দেওয়া সঠিক পাথ অনুযায়ী ইমপোর্ট করা হয়েছে
import useAxiosSecure from "../../hooks/axiosSecure"; 
import { Wallet, ArrowUpCircle, ArrowDownCircle, Lightbulb, TrendingUp, AlertCircle, PieChart as PieIcon } from "lucide-react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import ExpenseChart from "./ExpenseChart";

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); 
  const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0 });
  const [transactions, setTransactions] = useState([]);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    if (user?.email) {
      // ১. ট্রানজ্যাকশন ডাটা ফেচ করা (টোকেন সহ)
      axiosSecure.get(`/transactions/${user.email}`)
        .then(res => {
          const data = res.data;
          setTransactions(data);
          
          let inc = 0;
          let exp = 0;
          data.forEach(t => {
            const amount = parseFloat(t.amount || 0);
            if (t.type === 'income') inc += amount;
            else exp += amount;
          });
          
          setStats({ income: inc, expense: exp, balance: inc - exp });
        })
        .catch(err => console.error("Transaction fetch error:", err));

      // ২. ফিন্যান্সিয়াল টিপস ফেচ করা (এখন আর ৪0৪ আসবে না)
      axiosSecure.get("/financial-tips")
        .then(res => {
          setTips(res.data);
        })
        .catch(err => console.log("Tips error:", err));
    }
  }, [user?.email, axiosSecure]);

  // স্মার্ট ইনসাইট লজিক
  const getSmartInsight = () => {
    if (transactions.length < 5) {
      return { message: "Add more transactions for deep analytics!", type: "neutral", icon: <TrendingUp className="text-blue-500" /> };
    }
    if (stats.expense > stats.income) {
      return { message: "Your expenses exceed your income. Check the red zones!", type: "danger", icon: <AlertCircle className="text-rose-500" /> };
    }
    const savingsRatio = stats.income > 0 ? (stats.balance / stats.income) * 100 : 0;
    if (savingsRatio >= 20) {
      return { message: `Great! You've saved ${savingsRatio.toFixed(1)}% of your income.`, type: "success", icon: <TrendingUp className="text-emerald-500" /> };
    }
    return { message: "Stable spending. Try to minimize non-essential costs.", type: "info", icon: <Lightbulb className="text-indigo-500" /> };
  };

  const insight = getSmartInsight();

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Financial Overview</h2>
        <p className="text-slate-500 font-medium">Hello {user?.displayName}, here is your real-time spending behavior.</p>
      </div>

      {/* কার্ড সেকশন */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl"><Wallet size={32} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Balance</p>
            <h3 className="text-2xl font-black text-slate-800">৳{stats.balance.toLocaleString()}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><ArrowUpCircle size={32} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Income</p>
            <h3 className="text-2xl font-black text-emerald-600">৳{stats.income.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl"><ArrowDownCircle size={32} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Expenses</p>
            <h3 className="text-2xl font-black text-rose-600">৳{stats.expense.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* ইনসাইট মেসেজ */}
      <div className={`p-5 rounded-2xl border flex items-center gap-4 ${insight.type === 'danger' ? 'bg-rose-50 border-rose-100' : insight.type === 'success' ? 'bg-emerald-50 border-emerald-100' : 'bg-blue-50 border-blue-100'}`}>
        <div className="bg-white p-2 rounded-lg shadow-sm">{insight.icon}</div>
        <p className="font-bold text-slate-700 text-sm">Insight: <span className="font-medium italic">{insight.message}</span></p>
      </div>

      {/* চার্ট এবং টিপস সেকশন */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <ExpenseChart transactions={transactions} />
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden">
            <h4 className="text-indigo-400 font-bold mb-2 uppercase text-xs tracking-widest">Daily Suggestion</h4>
            <p className="text-slate-300 italic leading-relaxed text-sm">
              "{tips.length > 0 
                ? tips[Math.floor(Math.random() * tips.length)].description 
                : "Start tracking every penny to build a secure financial future!"}"
            </p>
          </div>
          
          <div className="bg-indigo-600 p-6 rounded-[32px] text-white flex justify-between items-center">
            <div>
                <p className="text-xs font-bold text-indigo-200 uppercase">Records</p>
                <p className="text-3xl font-black">{transactions.length}</p>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl"><PieIcon size={24}/></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;