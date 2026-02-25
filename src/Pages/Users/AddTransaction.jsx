import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify"; // ToastContainer ইম্পোর্ট করা হয়েছে
import "react-toastify/dist/ReactToastify.css"; // CSS ইম্পোর্ট করা হয়েছে
import { AuthContext } from "../../AuthContext/AuthProvider";
import useAxiosSecure from "../../hooks/axiosSecure";

const AddTransaction = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const axiosSecure = useAxiosSecure(); 
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // ১. সার্ভার থেকে ক্যাটাগরি লোড করা
  useEffect(() => {
    axiosSecure.get("/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories:", err));
  }, [axiosSecure]);

  const onSubmit = async (data) => {
    if (!user?.email) {
      return toast.error("User not found. Please login again.");
    }

    setLoading(true);
    const transactionData = {
      amount: parseFloat(data.amount),
      type: data.type,
      category: data.category,
      date: data.date,
      note: data.note || "",
      userEmail: user?.email.toLowerCase(),
      createdAt: new Date(),
    };

    try {
      // ২. সার্ভারে ডাটা পাঠানো
      const res = await axiosSecure.post("/transactions", transactionData);
      
      if (res.data.insertedId) {
        // ৩. সাকসেস টোস্ট শো করা
        toast.success("Transaction recorded successfully! 🎉", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
        reset(); // ফর্ম খালি করা
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      toast.error(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 shadow-2xl rounded-[40px] bg-white border border-slate-100">
      <h2 className="text-3xl font-black mb-6 text-slate-800 text-center italic tracking-tight">
        Add Transaction
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Amount */}
        <div className="form-control">
          <label className="label font-bold text-slate-600 ml-2">Amount (৳)</label>
          <input 
            type="number" 
            step="any" 
            {...register("amount", { required: "Amount is required", min: {value: 1, message: "Amount must be positive"} })} 
            className={`input input-bordered rounded-2xl h-14 text-lg ${errors.amount ? 'border-red-500' : ''}`} 
            placeholder="Enter amount" 
          />
          {errors.amount && <span className="text-red-500 text-xs mt-1 ml-2 font-medium">{errors.amount.message}</span>}
        </div>

        {/* Type */}
        <div className="form-control">
          <label className="label font-bold text-slate-600 ml-2">Type</label>
          <select {...register("type", { required: true })} className="select select-bordered rounded-2xl h-14 font-bold text-slate-700">
            <option value="expense">Expense (-)</option>
            <option value="income">Income (+)</option>
          </select>
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label font-bold text-slate-600 ml-2">Category</label>
          <select {...register("category", { required: "Required" })} className="select select-bordered rounded-2xl h-14">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <span className="text-red-500 text-xs mt-1 ml-2">Please select a category</span>}
        </div>

        {/* Date */}
        <div className="form-control">
          <label className="label font-bold text-slate-600 ml-2">Date</label>
          <input type="date" {...register("date", { required: "Required" })} className="input input-bordered rounded-2xl h-14" />
        </div>

        {/* Note */}
        <div className="form-control">
          <label className="label font-bold text-slate-600 ml-2">Note (Optional)</label>
          <textarea {...register("note")} className="textarea textarea-bordered rounded-2xl h-24 p-4" placeholder="Brief description..."></textarea>
        </div>

        <button 
          type="submit" 
          className="btn btn-neutral w-full rounded-2xl h-14 font-black text-lg shadow-xl shadow-slate-200 hover:scale-[1.02] active:scale-95 transition-all" 
          disabled={loading}
        >
          {loading ? <span className="loading loading-spinner"></span> : "Save Records"}
        </button>
      </form>

      {/* ৪. টোস্ট কন্টেইনার এখানে বসানো হয়েছে */}
      <ToastContainer />
    </div>
  );
};

export default AddTransaction;