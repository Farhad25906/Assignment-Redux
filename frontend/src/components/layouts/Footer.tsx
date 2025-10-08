
import { Mail, Phone, MapPin, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* About Section */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#00b9be' }}>
                <BookOpen className="text-white" size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold" style={{ color: "#00b9be" }}>
                Library
              </h3>
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xs mx-auto sm:mx-0">
              Your digital library management system for tracking books and
              borrowing records.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-gray-900 mb-4 text-base sm:text-lg">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-600 hover:text-gray-900 text-sm sm:text-base transition-colors inline-block hover:translate-x-1 transform duration-200"
                >
                  📚 All Books
                </a>
              </li>
              <li>
                <a
                  href="/create-book"
                  className="text-gray-600 hover:text-gray-900 text-sm sm:text-base transition-colors inline-block hover:translate-x-1 transform duration-200"
                >
                  ➕ Add Book
                </a>
              </li>
              <li>
                <a
                  href="/borrow-summary"
                  className="text-gray-600 hover:text-gray-900 text-sm sm:text-base transition-colors inline-block hover:translate-x-1 transform duration-200"
                >
                  📊 Borrow Summary
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-gray-900 mb-4 text-base sm:text-lg">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center justify-center sm:justify-start space-x-3 text-sm sm:text-base text-gray-600">
                <Mail size={18} className="flex-shrink-0" style={{ color: '#00b9be' }} />
                <span>library@example.com</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-3 text-sm sm:text-base text-gray-600">
                <Phone size={18} className="flex-shrink-0" style={{ color: '#00b9be' }} />
                <span>+123 456 7890</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-3 text-sm sm:text-base text-gray-600">
                <MapPin size={18} className="flex-shrink-0" style={{ color: '#00b9be' }} />
                <span>Your City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter (Optional Section) */}
        <div className="mt-8 lg:mt-10 pt-6 lg:pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Follow us:</span>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-opacity-80 transition-colors" style={{ backgroundColor: '#00b9be20' }}>
                  <span className="text-sm" style={{ color: '#00b9be' }}>f</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-opacity-80 transition-colors" style={{ backgroundColor: '#00b9be20' }}>
                  <span className="text-sm" style={{ color: '#00b9be' }}>𝕏</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-opacity-80 transition-colors" style={{ backgroundColor: '#00b9be20' }}>
                  <span className="text-sm" style={{ color: '#00b9be' }}>in</span>
                </a>
              </div>
            </div>
            
            <button 
              className="px-6 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#00b9be' }}
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-6 lg:mt-8 pt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            © {new Date().getFullYear()} Library Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;