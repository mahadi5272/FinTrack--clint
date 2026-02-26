import React from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Create Your Profile",
      description: "Sign up in seconds and securely link your account to start your journey with FinTrack.",
      color: "bg-blue-500",
      shadow: "shadow-blue-500/20"
    },
    {
      id: "02",
      title: "Log Daily Transactions",
      description: "Record every income and expense. Categorize them to understand your spending habits.",
      color: "bg-emerald-500",
      shadow: "shadow-emerald-500/20"
    },
    {
      id: "03",
      title: "Analyze & Save",
      description: "Get smart AI insights and reach your savings goals faster with our detailed reports.",
      color: "bg-indigo-500",
      shadow: "shadow-indigo-500/20"
    }
  ];

  return (
    <section className="py-24 bg-[#0a0f1d] relative overflow-hidden">
      {/* Background abstract elements - আগের থেকে আলাদা */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]"></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <h4 className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-3">Process</h4>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Smart way to <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              manage your money.
            </span>
          </h2>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-8 group"
            >
              {/* Number and Line */}
              <div className="flex flex-row md:flex-col items-center gap-4">
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-2xl font-black text-white ${step.shadow} shadow-2xl transform group-hover:scale-110 transition-transform duration-300`}>
                  {step.id}
                </div>
                {index !== steps.length - 1 && (
                  <div className="h-1 md:h-20 w-20 md:w-1 bg-gray-800 rounded-full"></div>
                )}
              </div>

              {/* Content Card - No Glass Effect */}
              <div className="flex-1 bg-[#161c2d] p-8 md:p-12 rounded-[2.5rem] border border-gray-800 hover:border-blue-500/50 transition-colors duration-500">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;