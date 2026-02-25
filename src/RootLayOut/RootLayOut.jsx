import React from "react";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../shared/Footer"
import { ToastContainer } from "react-toastify";

const RootLayOut = () => {
  return (
    <>
      {/* এখানের গ্রেডিয়েন্টটি 'slate-50' (অত্যন্ত হালকা সাদাটে নীল) থেকে শুরু হয়েছে। 
        এটি আপনার লোগোর নীল এবং সবুজ টেক্সটকে ১০০% ক্লিন এবং ভিজিবল রাখবে।
      */}
      <div className="min-h-screen bg-gradient-to-b from-gray-500 via-[#f8fafc] via-30% via-[#e2e8f0] to-[#0d9488] bg-fixed">
        
        <header className="sticky top-0 z-50">
          {/* Navbar-এ হালকা 'glassmorphism' ইফেক্ট দিলে লোগোটি আরও বেশি প্রিমিয়াম লাগবে।
          */}
          <Navbar />
        </header>
        
        <main className="min-h-screen">
          <Outlet />
        </main>
        
        <footer>
          <Footer />
          <ToastContainer position="top-center" autoClose={3000} />
        </footer>
      </div>
    </>
  );
};

export default RootLayOut;