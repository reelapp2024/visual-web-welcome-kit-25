
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { useHeaderData } from '../../../hooks/useHeaderData.js';

const CleaningHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const {
    phoneNumber,
    projectName,
    projectCategory,
    projectFasFA,
    projectSlogan,
    isLoading
  } = useHeaderData();

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Areas', href: '/areas' },
    { name: 'Contact', href: '/contact' }
  ];

  if (isLoading) {
    return (
      <header className="bg-white shadow-lg sticky top-0 z-50 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="animate-pulse bg-gray-200 h-8 w-48 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div
              style={{
                fontSize: '2rem',
                color: '#fff',
                background: 'linear-gradient(145deg, #38a169, #2f855a)',
                width: '48px',
                height: '48px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                boxShadow:
                  'inset -2px -2px 5px rgba(255,255,255,0.2), inset 2px 2px 5px rgba(0,0,0,0.2), 0 6px 15px rgba(0,0,0,0.15)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                cursor: 'pointer',
                transform: 'scale(1)',
                marginRight: '13px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.boxShadow =
                  'inset -1px -1px 4px rgba(255,255,255,0.3), inset 1px 1px 4px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow =
                  'inset -2px -2px 5px rgba(255,255,255,0.2), inset 2px 2px 5px rgba(0,0,0,0.2), 0 6px 15px rgba(0,0,0,0.15)';
              }}
            >
              <i className={`fas ${projectFasFA}`}></i>
            </div>

            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {projectName}
              </h1>
              <p className="text-sm text-gray-600">{projectSlogan}</p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Call Button */}
          <div className="hidden md:flex items-center">
            <a
              href={`tel:${phoneNumber}`}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-full font-bold flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Phone size={18} />
              <span>{phoneNumber}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-green-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href={`tel:${phoneNumber}`}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full font-bold flex items-center justify-center space-x-2 w-full"
              >
                <Phone size={18} />
                <span>{phoneNumber}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default CleaningHeader;
