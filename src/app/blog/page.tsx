import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    title: 'Unlocking the Best Mortgage Rates in Dubai for 2025',
    tag: 'Expert Guide',
    excerpt:
      'Discover how to secure the lowest mortgage rates this year. Learn what lenders are looking for and how to position yourself for success.',
    image: '/blogs/rates.jpg',
    slug: 'best-mortgage-rates-dubai-2025',
    date: 'August 2025',
  },
  {
    title: 'Your Step-by-Step Path to Buying Property in Dubai',
    tag: 'First-Time Buyers',
    excerpt:
      'From choosing the right lender to completing documentation — here’s everything you need to know about applying for a mortgage in the UAE.',
    image: '/blogs/buying-guide.jpg',
    slug: 'buying-property-dubai-guide',
    date: 'July 2025',
  },
  {
    title: '5 Proven Ways to Reduce Your Home Loan Interest',
    tag: 'Smart Tips',
    excerpt:
      'Cut your total repayment cost with these strategic tips. Discover refinancing tricks, prepayment hacks, and more.',
    image: '/blogs/reduce-interest.jpg',
    slug: 'reduce-home-loan-interest-dubai',
    date: 'June 2025',
  },
];

export default function BlogPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Header */}
     <div className="relative w-full h-[400px]">
  <Image
    src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80"
    alt="Modern homes"
    fill
    className="object-cover rounded-b-3xl"
    priority
  />

        <div className="absolute inset-0 bg-black/50 rounded-b-3xl flex flex-col justify-center px-8 md:px-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Smart Mortgage Insights
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            Stay ahead with trusted advice, current mortgage strategies, and expert tips tailored for the UAE property market. 
            Learn how to save more, qualify faster, and make smarter real estate decisions.
          </p>
        </div>
      </div>

      {/* Blog Cards */}
      <section className="py-20 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
          Featured Articles
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <div className="w-full h-48 relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {post.tag}
                </span>
                <p className="text-sm text-gray-500">{post.date}</p>
                <h3 className="text-xl font-semibold text-gray-900 mt-1 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Read Full Article →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
