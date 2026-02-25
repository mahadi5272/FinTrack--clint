import React, { useContext, useEffect, useState } from "react";
import { Trash2, Search, Edit2, X, Calendar, Filter } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthContext/AuthProvider";
import useAxiosSecure from "../../hooks/axiosSecure";

const TransactionHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); // টোকেন সহ রিকোয়েস্ট পাঠানোর জন্য
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  // ফিল্টার ও সর্টিং স্টেট
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState({ key: 'date', order: 'desc' });

  // আপনার সার্ভারের GET /transactions/:email এন্ডপয়েন্ট ব্যবহার করা হয়েছে
  useEffect(() => {
    if (user?.email) {
      fetchTransactions();
    }
  }, [user, axiosSecure]);

  const fetchTransactions = async () => {
    try {
      const res = await axiosSecure.get(`/transactions/${user?.email}`);
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  const toggleSort = (key) => {
    const isAsc = sortOrder.key === key && sortOrder.order === 'asc';
    setSortOrder({ key, order: isAsc ? 'desc' : 'asc' });
  };

  // ডিলিট হ্যান্ডলার (সার্ভারের DELETE /transactions/:id ব্যবহার করে)
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently remove the record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/transactions/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Record removed.", "success");
            fetchTransactions();
          }
        } catch (err) {
          Swal.fire("Error!", "Failed to delete. Admin/Owner access only.", "error");
        }
      }
    });
  };

  // আপডেট হ্যান্ডলার (সার্ভারের PATCH রিকোয়েস্টের জন্য)
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedInfo = {
      amount: parseFloat(form.amount.value),
      type: form.type.value,
      category: form.category.value,
      date: form.date.value,
      note: form.note.value
    };

    try {
      // দ্রষ্টব্য: আপনার সার্ভার কোডে PATCH রুটটি ট্রানজ্যাকশনের জন্য এখনো তৈরি নেই, 
      // তবে এটি কাজ করার জন্য আপনাকে সার্ভারে app.patch("/transactions/:id") যোগ করতে হবে।
      const res = await axiosSecure.patch(`/transactions/${editingItem._id}`, updatedInfo);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Data saved successfully.", "success");
        setEditingItem(null);
        fetchTransactions();
      }
    } catch (err) {
      Swal.fire("Update Failed!", "Check server route or permissions.", "error");
    }
  };

  // ক্লায়েন্ট সাইড ফিল্টারিং ও সর্টিং লজিক
  const filteredData = transactions
    .filter(t => {
      const matchesSearch = t.note?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           t.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || t.type === typeFilter;
      const matchesCategory = categoryFilter === "all" || t.category === categoryFilter;
      
      const tDate = new Date(t.date).getTime();
      const start = startDate ? new Date(startDate).getTime() : null;
      const end = endDate ? new Date(endDate).getTime() : null;
      const matchesDate = (!start || tDate >= start) && (!end || tDate <= end);

      return matchesSearch && matchesType && matchesCategory && matchesDate;
    })
    .sort((a, b) => {
      if (sortOrder.key === 'amount') {
        const valA = parseFloat(a.amount);
        const valB = parseFloat(b.amount);
        return sortOrder.order === 'asc' ? valA - valB : valB - valA;
      }
      const valA = new Date(a.date).getTime();
      const valB = new Date(b.date).getTime();
      return sortOrder.order === 'asc' ? valA - valB : valB - valA;
    });

  const uniqueCategories = [...new Set(transactions.map(t => t.category))];

  return (
    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 min-h-[600px]">
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            Financial History 
          </h2>
          <p className="text-slate-500 font-medium">Viewing records for: {user?.email}</p>
        </div>
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search note or category..." 
            className="input input-bordered w-full pl-12 rounded-2xl bg-slate-50 border-none focus:ring-2 ring-indigo-500 h-12"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 bg-slate-50 p-6 rounded-3xl border border-slate-100">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">From Date</label>
          <input type="date" className="input input-sm rounded-xl" onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">To Date</label>
          <input type="date" className="input input-sm rounded-xl" onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Type</label>
          <select className="select select-sm rounded-xl" onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Category</label>
          <select className="select select-sm rounded-xl" onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="flex items-end gap-2">
          <button onClick={() => toggleSort('amount')} className={`btn btn-sm flex-1 rounded-xl ${sortOrder.key === 'amount' ? 'btn-neutral' : 'btn-outline'}`}>
            ৳ {sortOrder.key === 'amount' && (sortOrder.order === 'asc' ? '↑' : '↓')}
          </button>
          <button onClick={() => toggleSort('date')} className={`btn btn-sm flex-1 rounded-xl ${sortOrder.key === 'date' ? 'btn-neutral' : 'btn-outline'}`}>
            Date {sortOrder.key === 'date' && (sortOrder.order === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-slate-400 uppercase text-xs tracking-widest border-b border-slate-100">
              <th className="pb-4">Date</th>
              <th className="pb-4">Category</th>
              <th className="pb-4">Note</th>
              <th className="pb-4 text-right">Amount</th>
              <th className="pb-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((t) => (
              <tr key={t._id} className="hover:bg-slate-50 transition-all border-b border-slate-50">
                <td className="py-4 font-medium text-slate-600">{t.date}</td>
                <td className="py-4">
                  <span className="badge badge-ghost rounded-lg font-bold text-slate-500 uppercase text-[10px] px-2">
                    {t.category}
                  </span>
                </td>
                <td className="py-4 text-slate-400 italic text-sm truncate max-w-[150px]">{t.note || "No note"}</td>
                <td className={`py-4 text-right font-black text-lg ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.type === 'income' ? '+' : '-'}৳{parseFloat(t.amount).toLocaleString()}
                </td>
                <td className="py-4 flex justify-center gap-1">
                  <button onClick={() => setEditingItem(t)} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-xl transition-colors"><Edit2 size={18}/></button>
                  <button onClick={() => handleDelete(t._id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="text-center py-20 text-slate-300 font-bold text-xl uppercase tracking-widest">No matching records</div>
        )}
      </div>

      {/* Update Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-[40px] w-full max-w-md shadow-2xl relative border border-white/20">
            <button onClick={() => setEditingItem(null)} className="absolute right-8 top-8 text-slate-400 hover:text-slate-600"><X size={24}/></button>
            <h3 className="text-2xl font-black text-slate-800 mb-8 italic text-center uppercase tracking-tight">Update Record</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
               <div className="form-control">
                  <label className="label text-xs font-bold text-slate-400 uppercase ml-1">Amount (৳)</label>
                  <input type="number" name="amount" defaultValue={editingItem.amount} className="input input-bordered w-full rounded-2xl h-14" required />
               </div>
               <div className="form-control">
                  <label className="label text-xs font-bold text-slate-400 uppercase ml-1">Type</label>
                  <select name="type" defaultValue={editingItem.type} className="select select-bordered w-full rounded-2xl h-14">
                    <option value="income">Income (+)</option>
                    <option value="expense">Expense (-)</option>
                  </select>
               </div>
               <div className="form-control">
                  <label className="label text-xs font-bold text-slate-400 uppercase ml-1">Category</label>
                  <input type="text" name="category" defaultValue={editingItem.category} className="input input-bordered w-full rounded-2xl h-14" required />
               </div>
               <div className="form-control">
                  <label className="label text-xs font-bold text-slate-400 uppercase ml-1">Date</label>
                  <input type="date" name="date" defaultValue={editingItem.date} className="input input-bordered w-full rounded-2xl h-14" required />
               </div>
               <div className="form-control">
                  <label className="label text-xs font-bold text-slate-400 uppercase ml-1">Note</label>
                  <textarea name="note" defaultValue={editingItem.note} className="textarea textarea-bordered w-full rounded-2xl h-24 p-4"></textarea>
               </div>
               <button type="submit" className="btn btn-neutral w-full rounded-2xl h-14 text-lg font-bold">Update Transaction</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;