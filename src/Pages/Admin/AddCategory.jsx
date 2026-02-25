import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/axiosSecure"; // axiosSecure ইম্পোর্ট করা হয়েছে
import { Tag, Plus, ListTree } from "lucide-react";

const AddCategory = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure(); // টোকেনসহ রিকোয়েস্ট পাঠানোর জন্য

  const onSubmit = async (data) => {
    try {
      // axiosSecure ব্যবহার করে সার্ভারে ডাটা পাঠানো হচ্ছে
      const res = await axiosSecure.post("/categories", data);
      
      if (res.data.insertedId) {
        toast.success("Category Added Successfully!");
        reset();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add category");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
          <ListTree className="text-indigo-600" size={32} /> Category Management
        </h2>
        <p className="text-slate-500 font-medium">Create system-wide categories for transactions.</p>
      </div>

      <div className="bg-white p-8 lg:p-12 rounded-[40px] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Tag size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Add New Category</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category Name */}
          <div className="md:col-span-1">
            <label className="label text-xs font-bold text-slate-400 uppercase ml-2">Category Name</label>
            <input 
              {...register("name")} 
              placeholder="e.g. Salary, Rent, Food" 
              className="input input-bordered w-full rounded-2xl h-14 border-slate-200 focus:ring-2 focus:ring-indigo-500/20" 
              required 
            />
          </div>

          {/* Category Type */}
          <div className="md:col-span-1">
            <label className="label text-xs font-bold text-slate-400 uppercase ml-2">Transaction Type</label>
            <select 
              {...register("type")} 
              className="select select-bordered w-full rounded-2xl h-14 border-slate-200 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex items-end">
            <button className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none w-full rounded-2xl h-14 text-lg font-bold shadow-lg shadow-indigo-100 transition-all flex items-center gap-2">
              <Plus size={20} /> Add Category
            </button>
          </div>
        </form>
      </div>

      {/* Admin Information */}
      <div className="bg-blue-50 p-6 rounded-[32px] border border-blue-100 flex gap-4">
        <div className="p-2 bg-white rounded-xl text-blue-500 h-fit shadow-sm italic font-bold text-xs uppercase">Note</div>
        <p className="text-sm text-blue-700 font-medium leading-relaxed">
          Categories added here will be available to all users. Make sure to choose clear names and correct types (Income/Expense).
        </p>
      </div>
    </div>
  );
};

export default AddCategory;