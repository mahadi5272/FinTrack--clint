import React from "react";
import { FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-[url('https://i.ibb.co.com/wFsbyBzw/abstract-particle-structure-background-532781-716.avif')] bg-cover bg-no-repeat text-base-content rounded p-10">
      {/* Navigation Links */}
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover text-white" href="/about">About us</a>
        <a className="link link-hover text-white" href="/contact">Contact</a>
        <a className="link link-hover text-white" href="/jobs">Jobs</a>
        <a className="link link-hover text-white" href="/press-kit">Press kit</a>
      </nav>

      {/* Social Icons */}
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://www.facebook.com/your-profile" // তোমার ফেসবুক প্রোফাইল link
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-white hover:text-blue-600"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.youtube.com/your-channel" // তোমার ইউটিউব link
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-white hover:text-red-600"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.linkedin.com/in/your-profile" // তোমার লিঙ্কডইন link
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-white hover:text-blue-700"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </nav>

      {/* Copyright */}
      <aside>
        <p className="text-white">
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;

