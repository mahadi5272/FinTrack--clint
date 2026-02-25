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
      <section className="relative py-20 overflow-hidden bg-[url('https://i.ibb.co.com/XrLmxH9y/blue-background-with-blue-white-sky-clouds-1064085-363.avif')] bg-fixed bg-no-repeat bg-cover">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>

        {/* ডার্ক ওভারলে */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-16 text-white tracking-tight">
            How It Works
          </h2>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* ইমেজ কন্টেইনার */}
            <div className="w-full lg:w-1/2">
              <img
                className="w-full h-auto rounded-[2rem] shadow-2xl object-cover border-4 border-white/30"
                src="https://i.ibb.co.com/kgvVVvXv/1489380-Blog-Image-10-110922-1.jpg"
                alt="Process"
              />
            </div>

            {/* কার্ড গ্রিড (Pure Glass Look) */}
            <div className="w-full lg:w-1/2  grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* গ্লাস কার্ড ১ */}
              <div className="relative group p-8 backdrop-blur-md border-white/40 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border  hover:bg-white/50 transition-all duration-500">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform">
                  01
                </div>
                <h3 className="text-xl font-extrabold mb-3 text-gray-900 mt-4">
                  Select Bill Type
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  Choose your category: Electricity, Gas, Water, or Internet.
                </p>
              </div>

              {/* গ্লাস কার্ড ২ */}
              <div className="relative group p-8 backdrop-blur-md border-white/40 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border  hover:bg-white/50 transition-all duration-500">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform">
                  02
                </div>
                <h3 className="text-xl font-extrabold mb-3 text-gray-900 mt-4">
                  Enter Details
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  Provide your account info, address, and phone number.
                </p>
              </div>

              {/* গ্লাস কার্ড ৩ */}
              <div className="relative group p-8 backdrop-blur-md border-white/40 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border  hover:bg-white/50 transition-all duration-500">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform">
                  03
                </div>
                <h3 className="text-xl font-extrabold mb-3 text-gray-900 mt-4">
                  Make Payment
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  Pay securely online and get your receipt instantly through our
                  encrypted gateway.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* payment reletede */}
      <section className="relative py-20 bg-[url('https://i.ibb.co.com/mFT5fWW5/sleek-black-credit-card-leather-wallet-dark-background-modern-finance-concept-94255-15123.avif')] bg-fixed bg-cover bg-center w-full overflow-hidden">
        {/* হালকা ডার্ক ওভারলে যাতে ব্যাকগ্রাউন্ডের ওপর টেক্সট পড়া সহজ হয় */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-16 text-white tracking-tight">
            Why Choose Our Payment?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* কার্ড ১ */}
            <div className="group p-8  backdrop-blur-md rounded-2xl text-center shadow-2xl hover:scale-105 transition-transform duration-300 border border-white/20">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Global Standards
              </h3>
              <p className="text-xs font-semibold text-white uppercase tracking-widest mb-3">
                Secure Transactions
              </p>
              <p className="text-white text-sm leading-relaxed">
                We use <span className="font-bold text-white">Stripe</span> to
                ensure your card details are 100% encrypted and safe.
              </p>
            </div>

            {/* কার্ড ২ */}
            <div className="group p-8  backdrop-blur-md rounded-2xl text-center shadow-2xl hover:scale-105 transition-transform duration-300 border border-white/20">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Accepted Cards
              </h3>
              <p className="text-xs font-semibold text-white uppercase tracking-widest mb-3">
                All Cards Supported
              </p>
              <p className="text-white text-sm leading-relaxed">
                Pay easily using any Visa, Mastercard, American Express, or
                Apple Pay securely.
              </p>
            </div>

            {/* কার্ড ৩ */}
            <div className="group p-8  backdrop-blur-md rounded-2xl text-center shadow-2xl hover:scale-105 transition-transform duration-300 border border-white/20">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Instant Processing
              </h3>
              <p className="text-xs font-semibold text-white uppercase tracking-widest mb-3">
                Fast & Reliable
              </p>
              <p className="text-white text-sm leading-relaxed">
                Your payment is processed instantly through Stripe's high-speed
                global network.
              </p>
            </div>

            {/* কার্ড ৪ */}
            <div className="group p-8  backdrop-blur-md rounded-2xl text-center shadow-2xl hover:scale-105 transition-transform duration-300 border border-white/20">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3 text-white">
                No Data Storage
              </h3>
              <p className="text-xs font-semibold text-white uppercase tracking-widest mb-3">
                Privacy Guaranteed
              </p>
              <p className="text-white text-sm leading-relaxed">
                Privacy Guaranteed: We never store your card information on our
                servers for security.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-[url('https://i.ibb.co.com/1JRfDXF4/black-question-mark-black-background-dramatic-light-representing-problems-ans-mystery-3d-rendering-1.avif')] bg-no-repeat bg-cover bg-fixed relative">
        {/* ডার্ক গ্রেডিয়েন্ট ওভারলে - যা ব্যাকগ্রাউন্ডের সাথে টেক্সটকে ফুটিয়ে তুলবে */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-blue-900/20 to-black/90"></div>

        <div className="relative z-10">
          {/* FAQ section */}
          <section className="py-24">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                  Frequently <span className="text-blue-400">Asked</span>{" "}
                  Questions
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Everything you need to know about our secure bill payment
                  process.
                </p>
              </div>

              <div className="space-y-6">
                {/* FAQ Item 1 */}
                <div className="collapse collapse-plus bg-gradient-to-r from-white/5 to-blue-500/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl hover:border-blue-500/30 transition-all">
                  <input type="radio" name="my-accordion" defaultChecked />
                  <div className="collapse-title text-xl font-bold text-blue-300">
                    How secure is my payment information?
                  </div>
                  <div className="collapse-content">
                    <p className="text-gray-300 leading-relaxed">
                      We use Stripe, a world-class payment gateway. Your card
                      details are 100% encrypted and never stored on our
                      servers.
                    </p>
                  </div>
                </div>

                {/* FAQ Item 2 */}
                <div className="collapse collapse-plus bg-gradient-to-r from-white/5 to-blue-500/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl hover:border-blue-500/30 transition-all">
                  <input type="radio" name="my-accordion" />
                  <div className="collapse-title text-xl font-bold text-blue-300">
                    When will I receive my payment receipt?
                  </div>
                  <div className="collapse-content">
                    <p className="text-gray-300 leading-relaxed">
                      Instantly! You can download your receipt right after the
                      transaction, and we also send a copy to your email.
                    </p>
                  </div>
                </div>

                {/* FAQ Item 3 */}
                <div className="collapse collapse-plus bg-gradient-to-r from-white/5 to-blue-500/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl hover:border-blue-500/30 transition-all">
                  <input type="radio" name="my-accordion" />
                  <div className="collapse-title text-xl font-bold text-blue-300">
                    What should I do if my payment fails?
                  </div>
                  <div className="collapse-content">
                    <p className="text-gray-300 leading-relaxed">
                      Don't worry. Most failed payments are refunded
                      automatically within 24 hours. If not, contact our support
                      team immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="pb-24">
            <h2 className="text-4xl font-black text-white text-center mb-12 tracking-tight">
              What Our <span className="text-blue-400">Users</span> Say
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              {[
                {
                  name: "Rahim",
                  text: "Paying my electricity and water bills online has never been this easy!",
                },
                {
                  name: "Karim",
                  text: "Fast, secure, and convenient — I love this website!",
                },
                {
                  name: "Amina",
                  text: "All my utility payments now happen in minutes, no hassle at all.",
                },
              ].map((user, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-white/10 to-blue-600/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl hover:-translate-y-2 transition-transform duration-300"
                >
                  <p className="italic text-gray-200 mb-6 leading-relaxed">
                    “{user.text}”
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-10 bg-blue-500 rounded-full"></div>
                    <h4 className="font-bold text-blue-300 uppercase tracking-widest text-xs">
                      {user.name}
                    </h4>
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
