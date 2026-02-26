import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Slide, Zoom, Fade } from "react-awesome-reveal";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthProvider";
import { Mail, Lock, LogIn, Github } from "lucide-react";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  useEffect(() => {
    document.title = "Login | FinTrack";
  }, []);

  const handleRedirect = async (email) => {
    try {
      const res = await axios.get(`https://fintrack-server-4n3g.onrender.com/users/${email}`);
      const userRole = res.data.role;

      toast.success("Welcome back to FinTrack!");
      
      if (from) {
        navigate(from, { replace: true });
      } else {
        if (userRole === 'admin') {
          navigate("/dashboard/adminHome", { replace: true });
        } else {
          navigate("/dashboard/userHome", { replace: true });
        }
      }
    } catch (err) {
      console.error("Role check failed", err);
      navigate("/dashboard/userHome"); 
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((result) => {
        handleRedirect(result.user?.email);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Invalid credentials!");
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        handleRedirect(result.user?.email);
      })
      .catch((error) => {
        toast.error("Google Login failed!");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b15] relative overflow-hidden px-4">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Text Content */}
        <Slide direction="left">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
              Access Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                Dashboard.
              </span>
            </h1>
            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-md mx-auto lg:mx-0 italic">
              "Financial freedom is available to those who learn about it and work for it."
            </p>
          </div>
        </Slide>

        {/* Right Side: Glassmorphism Login Card */}
        <Zoom>
          <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8 md:p-10 shadow-2xl w-full max-w-md mx-auto">
            <div className="mb-8 flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400">
                <LogIn size={28} />
              </div>
              <h2 className="text-2xl font-bold text-white">Login Now</h2>
            </div>

            <form onSubmit={handleSignIn} className="space-y-5">
              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-gray-500" size={20} />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email Address" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500/50 focus:ring-0 outline-none transition-all placeholder:text-gray-600" 
                  required 
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-gray-500" size={20} />
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-emerald-500/50 focus:ring-0 outline-none transition-all placeholder:text-gray-600" 
                  required 
                />
              </div>

              <div className="flex justify-end">
                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-gray-500 hover:text-emerald-400 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button 
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#070b15] py-4 rounded-2xl font-black text-lg shadow-xl shadow-emerald-500/20 transition-all transform hover:scale-[1.02] active:scale-95 flex justify-center items-center" 
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
              </button>
            </form>

            <div className="divider before:bg-white/5 after:bg-white/5 text-[10px] font-bold text-gray-600 uppercase tracking-widest my-8">OR</div>

            {/* Google Login Button */}
            <button 
              onClick={handleGoogleSignIn} 
              className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all transform hover:scale-[1.02]"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" alt="google" className="w-5" />
              Continue with Google
            </button>

            <p className="mt-8 text-center text-sm font-medium text-gray-400">
              New to FinTrack? <Link to="/registition" className="text-emerald-400 font-bold hover:underline">Register now</Link>
            </p>
          </div>
        </Zoom>
      </div>
      <ToastContainer theme="dark" position="top-center" />
    </div>
  );
};

export default Login;
// admin@gmail.com | Aa123!