import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { UserCheck, UserPlus, Trash2 } from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:3000/users")
      .then(res => setUsers(res.data));
  };

  const handleToggleRole = (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    
    axios.patch(`http://localhost:3000/users/role/${id}`, { role: newRole })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: `User is now a ${newRole}`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
          fetchUsers(); // লিস্ট রিফ্রেশ করা
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
        <p className="text-slate-500">Manage platform users and their roles.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="rounded-l-xl">Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th className="rounded-r-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                <td className="font-medium">{user.displayName}</td>
                <td className="text-slate-600">{user.email}</td>
                <td>
                  <span className={`badge border-none py-3 px-4 ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'}`}>
                    {user.role || 'user'}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => handleToggleRole(user._id, user.role || 'user')}
                    className={`btn btn-sm gap-2 normal-case ${user.role === 'admin' ? 'btn-outline btn-error' : 'btn-primary'}`}
                  >
                    {user.role === 'admin' ? (
                      <><UserPlus size={16} /> Demote to User</>
                    ) : (
                      <><UserCheck size={16} /> Make Admin</>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;