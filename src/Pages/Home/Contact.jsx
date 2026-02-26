import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Send, 
  Clock 
} from "lucide-react";
import axios from "axios";
import { Fade, Slide, Zoom } from "react-awesome-reveal";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCall = () => {
    window.location.href = "tel:+8801834728968";
  };

  const handleEmail = () => {
    window.location.assign("mailto:mahadihasan5272@gmail.com?subject=FinTrack%20Support%20Query");
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("https://fintrack-server-4n3g.onrender.com/contact", data);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Your message has been received. We'll get back to you soon.",
          icon: "success",
          confirmButtonColor: "#4f46e5",
          customClass: {
            popup: 'rounded-[32px]'
          }
        });
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#f43f5e",
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-20 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Slide direction="down">
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 italic">
              Let's <span className="text-indigo-600">Connect</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto">
              Have questions about your transactions or need technical support? We are here to help you 24/7.
            </p>
          </Slide>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Info Side */}
          <div className="space-y-6">
            <Fade cascade damping={0.2} direction="left">
              {/* Call Card */}
              <div 
                onClick={handleCall}
                className="group bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-6 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all cursor-pointer active:scale-95"
              >
                <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <PhoneCall size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-400 uppercase text-xs tracking-widest mb-1">Call Us</h4>
                  <p className="text-lg font-black text-slate-800">+880 1834 728968</p>
                </div>
              </div>

              {/* Email Card */}
              <div 
                onClick={handleEmail}
                className="group bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-6 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all cursor-pointer active:scale-95"
              >
                <div className="bg-rose-50 p-4 rounded-2xl text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-400 uppercase text-xs tracking-widest mb-1">Email Us</h4>
                  <p className="text-lg font-black text-slate-800 break-all">mahadi@fintrack.com</p>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-slate-900 p-8 rounded-[32px] shadow-xl text-white relative overflow-hidden">
                <div className="relative z-10">
                  <Clock className="text-indigo-400 mb-4" size={32} />
                  <h4 className="text-xl font-bold mb-2">Support Hours</h4>
                  <p className="text-slate-400 text-sm font-medium">Monday — Friday: 9AM - 6PM</p>
                  <p className="text-slate-400 text-sm font-medium">Weekend: 10AM - 2PM</p>
                </div>
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-slate-800 rounded-full"></div>
              </div>
            </Fade>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2">
            <Zoom>
              <div className="card bg-white shadow-2xl shadow-indigo-100 rounded-[40px] border border-slate-100">
                <div className="card-body p-8 md:p-12">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                        <input {...register("name", { required: "Name is required" })} type="text" placeholder="John Doe" className="input input-bordered w-full rounded-2xl h-14 border-slate-200 focus:border-indigo-600 focus:outline-none text-slate-800 font-medium" />
                        {errors.name && <span className="text-rose-500 text-xs mt-2 font-bold italic ml-1">{errors.name.message}</span>}
                      </div>
                      <div className="form-control">
                        <label className="label text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                        <input {...register("email", { required: "Email is required" })} type="email" placeholder="john@example.com" className="input input-bordered w-full rounded-2xl h-14 border-slate-200 focus:border-indigo-600 focus:outline-none text-slate-800 font-medium" />
                        {errors.email && <span className="text-rose-500 text-xs mt-2 font-bold italic ml-1">{errors.email.message}</span>}
                      </div>
                    </div>
                    
                    <div className="form-control">
                      <label className="label text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Subject</label>
                      <input {...register("subject", { required: "Subject is required" })} type="text" placeholder="How can we help?" className="input input-bordered w-full rounded-2xl h-14 border-slate-200 focus:border-indigo-600 focus:outline-none text-slate-800 font-medium" />
                    </div>

                    <div className="form-control">
                      <label className="label text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Your Message</label>
                      <textarea {...register("message", { required: "Message is required" })} className="textarea textarea-bordered h-40 rounded-3xl border-slate-200 focus:border-indigo-600 focus:outline-none text-slate-800 font-medium p-4" placeholder="Write your message here..."></textarea>
                      {errors.message && <span className="text-rose-500 text-xs mt-2 font-bold italic ml-1">{errors.message.message}</span>}
                    </div>

                    <button type="submit" className="btn bg-indigo-600 hover:bg-indigo-700 w-full text-white border-none rounded-2xl h-14 text-lg font-black shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-3">
                      <Send size={20} /> SEND MESSAGE
                    </button>
                  </form>
                </div>
              </div>
            </Zoom>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;