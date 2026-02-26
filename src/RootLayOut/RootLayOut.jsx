import React from "react";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../shared/Footer"
import { ToastContainer } from "react-toastify";

const RootLayOut = () => {
  return (
    <>
      {/* বডি ব্যাকগ্রাউন্ড আপডেট: 
        আমরা একটি 'Deep Navy Blue' ডার্ক গ্রেডিয়েন্ট ব্যবহার করছি যা লোগোর সবুজ এবং নীল রঙের সাথে 
        চমৎকার কন্ট্রাস্ট তৈরি করবে। এটি অ্যাপটিকে অনেক বেশি প্রিমিয়াম লুক দেবে। 
      */}
      <div className="min-h-screen bg-[#070b15] text-white selection:bg-blue-500/30">
        
        {/* ব্যাকগ্রাউন্ডে হালকা একটি গ্লোয়িং ইফেক্ট (ঐচ্ছিক কিন্তু সুন্দর লাগবে) */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px]"></div>
        </div>

        <header className="sticky top-0 z-50 backdrop-blur-lg border-b border-white/5 bg-[#070b15]/80">
          {/* Navbar এখানে থাকবে */}
          <Navbar />
        </header>
        
        <main className="relative z-10 min-h-[calc(100-vh-300px)]">
          {/* পেজের কন্টেন্ট */}
          <Outlet />
        </main>
        
        <footer className="relative z-10 border-t border-white/5 bg-[#0a0f1d]">
          <Footer />
          <ToastContainer 
            theme="dark" 
            position="top-center" 
            autoClose={3000} 
            toastClassName="backdrop-blur-md bg-white/10 border border-white/20"
          />
        </footer>
      </div>
    </>
  );
};

export default RootLayOut;