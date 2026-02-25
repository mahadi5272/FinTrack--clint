import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router"; 
import { toast, ToastContainer } from "react-toastify";
import { Slide, Zoom } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthProvider";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { signup, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSignUp = async (data) => {
    setLoading(true);
    try {
      // ১. ইমেজ আপলোড (ImgBB)
      const formData = new FormData();
      formData.append("image", data.photo[0]);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      
      const imageRes = await axios.post(image_API_URL, formData);
      const photoURL = imageRes.data.data.url;

      // ২. ফায়ারবেস সাইন-আপ
      const result = await signup(data.email, data.password);
      await updateUserProfile(data.name, photoURL);

      // ৩. ইউজার ইনফো (Security: Email Lowercase করা হয়েছে)
      const userInfo = {
        name: data.name,
        email: data.email.toLowerCase(), 
        photo: photoURL,
        uid: result.user?.uid,
        role: "user",
      };

      // ৪. MongoDB-তে সেভ
      const res = await axios.post("http://localhost:3000/users", userInfo);

      if (res.data.insertedId) {
        toast.success("Account Created Successfully!");
        navigate("/dashboard/userHome");
      }
    } catch (error) {
      setLoading(false);
      const msg = error.code === 'auth/email-already-in-use' ? "Email already in use!" : error.message;
      toast.error(msg);
    } 
  };

  return (
    <div className="hero bg-base-200 min-h-screen p-4 font-sans">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <Slide direction="right">
          <div className="text-center lg:text-left max-w-md">
            <h1 className="text-5xl font-black text-slate-800 tracking-tight italic">Join FinTrack!</h1>
            <p className="py-6 text-slate-600 font-medium leading-relaxed">
              Start your journey to financial freedom. Track every taka, set goals, and save smarter.
            </p>
          </div>
        </Slide>
        
        <Zoom>
          <div className="card bg-base-100 w-full max-w-sm shadow-2xl rounded-[40px] border-t-8 border-indigo-600 overflow-hidden">
            <div className="card-body p-10">
              <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
                {/* Full Name */}
                <input type="text" {...register("name", { required: "Name is required" })} placeholder="Full Name" className="input input-bordered w-full rounded-2xl h-14" />
                
                {/* Photo Upload */}
                <label className="text-xs font-bold text-slate-400 ml-2">Upload Profile Photo</label>
                <input type="file" {...register("photo", { required: "Photo is required" })} className="file-input file-input-bordered w-full rounded-2xl" />
                
                {/* Email */}
                <input type="email" {...register("email", { required: "Email is required" })} placeholder="Email Address" className="input input-bordered w-full rounded-2xl h-14" />
                
                {/* Password with strong validation */}
                <input 
                  type="password" 
                  {...register("password", { 
                    required: "Password is required", 
                    minLength: { value: 6, message: "Min 6 characters" },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                      message: "Use uppercase, number & special char"
                    }
                  })} 
                  placeholder="Strong Password" 
                  className="input input-bordered w-full rounded-2xl h-14" 
                />
                
                {errors.password && <p className="text-rose-500 text-xs font-bold px-2 italic">{errors.password.message}</p>}

                <button type="submit" className="btn btn-neutral w-full rounded-2xl h-14 text-lg font-bold shadow-lg shadow-slate-200 mt-4 transition-all hover:scale-[1.02]" disabled={loading}>
                  {loading ? <span className="loading loading-spinner"></span> : "Create Account"}
                </button>
              </form>
              
              <div className="divider text-slate-300 text-[10px] font-bold uppercase tracking-widest">Already have an account?</div>
              
              <Link to="/login" className="btn btn-outline btn-indigo rounded-2xl w-full h-14 border-2 font-bold hover:bg-indigo-50 hover:text-indigo-600">
                Go to Login
              </Link>
            </div>
          </div>
        </Zoom>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Register;