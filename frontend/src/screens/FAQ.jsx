import React, { useState } from 'react';
import { FaQuestionCircle, FaChevronDown } from 'react-icons/fa';

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };

  const faqList = [
    {
      question: "What is EcoMart?",
      answer: "EcoMart is an online grocery store that delivers fresh groceries, organic products, and household essentials straight to your door. We are committed to providing high-quality products at competitive prices while maintaining sustainable practices."
    },
    {
      question: "How does delivery work?",
      answer: "We offer fast and reliable delivery services. During checkout, you can select your preferred delivery time slot, and we'll ensure your groceries are delivered within that time. We provide same-day delivery for orders placed before 12 PM."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept a variety of payment methods including credit cards, debit cards, UPI, net banking, and popular digital wallets. All transactions are secured with industry-standard encryption."
    },
    {
      question: "Do you offer discounts or promotions?",
      answer: "Yes, we frequently offer discounts and promotions! You can subscribe to our newsletter or follow us on social media to stay updated on the latest deals. First-time customers get 20% off on their first order."
    },
    {
      question: "Can I return items?",
      answer: "Yes, if you are unsatisfied with any item, you can return it within 7 days of delivery. Simply contact our customer support team to process the return. We offer full refunds for damaged or defective products."
    },
    {
      question: "Is there a minimum order value?",
      answer: "Yes, we have a minimum order value of ₹500. Orders above ₹1000 qualify for free delivery. For orders below ₹1000, a nominal delivery fee of ₹50 applies."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is dispatched, you'll receive a tracking link via SMS and email. You can also track your order in real-time from your account dashboard."
    },
    {
      question: "Are the products fresh?",
      answer: "Absolutely! We source our products directly from trusted suppliers and farmers. All fresh produce is hand-picked on the day of delivery to ensure maximum freshness and quality."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <FaQuestionCircle className="text-4xl text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about EcoMart
          </p>
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {faqList.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
                open === index ? "ring-2 ring-green-500" : ""
              }`}
            >
              <button
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none group"
                onClick={() => toggleFAQ(index)}
              >
                <h2 className="text-lg md:text-xl font-bold text-gray-900 pr-8 group-hover:text-green-600 transition-colors duration-300">
                  {faq.question}
                </h2>
                <FaChevronDown
                  className={`text-green-600 text-xl flex-shrink-0 transition-transform duration-300 ${
                    open === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-6 text-gray-600 leading-relaxed text-base md:text-lg">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
          <p className="text-green-50 mb-6 text-lg">
            Our customer support team is here to help you 24/7
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-green-600 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
