import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion"; // ১. Framer Motion ইম্পোর্ট
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  // অ্যানিমেশন ভেরিয়েন্ট (সহজে ম্যানেজ করার জন্য)
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <div className="w-full max-w-6xl py-5  mx-auto  px-4">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-3xl overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative group">
            <img
              src="https://i.ibb.co.com/fVnCRys6/unnamed.webp"
              alt="Electricity"
              className="w-full h-[450px] object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center items-start text-white px-10 lg:px-20 text-left">
              {/* অ্যানিমেটেড কন্টেন্ট */}
              <motion.h2
                {...fadeInUp}
                className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight"
              >
                Pay Your <span className="text-blue-400">Bills</span> <br />{" "}
                Effortlessly
              </motion.h2>

              <motion.p
                {...fadeInUp}
                transition={{ delay: 0.2, duration: 0.6 }} // ২ মিলি-সেকেন্ড দেরি হবে
                className="text-lg md:text-xl opacity-90 mb-8 max-w-md"
              >
                Manage all your utility payments securely from one integrated
                platform.
              </motion.p>

              <motion.button
                {...fadeInUp}
                transition={{ delay: 0.4, duration: 0.6 }} // ৪ মিলি-সেকেন্ড দেরি হবে
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600/60 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold border border-white/20 hover:bg-blue-600 transition-all shadow-lg"
              >
                Pay Now
              </motion.button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative group">
            <img
              src="https://i.ibb.co.com/Zzz1pBLv/original-69ebe40e12b873fe8fd4380de368d3c2.webp"
              alt="Water"
              className="w-full h-[450px] object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center items-start text-white px-10 lg:px-20 text-left">
              <motion.h2
                {...fadeInUp}
                className="text-4xl md:text-5xl font-black mb-4 leading-tight"
              >
                Track Usage <br />{" "}
                <span className="text-emerald-400">Instantly</span>
              </motion.h2>
              <motion.p
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl opacity-90 mb-8 max-w-md"
              >
                Stay updated with your latest electricity, gas, and water
                consumption.
              </motion.p>
              <motion.button
                {...fadeInUp}
                transition={{ delay: 0.4 }}
                className="bg-emerald-600/60 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold border border-white/20 hover:bg-emerald-600 transition-all shadow-lg"
              >
                View Reports
              </motion.button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative group">
            <img
              src="https://i.ibb.co.com/RTdYHCFH/images.png"
              alt="Internet"
              className="w-full h-[450px] object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center items-start text-white px-10 lg:px-20 text-left">
              <motion.h2
                {...fadeInUp}
                className="text-4xl md:text-5xl font-black mb-4 leading-tight"
              >
                Go Digital, <br />{" "}
                <span className="text-blue-400">Save Time</span>
              </motion.h2>
              <motion.p
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl opacity-90 mb-8 max-w-md"
              >
                Experience seamless, secure online payments anytime, anywhere.
              </motion.p>
              <motion.button
                {...fadeInUp}
                transition={{ delay: 0.4 }}
                className="bg-blue-600/60 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold border border-white/20 hover:bg-blue-600 transition-all shadow-lg"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
