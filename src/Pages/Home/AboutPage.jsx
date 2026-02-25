import React from "react";
import { 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Award 
} from "lucide-react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";

const AboutPage = () => {
  const stats = [
    { label: "Active Users", value: "10K+" },
    { label: "Transactions Tracked", value: "1M+" },
    { label: "Savings Goals Met", value: "50K+" },
    { label: "Security Rating", value: "99.9%" },
  ];

  return (
    <div className="bg-white min-h-screen font-sans overflow-hidden">
      {/* Hero Section */}
      <div className="relative py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Slide direction="left">
            <div>
              <h2 className="text-indigo-600 font-bold uppercase tracking-widest mb-4">About FinTrack</h2>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-6">
                Redefining How You <span className="text-indigo-600 italic">Manage</span> Money.
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                FinTrack was born out of a simple idea: Financial management shouldn't be complicated. 
                We provide the tools you need to track expenses, set ambitious savings goals, and 
                visualize your financial future with absolute clarity.
              </p>
              <div className="flex gap-4">
                <button className="btn btn-neutral rounded-2xl px-8 h-14 font-bold">Our Story</button>
                <button className="btn btn-outline border-2 rounded-2xl px-8 h-14 font-bold">Learn More</button>
              </div>
            </div>
          </Slide>

          <Zoom>
            <div className="relative">
              <div className="w-full h-[400px] bg-indigo-100 rounded-[60px] relative overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop" 
                  alt="Financial Growth" 
                  className="w-full h-full object-cover mix-blend-multiply opacity-80"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400">Growth Rate</p>
                    <p className="text-xl font-black text-slate-800">+240% Yearly</p>
                  </div>
                </div>
              </div>
            </div>
          </Zoom>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-white border border-slate-100 shadow-xl rounded-[40px] p-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl font-black text-indigo-600 mb-2">{stat.value}</h3>
              <p className="text-slate-500 font-bold text-sm uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        <Fade direction="up">
          <div className="p-10 bg-indigo-600 rounded-[40px] text-white">
            <h3 className="text-3xl font-black mb-6">Our Mission</h3>
            <p className="text-indigo-100 leading-relaxed text-lg italic">
              "To empower every individual with the financial intelligence and tools required to achieve lasting prosperity and peace of mind."
            </p>
          </div>
        </Fade>
        <Fade direction="up" delay={200}>
          <div className="p-10 bg-slate-900 rounded-[40px] text-white">
            <h3 className="text-3xl font-black mb-6">Our Vision</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              To become the world's most trusted financial companion, helping millions navigate their financial journeys through innovation and data-driven insights.
            </p>
          </div>
        </Fade>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto py-20 px-6 text-center">
        <h2 className="text-4xl font-black text-slate-800 mb-16 italic">Why Choose FinTrack?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Transparency", icon: <CheckCircle2 className="text-indigo-500" />, desc: "No hidden fees, no complex jargon. Just pure financial data." },
            { title: "Security First", icon: <ShieldCheck className="text-indigo-500" />, desc: "Your data is protected with military-grade encryption." },
            { title: "User Empowerment", icon: <Award className="text-indigo-500" />, desc: "We give you the steering wheel of your financial life." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h4>
              <p className="text-slate-500 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;