import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router"; 
import { toast, ToastContainer } from "react-toastify";
import { Slide, Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthProvider";
import { UserPlus, Mail, Lock, User, Image as ImageIcon } from "lucide-react";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { signup, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSignUp = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", data.photo[0]);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      
      const imageRes = await axios.post(image_API_URL, formData);
      const photoURL = imageRes.data.data.url;

      const result = await signup(data.email, data.password);
      await updateUserProfile(data.name, photoURL);

      const userInfo = {
        name: data.name,
        email: data.email.toLowerCase(), 
        photo: photoURL,
        role: "user",
        uid: result.user?.uid,
        createdAt: new Date(),
      };

      const res = await axios.post("https://fintrack-server-4n3g.onrender.com/users", userInfo);

      if (res.data.insertedId) {
        toast.success("Welcome to FinTrack!");
        setTimeout(() => navigate("/dashboard/userHome"), 1500);
      }
    } catch (error) {
      setLoading(false);
      const msg = error.code === 'auth/email-already-in-use' ? "Email already exists!" : "Registration failed!";
      toast.error(msg);
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b15] relative overflow-hidden px-4 py-12">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px]"></div>

      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Content */}
        <Slide direction="left">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
              Start Saving <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                Smarter.
              </span>
            </h1>
            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
              Join thousands of users managing their finances with bank-grade security and smart insights.
            </p>
          </div>
        </Slide>

        {/* Right Side: Glass Form */}
        <Fade>
          <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8 md:p-10 shadow-2xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
                <UserPlus size={28} />
              </div>
              <h2 className="text-2xl font-bold text-white">Create Account</h2>
            </div>

            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-5">
              {/* Full Name */}
              <div className="relative">
                <User className="absolute left-4 top-4 text-gray-500" size={20} />
                <input type="text" {...register("name", { required: "Name is required" })} placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500/50 focus:ring-0 outline-none transition-all" />
              </div>

              {/* Photo Upload Custom Style */}
              <div className="relative">
                <label className="flex items-center gap-3 w-full bg-white/5 border border-white/10 border-dashed rounded-2xl py-3 px-4 text-gray-400 cursor-pointer hover:bg-white/10 transition-all">
                  <ImageIcon size={20} />
                  <span className="text-sm truncate">
                    {errors.photo ? "Photo is required" : "Choose Profile Photo"}
                  </span>
                  <input type="file" {...register("photo", { required: true })} className="hidden" />
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-gray-500" size={20} />
                <input type="email" {...register("email", { required: "Email is required" })} placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500/50 focus:ring-0 outline-none transition-all" />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-gray-500" size={20} />
                <input type="password" {...register("password", { 
                  required: "Password is required", 
                  minLength: { value: 6, message: "Min 6 chars" },
                  pattern: { value: /(?=.*[A-Z])(?=.*[0-9])/, message: "Must include Uppercase & Number" }
                })} placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500/50 focus:ring-0 outline-none transition-all" />
                {errors.password && <p className="text-rose-400 text-[10px] mt-2 ml-2 font-bold uppercase italic">{errors.password.message}</p>}
              </div>

              <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#070b15] py-4 rounded-2xl font-black text-lg shadow-xl shadow-emerald-500/20 transition-all transform hover:scale-[1.02] active:scale-95 flex justify-center items-center" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : "Sign Up Free"}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-emerald-400 font-bold hover:underline">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Register;