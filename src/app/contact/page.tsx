'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState<{ name: string; email: string; message: string }>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Message submitted!');
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-50 px-6 py-20 flex items-center justify-center">
      {/* Decorative Blobs (fixed size, no animation) */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-blue-300 opacity-20 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-2xl -z-10" />

      {/* Content Section */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start z-10">
        {/* Contact Info Column */}
        <div className="space-y-8">
          <h2 className="text-4xl font-extrabold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600 text-lg">
            Whether you have a question, want to work together, or just want to say hi — we’re here to talk.
          </p>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Contact Details</h2>
            <p className="text-gray-600 text-lg mb-8">
              We’d love to hear from you. Reach us through any of the options below.
            </p>

            {/* Office */}
            <div className="flex items-center gap-4 bg-white shadow-md hover:shadow-xl transition rounded-xl p-4 hover:scale-[1.02]">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Our Office</h4>
                <p className="text-gray-500 text-sm">123 Palm Street, Dubai, UAE</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 bg-white shadow-md hover:shadow-xl transition rounded-xl p-4 hover:scale-[1.02]">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Email Us</h4>
                <p className="text-gray-500 text-sm">support@yourdomain.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 bg-white shadow-md hover:shadow-xl transition rounded-xl p-4 hover:scale-[1.02]">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Call Us</h4>
                <p className="text-gray-500 text-sm">+971 123 456 789</p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <p className="text-gray-500 italic">
              “We respond to every message within 24 hours. Guaranteed.”
            </p>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white p-10 rounded-3xl shadow-2xl hover:shadow-blue-200 transition-shadow duration-300 transform hover:scale-[1.01] w-full">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 bg-[#f9fafb] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Your Name
              </label>
            </div>

            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 bg-[#f9fafb] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Email Address
              </label>
            </div>

            {/* Message Field */}
            <div className="relative">
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 bg-[#f9fafb] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <label className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                Your Message
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-600 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
