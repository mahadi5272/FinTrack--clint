import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Slide, Zoom, Fade } from "react-awesome-reveal";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthProvider";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  useEffect(() => {
    document.title = "Login | FinTrack";
  }, []);

  // রিডাইরেক্ট লজিক ফাংশন
  const handleRedirect = async (email) => {
    try {
      const res = await axios.get(`http://localhost:3000/users/${email}`);
      const userRole = res.data.role;

      toast.success("Login successful!");
      
      // যদি ইউজার আগে থেকেই কোনো পেজে যাওয়ার চেষ্টা করে (Protected Route)
      if (from) {
        navigate(from, { replace: true });
      } else {
        // রোল অনুযায়ী নির্দিষ্ট ড্যাশবোর্ডে পাঠানো
        if (userRole === 'admin') {
          navigate("/dashboard/adminHome", { replace: true });
        } else {
          navigate("/dashboard/userHome", { replace: true });
        }
      }
    } catch (err) {
      console.error("Role check failed", err);
      navigate("/dashboard/userHome"); // ডিফল্ট সেফ রিডাইরেক্ট
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
        toast.error("Invalid email or password!");
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
    <div className="hero bg-base-200 min-h-screen p-4">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <Slide direction="right">
          <div className="text-center lg:text-left max-w-md">
            <h1 className="text-5xl font-extrabold text-slate-800">Welcome Back!</h1>
            <p className="py-6 text-slate-600 font-medium italic">"Financial freedom is available to those who learn about it and work for it."</p>
          </div>
        </Slide>

        <Zoom>
          <div className="card bg-base-100 w-full max-w-sm shadow-2xl rounded-[32px] overflow-hidden">
            <div className="card-body p-8">
              <Fade cascade damping={0.1}>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <input type="email" name="email" className="input input-bordered w-full rounded-xl h-12" placeholder="Email Address" required />
                  <input type="password" name="password" className="input input-bordered w-full rounded-xl h-12" placeholder="Password" required />
                  <div className="flex justify-end">
                    <Link to="/forgot-password" size="sm" className="text-xs font-bold text-slate-400 hover:text-indigo-600">Forgot password?</Link>
                  </div>
                  <button className="btn btn-neutral w-full rounded-xl h-12 text-lg font-bold" disabled={loading}>
                    {loading ? <span className="loading loading-spinner"></span> : "Login"}
                  </button>
                </form>
              </Fade>

              <div className="divider text-xs font-bold text-slate-300 uppercase tracking-widest">OR</div>

              <button onClick={handleGoogleSignIn} className="btn bg-white hover:bg-slate-50 text-slate-700 border-slate-200 w-full rounded-xl flex items-center justify-center gap-3 h-12 font-bold shadow-sm">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" alt="google" className="w-5" />
                Continue with Google
              </button>

              <p className="mt-6 text-center text-sm font-medium text-slate-500">
                New to FinTrack? <Link to="/" className="text-indigo-600 font-bold hover:underline">Register now</Link>
              </p>
            </div>
          </div>
        </Zoom>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;