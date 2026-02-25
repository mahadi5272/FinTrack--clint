import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Trash2, Edit3, PlusCircle, FolderTree } from "lucide-react";
import useAxiosSecure from "../../hooks/axiosSecure";


const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const axiosSecure = useAxiosSecure(); // JWT সহ সিকিউর রিকোয়েস্ট পাঠানোর জন্য

  // ১. সব ক্যাটাগরি লোড করা
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosSecure.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // ২. নতুন ক্যাটাগরি তৈরি (Requirement 7.2)
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      const res = await axiosSecure.post("/categories", { name: newCategory });
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Category added to the list.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
        setNewCategory("");
        fetchCategories();
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to add category. Admin access required.", "error");
    }
  };

  // ৩. ক্যাটাগরি ডিলিট করা
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Users won't be able to use this category anymore.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/categories/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Category has been removed.", "success");
            fetchCategories();
          }
        } catch (err) {
          Swal.fire("Failed!", "You don't have permission to delete.", "error");
        }
      }
    });
  };

  // ৪. ক্যাটাগরি এডিট/আপডেট করা
  const handleEdit = (cat) => {
    Swal.fire({
      title: 'Update Category Name',
      input: 'text',
      inputValue: cat.name,
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      confirmButtonText: 'Update Now',
      inputValidator: (value) => {
        if (!value) return 'Please enter a name!'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/categories/${cat._id}`, { name: result.value });
          if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", "Category name changed successfully.", "success");
            fetchCategories();
          }
        } catch (err) {
          Swal.fire("Error!", "Update failed.", "error");
        }
      }
    });
  };

  return (
    <div className="p-8 bg-white rounded-[32px] shadow-sm border border-slate-100 min-h-screen">
      {/* Header Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <FolderTree className="text-indigo-600" /> Category Management
        </h2>
        <p className="text-slate-500 mt-2 font-medium italic">Requirement 7.2: Admin Category Moderation</p>
      </div>

      {/* Add Category Form */}
      <div className="bg-slate-50 p-6 rounded-2xl mb-10 border border-slate-100">
        <form onSubmit={handleAddCategory} className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="e.g., Freelance, Shopping, Rent" 
            className="input input-bordered w-full md:max-w-md rounded-xl h-14"
            required
          />
          <button type="submit" className="btn btn-primary h-14 rounded-xl px-8 flex gap-2 font-bold uppercase tracking-tight">
            <PlusCircle size={20} /> Create Category
          </button>
        </form>
      </div>

      {/* Category List Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-slate-400 uppercase text-xs tracking-widest border-b border-slate-100">
              <th className="pb-4">No.</th>
              <th className="pb-4">Category Name</th>
              <th className="pb-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat._id} className="hover:bg-slate-50 transition-colors border-b border-slate-50">
                <td className="py-5 font-medium text-slate-400">{index + 1}</td>
                <td className="py-5 font-bold text-slate-700 text-lg">{cat.name}</td>
                <td className="py-5 flex justify-end gap-3">
                  <button onClick={() => handleEdit(cat)} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all active:scale-90">
                    <Edit3 size={20} />
                  </button>
                  <button onClick={() => handleDelete(cat._id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all active:scale-90">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {categories.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-medium">
            No categories available. Please add some!
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCategories;