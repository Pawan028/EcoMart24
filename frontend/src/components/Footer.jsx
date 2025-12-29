import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLeaf } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thanks for subscribing! Stay tuned for exclusive deals.', {
        position: 'bottom-right',
        autoClose: 3000,
      });
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaLeaf className="text-green-500 text-3xl" />
              <h3 className="text-white text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                EcoMart
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner for fresh, organic groceries and daily essentials. Delivered with care, sustainability, and a smile.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center space-x-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 transition-all duration-300"></span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center space-x-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 transition-all duration-300"></span>
                  <span>Shop Now</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center space-x-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 transition-all duration-300"></span>
                  <span>FAQs</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center space-x-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 transition-all duration-300"></span>
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 relative inline-block">
              Get In Touch
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400 hover:text-green-400 transition-colors duration-200">
                <FaEnvelope className="text-green-500 mt-1 flex-shrink-0" />
                <span>support@ecomart.com</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 hover:text-green-400 transition-colors duration-200">
                <FaPhone className="text-green-500 mt-1 flex-shrink-0" />
                <span>+91 123 456 7890</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 hover:text-green-400 transition-colors duration-200">
                <FaMapMarkerAlt className="text-green-500 mt-1 flex-shrink-0" />
                <span>123 Green Street, Eco City, New Delhi, India</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6 relative inline-block">
              Stay Updated
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500"></span>
            </h4>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Subscribe to get exclusive deals, fresh product updates, and eco-friendly tips!
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
                <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/50"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} <span className="text-green-500 font-semibold">EcoMart</span>. All Rights Reserved. Made with 💚 for a greener planet.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-green-400 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-green-400 transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
