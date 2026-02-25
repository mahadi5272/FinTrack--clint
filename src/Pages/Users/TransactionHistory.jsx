// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Trash2, Search, Edit2, X, ArrowUpDown, Filter, Calendar } from "lucide-react";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../AuthContext/AuthProvider";

// const TransactionHistory = () => {
//   const { user } = useContext(AuthContext);
//   const [transactions, setTransactions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingItem, setEditingItem] = useState(null);

//   // ফিল্টার ও সর্টিং স্টেট
//   const [typeFilter, setTypeFilter] = useState("all");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [sortOrder, setSortOrder] = useState({ key: 'date', order: 'desc' });

//   useEffect(() => {
//     if (user?.email) fetchTransactions();
//   }, [user]);

//   const fetchTransactions = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/transactions/${user?.email}`);
//       setTransactions(res.data);
//     } catch (err) {
//       console.error("Error fetching transactions:", err);
//     }
//   };

//   // ১. সর্টিং ফাংশন (Date & Amount)
//   const toggleSort = (key) => {
//     const isAsc = sortOrder.key === key && sortOrder.order === 'asc';
//     setSortOrder({ key, order: isAsc ? 'desc' : 'asc' });
//   };

//   // ২. ডিলিট হ্যান্ডলার
//   const handleDelete = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#4F46E5",
//       confirmButtonText: "Yes, delete it!"
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const res = await axios.delete(`http://localhost:3000/transactions/${id}`);
//         if (res.data.deletedCount > 0) {
//           Swal.fire("Deleted!", "Record removed.", "success");
//           fetchTransactions();
//         }
//       }
//     });
//   };

//   // ৩. আপডেট হ্যান্ডলার
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const updatedInfo = {
//       amount: form.amount.value,
//       type: form.type.value,
//       category: form.category.value,
//       date: form.date.value,
//       note: form.note.value
//     };

//     const res = await axios.patch(`http://localhost:3000/transactions/${editingItem._id}`, updatedInfo);
//     if (res.data.modifiedCount > 0) {
//       Swal.fire("Updated!", "Data saved.", "success");
//       setEditingItem(null);
//       fetchTransactions();
//     }
//   };

//   // ৪. ফিল্টার ও সর্টিং লজিক (Core Logic)
//   const filteredData = transactions
//     .filter(t => {
//       const matchesSearch = t.note?.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                            t.category?.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesType = typeFilter === "all" || t.type === typeFilter;
//       const matchesCategory = categoryFilter === "all" || t.category === categoryFilter;
      
//       // Date Filter
//       const tDate = new Date(t.date).getTime();
//       const start = startDate ? new Date(startDate).getTime() : null;
//       const end = endDate ? new Date(endDate).getTime() : null;
//       const matchesDate = (!start || tDate >= start) && (!end || tDate <= end);

//       return matchesSearch && matchesType && matchesCategory && matchesDate;
//     })
//     .sort((a, b) => {
//       if (sortOrder.key === 'amount') {
//         const valA = parseFloat(a.amount);
//         const valB = parseFloat(b.amount);
//         return sortOrder.order === 'asc' ? valA - valB : valB - valA;
//       }
//       const valA = new Date(a.date).getTime();
//       const valB = new Date(b.date).getTime();
//       return sortOrder.order === 'asc' ? valA - valB : valB - valA;
//     });

//   const uniqueCategories = [...new Set(transactions.map(t => t.category))];

//   return (
//     <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 min-h-[600px]">
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
//         <div>
//           <h2 className="text-3xl font-black text-slate-800 tracking-tight">Financial History</h2>
//           <p className="text-slate-500 font-medium">Search, filter and manage your money flow.</p>
//         </div>
//         <div className="relative w-full lg:w-72">
//           <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
//           <input 
//             type="text" 
//             placeholder="Search transactions..." 
//             className="input input-bordered w-full pl-12 rounded-2xl bg-slate-50 border-none focus:ring-2 ring-indigo-500"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* ৫. উন্নত ফিল্টার টুলবার */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 bg-slate-50 p-6 rounded-3xl border border-slate-100">
//         <div className="flex flex-col gap-1">
//           <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-1"><Calendar size={10}/> From Date</label>
//           <input type="date" className="input input-sm rounded-xl border-slate-200" onChange={(e) => setStartDate(e.target.value)} />
//         </div>
//         <div className="flex flex-col gap-1">
//           <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-1"><Calendar size={10}/> To Date</label>
//           <input type="date" className="input input-sm rounded-xl border-slate-200" onChange={(e) => setEndDate(e.target.value)} />
//         </div>
//         <div className="flex flex-col gap-1">
//           <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Type</label>
//           <select className="select select-sm rounded-xl border-slate-200" onChange={(e) => setTypeFilter(e.target.value)}>
//             <option value="all">All Types</option>
//             <option value="income">Income</option>
//             <option value="expense">Expense</option>
//           </select>
//         </div>
//         <div className="flex flex-col gap-1">
//           <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Category</label>
//           <select className="select select-sm rounded-xl border-slate-200" onChange={(e) => setCategoryFilter(e.target.value)}>
//             <option value="all">All Categories</option>
//             {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//           </select>
//         </div>
//         <div className="flex items-end gap-2">
//           <button onClick={() => toggleSort('amount')} className={`btn btn-sm flex-1 rounded-xl ${sortOrder.key === 'amount' ? 'btn-neutral' : 'btn-outline'}`}>
//             ৳ {sortOrder.key === 'amount' && (sortOrder.order === 'asc' ? '↑' : '↓')}
//           </button>
//           <button onClick={() => toggleSort('date')} className={`btn btn-sm flex-1 rounded-xl ${sortOrder.key === 'date' ? 'btn-neutral' : 'btn-outline'}`}>
//             Date {sortOrder.key === 'date' && (sortOrder.order === 'asc' ? '↑' : '↓')}
//           </button>
//         </div>
//       </div>

//       {/* টেবিল */}
//       <div className="overflow-x-auto">
//         <table className="table w-full">
//           <thead>
//             <tr className="text-slate-400 uppercase text-xs tracking-widest border-b border-slate-100">
//               <th className="pb-4">Date</th>
//               <th className="pb-4">Category</th>
//               <th className="pb-4">Note</th>
//               <th className="pb-4 text-right">Amount</th>
//               <th className="pb-4 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((t) => (
//               <tr key={t._id} className="hover:bg-slate-50 transition-all border-b border-slate-50">
//                 <td className="py-4 font-medium text-slate-600">{t.date}</td>
//                 <td className="py-4"><span className="badge badge-ghost rounded-lg font-bold text-slate-500 uppercase text-[10px] px-2">{t.category}</span></td>
//                 <td className="py-4 text-slate-400 italic text-sm truncate max-w-[150px]">{t.note || "N/A"}</td>
//                 <td className={`py-4 text-right font-black text-lg ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
//                   {t.type === 'income' ? '+' : '-'}৳{parseFloat(t.amount).toLocaleString()}
//                 </td>
//                 <td className="py-4 flex justify-center gap-1">
//                   <button onClick={() => setEditingItem(t)} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-xl transition-colors"><Edit2 size={18}/></button>
//                   <button onClick={() => handleDelete(t._id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 size={18}/></button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {filteredData.length === 0 && (
//           <div className="text-center py-20 text-slate-300 font-bold text-xl uppercase tracking-widest">No matching records</div>
//         )}
//       </div>

//       {/* এডিট মোডাল কোড (আগের মতই থাকবে) */}
//       {editingItem && (
//         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <div className="bg-white p-8 rounded-[40px] w-full max-w-md shadow-2xl relative">
//             <button onClick={() => setEditingItem(null)} className="absolute right-8 top-8 text-slate-400 hover:text-slate-600"><X size={24}/></button>
//             <h3 className="text-2xl font-black text-slate-800 mb-8 italic text-center">Update Record</h3>
//             <form onSubmit={handleUpdate} className="space-y-4">
//                <input type="number" name="amount" defaultValue={editingItem.amount} className="input input-bordered w-full rounded-2xl" required />
//                <select name="type" defaultValue={editingItem.type} className="select select-bordered w-full rounded-2xl">
//                  <option value="income">Income</option><option value="expense">Expense</option>
//                </select>
//                <input type="text" name="category" defaultValue={editingItem.category} className="input input-bordered w-full rounded-2xl" required />
//                <input type="date" name="date" defaultValue={editingItem.date} className="input input-bordered w-full rounded-2xl" required />
//                <textarea name="note" defaultValue={editingItem.note} className="textarea textarea-bordered w-full rounded-2xl h-24"></textarea>
//                <button type="submit" className="btn btn-primary w-full rounded-2xl h-14 text-lg">Save Changes</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransactionHistory;