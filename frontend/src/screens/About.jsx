import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaShippingFast, FaHandHoldingHeart, FaMoneyBillWave, FaUsers, FaRocket } from 'react-icons/fa';

const About = () => {
  const values = [
    {
      icon: <FaLeaf className="text-5xl text-green-600" />,
      title: "Quality",
      description: "We partner with trusted suppliers to ensure that every product we offer meets the highest standards of quality."
    },
    {
      icon: <FaShippingFast className="text-5xl text-blue-600" />,
      title: "Convenience",
      description: "Shop from the comfort of your home and enjoy fast, hassle-free delivery to your door."
    },
    {
      icon: <FaHandHoldingHeart className="text-5xl text-emerald-600" />,
      title: "Sustainability",
      description: "We're committed to eco-friendly practices, using sustainable packaging and minimizing our carbon footprint."
    },
    {
      icon: <FaMoneyBillWave className="text-5xl text-amber-600" />,
      title: "Affordability",
      description: "Competitive pricing ensures that you can stock up on essentials without stretching your budget."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
            <FaLeaf className="text-4xl" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            About EcoMart
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-green-50 max-w-3xl mx-auto leading-relaxed">
            Your Trusted Partner for Fresh, Sustainable Grocery Shopping
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16">
            <div className="flex items-center justify-center mb-8">
              <FaRocket className="text-5xl text-green-600" />
            </div>
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Our Mission</h2>
            <p className="text-xl leading-relaxed text-center text-gray-700">
              At EcoMart, our mission is simple: to make grocery shopping convenient, affordable, and sustainable.
              We believe that everyone deserves access to high-quality food and household products without sacrificing
              their time or budget. That's why we provide a seamless online shopping experience with fast delivery, 
              ensuring that you get fresh produce, pantry essentials, and more delivered right to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">What drives us every day</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center transform hover:-translate-y-2">
                <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl p-10 md:p-16">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Our Story</h2>
            <p className="text-xl leading-relaxed text-gray-700 mb-6">
              EcoMart was founded in 2024 with the vision of revolutionizing the grocery shopping experience. Our goal
              is to bring the widest selection of groceries and essentials to your fingertips, combining convenience,
              sustainability, and affordability.
            </p>
            <p className="text-xl leading-relaxed text-gray-700">
              With a dedicated team and a user-friendly platform, EcoMart aims to make
              grocery shopping easier, faster, and more eco-conscious than ever before. Every day, we work tirelessly
              to ensure that your experience with us exceeds expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <FaUsers className="text-4xl text-green-600" />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Meet the Team</h2>
          <p className="text-xl leading-relaxed text-gray-700 max-w-4xl mx-auto">
            Behind EcoMart is a passionate team of professionals who are dedicated to ensuring your experience is top-notch. 
            From our technology experts who create a smooth shopping platform to our logistics team who ensure your groceries 
            arrive fresh and on time, every member of our team plays a vital role in making EcoMart your trusted online store.
          </p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl shadow-2xl p-12 md:p-16 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Join Us on Our Journey</h2>
            <p className="text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
              Whether you're a busy professional, a parent, or someone looking for a more sustainable way to shop, EcoMart
              is here to serve you. Discover the future of grocery shopping with us!
            </p>
            <Link to="/" className="inline-block bg-white text-green-600 font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Start Shopping Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
