import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Target, TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthContext/AuthProvider";

const SavingsGoal = () => {
  const { user } = useContext(AuthContext);
  const [goal, setGoal] = useState(null);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchGoalData();
    }
  }, [user]);

  const fetchGoalData = async () => {
    setLoading(true);
    try {
      // ইউজারের বর্তমান ব্যালেন্স এবং গোল ডাটা ফেচ করা
      const [statsRes, goalRes] = await Promise.all([
        axios.get(`http://localhost:3000/user-stats/${user?.email}`),
        axios.get(`http://localhost:3000/savings-goal/${user?.email}`)
      ]);
      setBalance(statsRes.data.balance);
      setGoal(goalRes.data);
    } catch (err) {
      console.error("Error fetching goal data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSetGoal = async (e) => {
    e.preventDefault();
    const goalData = {
      userEmail: user?.email,
      targetAmount: parseFloat(e.target.amount.value),
      title: e.target.title.value,
      createdAt: new Date().toISOString()
    };
    
    try {
      const res = await axios.post("http://localhost:3000/savings-goal", goalData);
      if (res.data.acknowledged || res.data.upsertedCount > 0 || res.data.modifiedCount > 0) {
        toast.success("Savings goal set successfully!");
        setGoal(goalData);
      }
    } catch (err) {
      toast.error("Failed to set goal");
    }
  };

  // রিকোয়ারমেন্ট অনুযায়ী ক্যালকুলেশন
  const progress = goal ? Math.min((balance / goal.targetAmount) * 100, 100).toFixed(1) : 0;
  const remaining = goal ? Math.max(goal.targetAmount - balance, 0) : 0;
  const isCompleted = progress >= 100;

  if (loading) return <div className="text-center py-20 font-bold text-slate-400">Loading Goal Tracker...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <Target className="text-indigo-600" size={32} /> Savings Goal Tracker
          </h2>
          <p className="text-slate-500 font-medium">Plan your future and track your progress toward milestones.</p>
        </div>
      </div>

      {!goal ? (
        /* গোল সেট করার ফর্ম (Empty State) */
        <div className="bg-white p-12 rounded-[40px] border-2 border-dashed border-slate-200 text-center space-y-6">
          <div className="bg-indigo-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto text-indigo-600">
            <TrendingUp size={40} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">No active goal found</h3>
            <p className="text-slate-500">You haven't set a savings goal yet. Start planning today!</p>
          </div>
          <form onSubmit={handleSetGoal} className="max-w-md mx-auto flex flex-col gap-4 mt-8">
            <input name="title" placeholder="What are you saving for? (e.g. New Laptop)" className="input input-bordered rounded-2xl h-14" required />
            <input name="amount" type="number" placeholder="Target Amount (৳)" className="input input-bordered rounded-2xl h-14" required />
            <button className="btn btn-primary rounded-2xl h-14 text-lg font-bold shadow-lg shadow-indigo-100">Set Savings Goal</button>
          </form>
        </div>
      ) : (
        /* গোল প্রগ্রেস কার্ড */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <span className="badge badge-primary rounded-lg font-bold mb-2 uppercase tracking-widest text-[10px]">Active Goal</span>
                  <h3 className="text-3xl font-black text-slate-800 uppercase italic">{goal.title}</h3>
                </div>
                {isCompleted && <CheckCircle2 size={48} className="text-emerald-500 animate-bounce" />}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <p className="text-4xl font-black text-slate-900">৳{balance.toLocaleString()} <span className="text-lg text-slate-400 font-medium">/ ৳{goal.targetAmount.toLocaleString()}</span></p>
                  <p className="text-2xl font-black text-indigo-600">{progress}%</p>
                </div>
                {/* প্রগ্রেস বার */}
                <div className="w-full bg-slate-100 rounded-full h-6 p-1">
                  <div 
                    className={`h-4 rounded-full transition-all duration-1000 ${isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-indigo-400'}`} 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Remaining Amount</p>
                  <p className="text-xl font-black text-slate-700">৳{remaining.toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Status</p>
                  <p className={`text-xl font-black ${isCompleted ? 'text-emerald-600' : 'text-amber-500'}`}>
                    {isCompleted ? 'Goal Achieved!' : 'In Progress'}
                  </p>
                </div>
              </div>

              <button onClick={() => setGoal(null)} className="btn btn-ghost btn-sm text-slate-400 hover:text-rose-500 rounded-xl">Reset & New Goal</button>
            </div>
            {/* Background Icon Decor */}
            <Target size={200} className="absolute -bottom-10 -right-10 text-slate-50/50 -rotate-12" />
          </div>

          {/* Monthly Insight Sidebar */}
          <div className="space-y-6">
            <div className="bg-indigo-900 p-8 rounded-[40px] text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-indigo-300" />
                <h4 className="font-bold text-xl">Timeline Insight</h4>
              </div>
              <p className="text-indigo-100 leading-relaxed mb-6">
                {isCompleted 
                  ? "Congratulations! You've successfully reached your financial milestone."
                  : `With your current balance, you are ৳${remaining.toLocaleString()} away from your target. Keep tracking your expenses!`}
              </p>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="text-3xl font-black">৳{Math.round(remaining / 12)}</div>
                <div className="text-xs font-bold uppercase text-indigo-300 leading-tight">Monthly save needed<br/>for 1 year goal</div>
              </div>
            </div>

            <div className="bg-rose-50 p-6 rounded-[32px] border border-rose-100 flex gap-4">
              <AlertCircle className="text-rose-500 shrink-0" />
              <p className="text-sm text-rose-700 font-medium">
                <strong>Tip:</strong> Categorizing your expenses in the History tab helps identify where you can save more for this goal!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsGoal;