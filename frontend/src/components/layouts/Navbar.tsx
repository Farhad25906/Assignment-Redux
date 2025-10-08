import React, { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { id: "all-books", label: "All Books", path: "/books" },
    { id: "add-book", label: "Add Book", path: "/create-book" },
    { id: "borrow-summary", label: "Borrow Summary", path: "/borrow-summary" },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#00b9be' }}>
                <BookOpen className="text-white" size={24} />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold" style={{ color: "#00b9be" }}>
                Library
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                onClick={handleLinkClick}
                className={({ isActive }) => 
                  `px-3 lg:px-4 py-2 text-sm lg:text-base font-medium transition-all duration-200 rounded-lg ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`
                }
                style={({ isActive }) => 
                  isActive ? { backgroundColor: "#00b9be" } : {}
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                onClick={handleLinkClick}
                className={({ isActive }) => 
                  `block px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
                style={({ isActive }) => 
                  isActive ? { backgroundColor: "#00b9be" } : {}
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;