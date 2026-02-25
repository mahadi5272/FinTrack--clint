// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { Trash2, Edit3, PlusCircle, FolderTree } from "lucide-react";

// const ManageCategories = () => {
//   const [categories, setCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState("");

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = () => {
//     axios.get("http://localhost:3000/categories")
//       .then(res => setCategories(res.data))
//       .catch(err => console.log(err));
//   };

//   // ক্যাটাগরি তৈরি করার ফাংশন
//   const handleAddCategory = (e) => {
//     e.preventDefault();
//     if (!newCategory.trim()) return;

//     axios.post("http://localhost:3000/categories", { name: newCategory })
//       .then(res => {
//         if (res.data.insertedId) {
//           Swal.fire({
//             title: "Success!",
//             text: "New category created.",
//             icon: "success",
//             timer: 1500,
//             showConfirmButton: false
//           });
//           setNewCategory("");
//           fetchCategories();
//         }
//       });
//   };

//   // ক্যাটাগরি ডিলিট করার ফাংশন
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This category will be removed from future selection.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       confirmButtonText: "Yes, delete it!"
//     }).then(result => {
//       if (result.isConfirmed) {
//         axios.delete(`http://localhost:3000/categories/${id}`)
//           .then(res => {
//             if (res.data.deletedCount > 0) {
//               Swal.fire("Deleted!", "Category has been removed.", "success");
//               fetchCategories();
//             }
//           });
//       }
//     });
//   };

//   // ক্যাটাগরি এডিট করার ফাংশন (SweetAlert Input ব্যবহার করে)
//   const handleEdit = (cat) => {
//     Swal.fire({
//       title: 'Edit Category Name',
//       input: 'text',
//       inputValue: cat.name,
//       showCancelButton: true,
//       confirmButtonColor: "#4F46E5",
//       confirmButtonText: 'Update',
//       inputValidator: (value) => {
//         if (!value) return 'You need to write something!'
//       }
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios.patch(`http://localhost:3000/categories/${cat._id}`, { name: result.value })
//           .then(res => {
//             if (res.data.modifiedCount > 0) {
//               Swal.fire("Updated!", "Category name has been changed.", "success");
//               fetchCategories();
//             }
//           });
//       }
//     });
//   };

//   return (
//     <div className="p-8 bg-white rounded-[32px] shadow-sm border border-slate-100 min-h-screen">
//       <div className="mb-10">
//         <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
//           <FolderTree className="text-indigo-600" /> Category Management
//         </h2>
//         <p className="text-slate-500 mt-2 font-medium">Create and manage financial categories for users.</p>
//       </div>

//       {/* Add Category Form */}
//       <div className="bg-slate-50 p-6 rounded-2xl mb-10">
//         <form onSubmit={handleAddCategory} className="flex flex-col md:flex-row gap-4">
//           <input 
//             type="text" 
//             value={newCategory}
//             onChange={(e) => setNewCategory(e.target.value)}
//             placeholder="Enter category name (e.g., Entertainment)" 
//             className="input input-bordered w-full md:max-w-md rounded-xl focus:outline-indigo-500"
//             required
//           />
//           <button type="submit" className="btn btn-primary rounded-xl px-8 flex gap-2">
//             <PlusCircle size={20} /> Add Category
//           </button>
//         </form>
//       </div>

//       {/* Category List Table */}
//       <div className="overflow-x-auto">
//         <table className="table w-full">
//           <thead>
//             <tr className="text-slate-400 uppercase text-xs tracking-widest border-b border-slate-100">
//               <th className="pb-4">Category Name</th>
//               <th className="pb-4 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map(cat => (
//               <tr key={cat._id} className="hover:bg-slate-50 transition-colors border-b border-slate-50">
//                 <td className="py-5 font-bold text-slate-700 text-lg">{cat.name}</td>
//                 <td className="py-5 flex justify-end gap-3">
//                   <button 
//                     onClick={() => handleEdit(cat)} 
//                     className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
//                     title="Edit Category"
//                   >
//                     <Edit3 size={20} />
//                   </button>
//                   <button 
//                     onClick={() => handleDelete(cat._id)} 
//                     className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
//                     title="Delete Category"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {categories.length === 0 && (
//           <div className="text-center py-20 text-slate-400">
//             No categories found. Start by adding one above!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageCategories;