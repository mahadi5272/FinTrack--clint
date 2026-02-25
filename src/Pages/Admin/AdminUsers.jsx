import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/axiosSecure"; // axiosSecure ইম্পোর্ট করা হয়েছে
import Swal from "sweetalert2";
import { UserCheck, UserPlus, ShieldCheck, Users } from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure(); // টোকেন সহ রিকোয়েস্ট পাঠানোর জন্য

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // সার্ভারে আপনার এই রুটটি থাকতে হবে (app.get("/users-all"))
      const res = await axiosSecure.get("/users-all");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRole = (user, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make ${user.displayName} a ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // PATCH রিকোয়েস্টে এখন অটোমেটিক টোকেন যাবে
        axiosSecure.patch(`/users/role/${user._id}`, { role: newRole })
          .then(res => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Success!",
                text: `${user.displayName} is now a ${newRole}`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false
              });
              fetchUsers(); // লিস্ট রিফ্রেশ করা
            }
          })
          .catch(err => {
            Swal.fire("Error!", err.response?.data?.message || "Something went wrong", "error");
          });
      }
    });
  };

  if (loading) return <div className="text-center py-20 font-bold text-slate-400 italic">Synchronizing User Directory...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <Users className="text-indigo-600" size={32} /> User Management
          </h2>
          <p className="text-slate-500 font-medium">Control platform access levels and administrative privileges.</p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 text-slate-500 font-bold uppercase text-[10px] tracking-widest">User Details</th>
                <th className="p-6 text-slate-500 font-bold uppercase text-[10px] tracking-widest text-center">Current Role</th>
                <th className="p-6 text-slate-500 font-bold uppercase text-[10px] tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map(user => (
                <tr key={user._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black">
                        {user.displayName?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{user.displayName}</p>
                        <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight ${
                      user.role === 'admin' 
                      ? 'bg-rose-100 text-rose-600' 
                      : 'bg-indigo-100 text-indigo-600'
                    }`}>
                      {user.role === 'admin' ? <ShieldCheck size={12} /> : null}
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button 
                      onClick={() => handleToggleRole(user, user.role || 'user')}
                      className={`btn btn-sm rounded-xl h-10 px-5 normal-case font-bold border-none transition-all shadow-sm ${
                        user.role === 'admin' 
                        ? 'bg-slate-800 text-white hover:bg-slate-900' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
                      }`}
                    >
                      {user.role === 'admin' ? (
                        <><UserPlus size={16} className="mr-2" /> Revoke Admin</>
                      ) : (
                        <><UserCheck size={16} className="mr-2" /> Promote to Admin</>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;