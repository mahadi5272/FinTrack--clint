// import React, { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AuthContext } from "../../AuthContext/AuthProvider";

// const AddTransaction = () => {
//   const { user } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
  
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   useEffect(() => {
//     axios.get("http://localhost:3000/categories")
//       .then(res => setCategories(res.data))
//       .catch(err => console.error("Error fetching categories:", err));
//   }, []);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     const transactionData = {
//       amount: parseFloat(data.amount),
//       type: data.type,
//       category: data.category,
//       date: data.date,
//       note: data.note,
//       userEmail: user?.email,
//       createdAt: new Date(),
//     };

//     try {
//       const res = await axios.post("http://localhost:3000/transactions", transactionData);
//       if (res.data.insertedId) {
//         toast.success("Transaction recorded!");
//         reset();
//       }
//     } catch (error) {
//       toast.error("Failed to save.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-8 shadow-sm rounded-[32px] bg-white border border-slate-100">
//       <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">New Transaction</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//         <div className="form-control">
//           <label className="label font-bold text-slate-600">Amount (৳)</label>
//           <input type="number" step="any" {...register("amount", { required: "Required" })} className="input input-bordered rounded-2xl" placeholder="500" />
//         </div>
//         <div className="form-control">
//           <label className="label font-bold text-slate-600">Type</label>
//           <select {...register("type", { required: true })} className="select select-bordered rounded-2xl">
//             <option value="expense">Expense</option>
//             <option value="income">Income</option>
//           </select>
//         </div>
//         <div className="form-control">
//           <label className="label font-bold text-slate-600">Category</label>
//           <select {...register("category", { required: "Required" })} className="select select-bordered rounded-2xl">
//             <option value="">Select Category</option>
//             {categories.map((cat) => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
//           </select>
//         </div>
//         <div className="form-control">
//           <label className="label font-bold text-slate-600">Date</label>
//           <input type="date" {...register("date", { required: "Required" })} className="input input-bordered rounded-2xl" />
//         </div>
//         <div className="form-control">
//           <label className="label font-bold text-slate-600">Note (Optional)</label>
//           <textarea {...register("note")} className="textarea textarea-bordered rounded-2xl h-24" placeholder="Description..."></textarea>
//         </div>
//         <button type="submit" className="btn btn-neutral w-full rounded-2xl" disabled={loading}>
//           {loading ? <span className="loading loading-spinner"></span> : "Save Transaction"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddTransaction;