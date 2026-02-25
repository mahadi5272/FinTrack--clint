import React from "react";
import axios from "axios";
import { Lightbulb } from "lucide-react";
import Swal from "sweetalert2";

const AddTip = () => {
  const handleAddTip = async (e) => {
    e.preventDefault();
    const tip = {
      description: e.target.description.value,
      date: new Date()
    };

    const res = await axios.post("http://localhost:3000/financial-tips", tip); // আপনার দেওয়া এপিআই
    if (res.data.insertedId) {
      Swal.fire("Success!", "Tip added successfully!", "success");
      e.target.reset();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <Lightbulb className="text-amber-500" /> Add Financial Tip
      </h2>
      <form onSubmit={handleAddTip} className="space-y-4">
        <textarea
          name="description"
          placeholder="Enter a useful financial tip..."
          className="textarea textarea-bordered w-full h-32"
          required
        ></textarea>
        <button className="btn btn-primary w-full">Publish Tip</button>
      </form>
    </div>
  );
};

export default AddTip;