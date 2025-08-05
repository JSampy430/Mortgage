'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'Ayesha Khan',
    role: 'Head Mortgage Advisor',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Omar Rahman',
    role: 'Customer Success Manager',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Fatima Noor',
    role: 'Operations Director',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-black text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1581093458791-66c22dc39901"
          alt="Mortgage background"
          layout="fill"
          objectFit="cover"
          className="opacity-40"
        />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold"
          >
            About Our Company
          </motion.h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Empowering your homeownership journey in the UAE with honesty,
            clarity, and real results.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-12">
            We are committed to helping families and individuals unlock the doors to their dream homes with ease, trust, and transparency.
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
          <p className="text-lg text-gray-600">
            To become the most trusted mortgage platform in the UAE by delivering unmatched service, innovative tools, and a people-first experience.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 px-6 sm:px-12 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={120}
                height={120}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-50 px-6 sm:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-600">500+</h3>
            <p className="text-gray-700 mt-2">Clients Served</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">97%</h3>
            <p className="text-gray-700 mt-2">Approval Rate</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">4.9/5</h3>
            <p className="text-gray-700 mt-2">Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to find your mortgage match?
        </h2>
        <p className="text-lg mb-8">
          Check your eligibility or calculate your savings in just a few clicks.
        </p>
        <a
          href="/eligibility-check"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Get Started Now
        </a>
      </section>
    </main>
  );
}
