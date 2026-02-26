import React from "react";
import { FaWallet, FaChartLine, FaPiggyBank, FaHistory } from "react-icons/fa";

const Cetagory = () => {
  // FinTrack এর উপযোগী নতুন ক্যাটাগরি ডাটা
  const features = [
    { 
      name: "Expense Tracking", 
      icon: <FaWallet size={40} color="#f87171" />, // লাল রং (খরচ বোঝাতে)
      desc: "Record your daily expenses and categorize them easily." 
    },
    { 
      name: "Income Insights", 
      icon: <FaChartLine size={40} color="#4ade80" />, // সবুজ রং (আয় বোঝাতে)
      desc: "Monitor your income streams and visualize your financial growth." 
    },
    { 
      name: "Savings Goals", 
      icon: <FaPiggyBank size={40} color="#fbbf24" />, // হলুদ রং (সঞ্চয় বোঝাতে)
      desc: "Set and track targets for your future savings and big purchases." 
    },
    { 
      name: "Transaction History", 
      icon: <FaHistory size={40} color="#60a5fa" />, // নীল রং (ইতিহাস বোঝাতে)
      desc: "Access your full financial history anytime with detailed logs." 
    },
  ];

  return (
    <div className="py-10">
      {/* টাইটেল পরিবর্তন */}
      <h2 className="text-3xl text-white font-bold text-center mb-8">Manage Your Finances</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {features.map((item, index) => (
          <div
            key={index}
            className="backdrop-blur-lg bg-white/5 border border-white/10 p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl text-white font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-300 text-sm">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cetagory;