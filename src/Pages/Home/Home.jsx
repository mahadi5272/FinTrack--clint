// import BillCard from "../component/BillCard";
import { useLoaderData } from "react-router";
import { useContext, useEffect } from "react";
import { Fade, Slide } from "react-awesome-reveal";
// import BillCard from "../../component/Bill/BillCard";
import { ToastContainer } from "react-toastify";
// import RecentBill from "../../component/home/RecentBill";
import Banner from "../../Components/home/Banner";
import Cetagory from "../../Components/home/Cetagory";
import { AuthContext } from "../../AuthContext/AuthProvider";
import HowItWorks from "../../Components/home/HowItWorks";

const Home = () => {
  useEffect(() => {
    document.title = "Home | UBM System";
  }, []);

  const bill = useLoaderData();
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60px] bg-black text-white">
        <span className="loading loading-spinner loading-md"></span>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  console.log(bill);

  return (
    <div>
      <Fade className="">
        <Banner />
      </Fade>

      <section className="bg-[url('https://i.ibb.co.com/gb7w219Y/images-2.jpg')] bg-no-repeat bg-cover bg-fixed">
        {/* bill category */}
        <Cetagory />

        {/* Recent Bills Section */}
        {/* <RecentBill bill={bill}></RecentBill> */}
      </section>
      {/* ----------------- Extra Section 1: How It Works ----------------- */}
      <section className="relative py-20 overflow-hidden ">
        <HowItWorks></HowItWorks>
      </section>
      {/* payment reletede */}

      {/* হালকা ডার্ক ওভারলে যাতে ব্যাকগ্রাউন্ডের ওপর টেক্সট পড়া সহজ হয় */}
      <section className="relative py-20 bg-[url('https://i.ibb.co.com/mFT5fWW5/sleek-black-credit-card-leather-wallet-dark-background-modern-finance-concept-94255-15123.avif')] bg-fixed bg-cover bg-center w-full overflow-hidden">
        {/* ডার্ক মডার্ন ওভারলে */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white tracking-tight mb-4">
              Secure <span className="text-blue-400">Financial</span> Management
            </h2>
            <p className="text-gray-300 font-medium max-w-xl mx-auto">
              Your security is our top priority. We use industry-leading
              technologies to keep your financial data safe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* কার্ড ১: এনক্রিপশন */}
            <div className="group p-8 backdrop-blur-xl bg-white/5 rounded-3xl text-center shadow-2xl hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 border border-white/10">
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                🔒
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Bank-Grade Security
              </h3>
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
                AES-256 Encryption
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                We use{" "}
                <span className="font-bold text-white">SSL & AES-256</span>{" "}
                encryption to ensure your data remains private and protected.
              </p>
            </div>

            {/* কার্ড ২: পেমেন্ট গেটওয়ে */}
            <div className="group p-8 backdrop-blur-xl bg-white/5 rounded-3xl text-center shadow-2xl hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 border border-white/10">
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                💳
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Secure Gateway
              </h3>
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
                Stripe Verified
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Experience safe transactions with{" "}
                <span className="font-bold text-white">Stripe</span>, supporting
                Visa, Mastercard, and more.
              </p>
            </div>

            {/* কার্ড ৩: রিয়েল-টাইম ট্র্যাকিং */}
            <div className="group p-8 backdrop-blur-xl bg-white/5 rounded-3xl text-center shadow-2xl hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 border border-white/10">
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                📊
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Real-time Sync
              </h3>
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
                Instant Updates
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Every transaction is processed and updated in your dashboard
                instantly via our high-speed cloud.
              </p>
            </div>

            {/* কার্ড ৪: ডেটা প্রাইভেসি */}
            <div className="group p-8 backdrop-blur-xl bg-white/5 rounded-3xl text-center shadow-2xl hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 border border-white/10">
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                🛡️
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Data Privacy
              </h3>
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
                Strict Policy
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your financial habits are your business. We never share or sell
                your personal information to third parties.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-[url('https://i.ibb.co.com/1JRfDXF4/black-question-mark-black-background-dramatic-light-representing-problems-ans-mystery-3d-rendering-1.avif')] bg-no-repeat bg-cover bg-fixed relative overflow-hidden">
        {/* ডার্ক গ্রেডিয়েন্ট ওভারলে - যা ব্যাকগ্রাউন্ডের সাথে টেক্সটকে ফুটিয়ে তুলবে */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b15] via-[#070b15]/90 to-[#070b15]"></div>

        <div className="relative z-10">
          {/* FAQ section */}
          <section className="py-24">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                  Frequently <span className="text-emerald-400">Asked</span>{" "}
                  Questions
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto font-medium">
                  Everything you need to know about managing your budget and
                  tracking expenses with FinTrack.
                </p>
              </div>

              <div className="space-y-6">
                {/* FAQ Item 1 */}
                <div className="collapse collapse-plus bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl hover:border-emerald-500/30 transition-all">
                  <input type="radio" name="my-accordion" defaultChecked />
                  <div className="collapse-title text-xl font-bold text-emerald-400">
                    Is my financial data kept private?
                  </div>
                  <div className="collapse-content">
                    <p className="text-gray-300 leading-relaxed">
                      Absolutely! Your data is encrypted using AES-256
                      standards. We never share your financial habits or
                      personal information with third parties.
                    </p>
                  </div>
                </div>

                {/* FAQ Item 2 */}
                <div className="collapse collapse-plus bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl hover:border-emerald-500/30 transition-all">
                  <input type="radio" name="my-accordion" />
                  <div className="collapse-title text-xl font-bold text-emerald-400">
                    Can I track multiple income sources?
                  </div>
                  <div className="collapse-content">
                    <p className="text-gray-300 leading-relaxed">
                      Yes, FinTrack allows you to add various income streams and
                      categorize them, giving you a clear picture of your total
                      monthly earnings.
                    </p>
                  </div>
                </div>

                {/* FAQ Item 3 */}
                <div className="collapse collapse-plus bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl hover:border-emerald-500/30 transition-all">
                  <input type="radio" name="my-accordion" />
                  <div className="collapse-title text-xl font-bold text-emerald-400">
                    How do Savings Goals work?
                  </div>
                  <div className="collapse-content">
                    <p className="text-gray-300 leading-relaxed">
                      You can set a target amount for specific goals (like a new
                      laptop or travel). FinTrack tracks your progress based on
                      your monthly savings automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="pb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-white tracking-tight mb-4">
                Loved by <span className="text-emerald-400">Smart</span> Savers
              </h2>
              <p className="text-gray-400 font-medium">
                Join thousands of users who have transformed their financial
                life.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              {[
                {
                  name: "Tanvir Ahmed",
                  role: "Entrepreneur",
                  text: "FinTrack helped me identify where I was overspending. I saved 20% more in the first month!",
                },
                {
                  name: "Sara Islam",
                  role: "Graphic Designer",
                  text: "The Savings Goal feature is a game-changer. I finally saved up for my new MacBook without stress!",
                },
                {
                  name: "Adnan Chowdhury",
                  role: "Student",
                  text: "Simple, fast, and secure. It's the best tool for tracking my daily tuition income and expenses.",
                },
              ].map((user, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="mb-6">
                    <span className="text-emerald-400 text-5xl font-serif">
                      “
                    </span>
                    <p className="text-gray-200 -mt-4 italic leading-relaxed">
                      {user.text}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="h-10 w-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/30">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white tracking-wide">
                        {user.name}
                      </h4>
                      <p className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
