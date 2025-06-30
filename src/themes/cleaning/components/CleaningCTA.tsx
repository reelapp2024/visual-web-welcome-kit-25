
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Sparkles } from 'lucide-react';
import { useCTAData } from '../../../hooks/useCTAData.js';

const CleaningCTA = () => {
  const {
    phoneNumber,
    CTA,
    projectCategory,
    isLoading
  } = useCTAData();

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse">
            <div className="bg-white/20 h-8 w-64 mx-auto mb-4 rounded"></div>
            <div className="bg-white/20 h-4 w-96 mx-auto mb-8 rounded"></div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/20 h-12 w-48 rounded-full"></div>
              <div className="bg-white/20 h-12 w-48 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {CTA}
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-green-100">
          Transform your world with our professional {projectCategory} services.  
          Top-tier quality, experienced professionals, and satisfaction guaranteed every time.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href={`tel:${phoneNumber}`}
            className="group bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center space-x-3 w-full sm:w-auto justify-center shadow-xl transform hover:scale-105"
          >
            <Phone size={24} className="group-hover:animate-pulse" />
            <span>Call Now: {phoneNumber}</span>
          </a>
          
          <Link 
            to="/contact"
            className="group bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center space-x-3 w-full sm:w-auto justify-center shadow-xl transform hover:scale-105"
          >
            <Sparkles size={24} />
            <span>Book Services of {projectCategory}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CleaningCTA;
