import React from "react";
import useAxiosSecure from "../../hooks/axiosSecure"; // axios এর বদলে এটি ব্যবহার করুন
import { Lightbulb, Send, Info } from "lucide-react";
import Swal from "sweetalert2";

const AddTip = () => {
  const axiosSecure = useAxiosSecure();

  const handleAddTip = async (e) => {
    e.preventDefault();
    const tip = {
      description: e.target.description.value,
      date: new Date().toISOString(), // Standard ISO format ব্যবহার করা ভালো
    };

    try {
      // axiosSecure স্বয়ংক্রিয়ভাবে হেডারে টোকেন যোগ করবে
      const res = await axiosSecure.post("/financial-tips", tip);
      
      if (res.data.insertedId) {
        Swal.fire({
          title: "Published!",
          text: "Financial tip has been added successfully!",
          icon: "success",
          confirmButtonColor: "#4F46E5",
        });
        e.target.reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
          <Lightbulb className="text-amber-500 fill-amber-500/10" size={32} /> 
          Financial Wisdom
        </h2>
        <p className="text-slate-500 font-medium">Create and publish tips to help users manage their money better.</p>
      </div>

      {/* Form Card */}
      <div className="bg-white p-8 lg:p-10 rounded-[40px] shadow-sm border border-slate-100 relative overflow-hidden">
        <form onSubmit={handleAddTip} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2">Tip Content</label>
            <textarea
              name="description"
              placeholder="e.g. Save 20% of your salary as soon as you receive it..."
              className="textarea textarea-bordered w-full h-40 rounded-3xl p-6 border-slate-200 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-700 leading-relaxed"
              required
            ></textarea>
          </div>
          
          <button className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-indigo-100 flex items-center gap-2 transition-all active:scale-95">
            <Send size={20} /> Publish Tip to Dashboard
          </button>
        </form>

        {/* Decorative background icon */}
        <Lightbulb size={120} className="absolute -bottom-10 -right-10 text-slate-50 opacity-[0.03] -rotate-12 pointer-events-none" />
      </div>

      {/* Admin Information */}
      <div className="bg-amber-50 p-6 rounded-[32px] border border-amber-100 flex gap-4">
        <Info className="text-amber-600 shrink-0" size={24} />
        <p className="text-sm text-amber-800 font-medium leading-relaxed">
          <strong>Note:</strong> Once published, this tip will be visible to all users on their main dashboard. Keep it concise and actionable!
        </p>
      </div>
    </div>
  );
};

export default AddTip;