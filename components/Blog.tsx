'use client';

import Link from 'next/link';
import Image from 'next/image';

const blogPosts = [
  {
    title: '5 Mistakes to Avoid When Applying for a Mortgage in Dubai',
    slug: 'mortgage-mistakes-dubai',
    excerpt: 'Learn the most common pitfalls people make and how to avoid them before applying for a mortgage.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    date: 'August 2025',
  },
  {
    title: 'How Much Can You Borrow? Understanding Eligibility',
    slug: 'eligibility-explained',
    excerpt: 'We break down how banks calculate how much you can borrow based on salary, debts, and more.',
    image: 'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80',
    date: 'July 2025',
  },
  {
    title: 'Fixed vs. Variable Rates: Which One Should You Choose?',
    slug: 'fixed-vs-variable-rates',
    excerpt: 'Not sure which mortgage type is best? Here’s how to decide what suits your goals.',
    image: 'https://images.unsplash.com/photo-1560185127-6c9cf03b3482?auto=format&fit=crop&w=800&q=80',
    date: 'June 2025',
  },
];

export default function Blog() {
  return (
    <main className="min-h-screen px-6 py-20 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Mortgage Tips & Insights
      </h1>

      <div className="grid md:grid-cols-3 gap-10">
        {blogPosts.map((post) => (
          <div
            key={post.slug}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-1">{post.date}</p>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
