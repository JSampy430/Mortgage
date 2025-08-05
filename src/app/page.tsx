'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Clock, Users, Banknote } from 'lucide-react';

const slides = [
  {
    title: 'Buyout Your Mortgage',
    description: 'Paying too much on your existing mortgage? Find out how much you can save by switching.',
    buttonText: 'Buyout Calculator',
    href: '/buyout-calculator',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Check Your Eligibility',
    description: 'Not sure how much you can borrow? Use our quick eligibility checker to find out.',
    buttonText: 'Check Eligibility',
    href: '/eligibility-check',
    image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Use Mortgage Calculator',
    description: 'Calculate your monthly mortgage payments and interest with our free tool.',
    buttonText: 'Mortgage Calculator',
    href: '/mortgage-calculator',
    image: 'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80',
  },
];


export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      
      {/* --- Navigation Bar (Updated) --- */}
<nav className="w-full bg-black text-white py-8 px-8 flex items-center justify-between fixed top-0 z-50 shadow-md">
  {/* Logo - Bigger and properly fitted */}
  <Link href="/" className="flex items-center gap-2">
    <Image
      src="/logoBlack.png" // Make sure this is your transparent version
      alt="Best Mortgage Logo"
      width={120} // Was 160
      height={50} // Was 50
      className="object-contain"
      priority
    />
  </Link>

  {/* Center Nav Links - Larger spacing and font */}
  <div className="hidden md:flex space-x-10 text-lg font-semibold">
    <Link href="/" className="hover:text-gray-300 transition">Home</Link>
    <Link href="/faq" className="hover:text-gray-300 transition">FAQs</Link>
    <Link href="/eligibility-check" className="hover:text-gray-300 transition">Eligibility</Link>
    <Link href="/mortgage-calculator" className="hover:text-gray-300 transition">Calculator</Link>
    <Link href="/blog" className="hover:text-gray-300 transition">Blogs</Link>
  </div>

  {/* Right Side - CTA */}
  <div className="hidden md:flex items-center space-x-6 text-lg font-semibold">
    <Link href="/sec.aboutus">
  <span className="hover:text-blue-600 transition cursor-pointer">
    About Us
  </span>
</Link>
    <Link href="/contact">Contact</Link>
  </div>
</nav>


      <div className="h-[80px]" />

      <main className="relative min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#e5e7eb] px-6 py-12 overflow-hidden">
        {/* --- Animated Background Blobs --- */}
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 opacity-40 blur-[120px] z-0 animate-pulse"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 0.6 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute top-1/3 -right-64 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-400 opacity-30 blur-[120px] z-0 animate-pulse"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", delay: 1 }}
        />

        {/* --- Hero Slideshow --- */}
        <section className="relative max-w-6xl mx-auto mt-10 p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="flex flex-col md:flex-row items-center gap-10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full md:w-1/2 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{slides[index].title}</h1>
                <p className="text-gray-600 text-md">{slides[index].description}</p>
                <Link href={slides[index].href}>
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition">
                    {slides[index].buttonText}
                  </button>
                </Link>
              </div>
              <div className="w-full md:w-1/2">
                <Image
                  src={slides[index].image}
                  alt={slides[index].title}
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg object-cover"
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full ${i === index ? 'bg-red-600' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </section>
{/* Qualify Button Section */}
<div className="flex justify-center mt-16 mb-8 relative z-10">
  <Link href="/eligibility-check">
  <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition">
    Qualify Now
  </button>
</Link>
</div>

{/* Stat Background Blur */}
<div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
  <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-pink-300 to-cyan-300 opacity-30 rounded-full blur-[200px] top-[400px] left-1/2 transform -translate-x-1/2 -z-10"></div>
</div>

{/* Stats Section */}
<section className="max-w-6xl mx-auto px-6 py-10 bg-white/80 backdrop-blur-lg rounded-2xl shadow-md grid grid-cols-2 md:grid-cols-4 text-center text-gray-800 z-10 relative">
  {[
    { value: '1000+', label: 'Successful Transactions.' },
    { value: '20+', label: 'Years of Experience.' },
    { value: '150+', label: 'Mortgage Offers.' },
    { value: '100%', label: 'Customer Satisfaction.' },
  ].map((stat, i) => (
    <div key={i} className={`py-4 ${i !== 0 ? 'border-l border-gray-300' : ''}`}>
      <p className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</p>
      <p className="text-sm text-gray-600">{stat.label}</p>
    </div>
  ))}
</section>
<section className="w-full px-6 py-24 bg-gradient-to-br from-[#f9fafb] to-[#e0f7fa]">
  <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-16">
    
    {/* Left Text Column */}
    <div className="flex-1 text-gray-800">
      <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
        Begin Your Path to <br /> Home Ownership
      </h2>
      <p className="text-xl mb-6">
        Get expert help securing your mortgage in the UAE. Learn how much you can borrow,
        understand the process, and discover bank-exclusive rates.
      </p>
      <p className="text-lg mb-8 text-gray-700">
        Our experienced advisors work closely with residents, non-residents, and UAE nationals
        to simplify home financing and guide you every step of the way.
      </p>

      {/* Residency Buttons */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <button className="px-6 py-3 rounded-full bg-black text-white text-lg font-semibold">UAE Resident</button>
        <button className="px-6 py-3 rounded-full border border-gray-400 text-gray-800 text-lg font-medium">UAE National</button>
        <button className="px-6 py-3 rounded-full border border-gray-400 text-gray-800 text-lg font-medium">Non-Resident</button>
      </div>

      <p className="text-base text-gray-600">
        Choose the right mortgage solution for your residency status — with flexible terms and low
        rates designed for your needs.
      </p>
    </div>

{/* Right Image Column */}
<div className="flex-1 relative pt-12"> {/* increased spacing downwards with pt-12 */}
  <img
    src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=80"
    alt="Modern house at dusk"
    className="w-full h-auto max-h-[450px] object-cover rounded-2xlbutton shadow-2xl"
  />
  <button className="absolute bottom-4 left-4 bg-black text-white px-6 py-3 text-lg rounded-full shadow-lg hover:bg-gray-900 transition">
    Check Eligibility →
  </button>
</div>

</div>
</section>

{/* --- Follow-up 4-Card Section (Improved) --- */}
<section className="py-24 px-4 sm:px-8 lg:px-20 bg-gradient-to-br from-[#f9fafb] to-[#e0f7fa]">
  <h2 className="text-4xl md:text-5xl font-bold text-center text-black mb-16">
    Why Choose Us
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {/* Card 1 */}
    <div className="bg-black text-white p-6 rounded-2xl shadow-md">
      <div className="text-3xl mb-4">📊</div>
      <h3 className="text-xl font-bold mb-2">Tailored Mortgage Advice</h3>
      <p className="text-sm leading-relaxed">
        We evaluate your financial situation to match you with the best mortgage plans available in the UAE.
      </p>
    </div>

    {/* Card 2 */}
    <div className="bg-white text-black border border-gray-200 p-6 rounded-2xl shadow-md">
      <div className="text-3xl mb-4">🏛️</div>
      <h3 className="text-xl font-bold mb-2">Access to Top Banks</h3>
      <p className="text-sm leading-relaxed">
        Enjoy exclusive access to competitive rates from Dubai's leading mortgage providers and banks.
      </p>
    </div>

    {/* Card 3 */}
    <div className="bg-black text-white p-6 rounded-2xl shadow-md">
      <div className="text-3xl mb-4">📝</div>
      <h3 className="text-xl font-bold mb-2">Fast Application Process</h3>
      <p className="text-sm leading-relaxed">
        From pre-approval to final paperwork, we make the process smooth, secure, and stress-free.
      </p>
    </div>

    {/* Card 4 */}
    <div className="bg-white text-black border border-gray-200 p-6 rounded-2xl shadow-md">
      <div className="text-3xl mb-4">🔑</div>
      <h3 className="text-xl font-bold mb-2">End-to-End Support</h3>
      <p className="text-sm leading-relaxed">
        Get personalized guidance throughout your entire mortgage journey — even after your keys are in hand.
      </p>
    </div>
  </div>
</section>
<section className="bg-white py-20 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Are Saying</h2>
    <p className="text-gray-600 mb-12 text-lg">Real feedback from customers who found their dream home with us.</p>

    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {/* Testimonial 1 */}
      <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Sarah"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="font-semibold text-gray-800">Sarah M.</p>
            <p className="text-sm text-gray-500">British expat</p>
          </div>
        </div>
        <p className="text-gray-700">
          “Neon Mortgage made everything so smooth. I was nervous buying property in Dubai but they guided me step-by-step.”
        </p>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="James"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="font-semibold text-gray-800">James R.</p>
            <p className="text-sm text-gray-500">Investor from Canada</p>
          </div>
        </div>
        <p className="text-gray-700">
          “They found me the best fixed-rate deal I could ask for. Transparent, fast, and super professional.”
        </p>
      </div>

      {/* Testimonial 3 */}
      <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="Ayesha"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="font-semibold text-gray-800">Ayesha T.</p>
            <p className="text-sm text-gray-500">Dubai Resident</p>
          </div>
        </div>
        <p className="text-gray-700">
          “I loved how clear everything was. Even the FAQs helped me understand mortgages better. Highly recommended!”
        </p>
      </div>
    </div>
  </div>
</section>

</main>
</>
);
}
