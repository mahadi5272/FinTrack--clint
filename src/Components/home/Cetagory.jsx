import React from "react";
import { FaBolt, FaFire, FaTint, FaWifi } from "react-icons/fa";

const Cetagory = () => {
  const categories = [
    { name: "Electricity", icon: <FaBolt size={40} color="#facc15" /> },
    { name: "Gas", icon: <FaFire size={40} color="#ef4444" /> },
    { name: "Water", icon: <FaTint size={40} color="#3b82f6" /> },
    { name: "Internet", icon: <FaWifi size={40} color="#22c55e" /> },
  ];

  return (
    <div className="py-10  ">
      <h2 className="text-3xl text-white font-bold text-center mb-8">Our Bill Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="backdrop-blur-lg p-6 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 text-center"
          >
            <div className="flex justify-center mb-4">{cat.icon}</div>
            <h3 className="text-xl text-white font-semibold mb-2">{cat.name}</h3>
            <p className="text-white text-sm">
              Pay your {cat.name.toLowerCase()} bills easily and securely.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cetagory;
