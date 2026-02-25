import React from "react";
import { 
  Wallet, 
  Target, 
  ShieldCheck, 
  BarChart3, 
  Users, 
  Zap 
} from "lucide-react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";

const ServicePage = () => {
  const services = [
    {
      title: "Expense Tracking",
      description: "Log your daily transactions with categories. Track income and expenses effortlessly.",
      icon: <Wallet className="text-indigo-600" size={40} />,
      color: "bg-indigo-50"
    },
    {
      title: "Savings Goal Tracker",
      description: "Set financial milestones and monitor your progress with dynamic progress bars.",
      icon: <Target className="text-rose-600" size={40} />,
      color: "bg-rose-50"
    },
    {
      title: "Visual Analytics",
      description: "Understand your spending habits through interactive charts and monthly reports.",
      icon: <BarChart3 className="text-emerald-600" size={40} />,
      color: "bg-emerald-50"
    },
    {
      title: "Admin Moderation",
      description: "Powerful admin tools to manage users, roles, and transaction categories.",
      icon: <Users className="text-blue-600" size={40} />,
      color: "bg-blue-50"
    },
    {
      title: "Secure Authentication",
      description: "Industry-standard JWT tokens and Firebase protection for your financial data.",
      icon: <ShieldCheck className="text-amber-600" size={40} />,
      color: "bg-amber-50"
    },
    {
      title: "Instant Insights",
      description: "Get smart financial tips and instant feedback on your current balance status.",
      icon: <Zap className="text-purple-600" size={40} />,
      color: "bg-purple-50"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="bg-slate-900 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Slide direction="down">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Our <span className="text-indigo-500 italic">Financial</span> Services
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
              Everything you need to master your money management, all in one secure platform.
            </p>
          </Slide>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Fade key={index} delay={index * 100} cascade={false}>
              <div className="group p-8 rounded-[32px] border border-slate-100 bg-white hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300">
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {service.description}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto pb-20 px-6">
        <Zoom>
          <div className="bg-indigo-600 rounded-[40px] p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-6 italic">Ready to take control of your future?</h2>
              <button className="btn bg-white text-indigo-600 border-none hover:bg-slate-100 px-10 rounded-2xl font-bold text-lg h-14">
                Get Started Now
              </button>
            </div>
            {/* Background decorative circles */}
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-indigo-500 rounded-full opacity-50"></div>
            <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-indigo-700 rounded-full opacity-50"></div>
          </div>
        </Zoom>
      </div>
    </div>
  );
};

export default ServicePage;