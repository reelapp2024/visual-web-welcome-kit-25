
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Clock, CheckCircle, Star, Zap, Wrench } from 'lucide-react';
import { httpFile } from '../../../config.js';

const PlumbingHero = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const projectId = import.meta.env.VITE_PROJECT_ID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpFile.post('/webapp/v1/my_site', {
          projectId,
          pageType: 'home',
          reqFrom: 'Hero'
        });

        const info = data.projectInfo || {};
        const about = data.aboutUs || {};

        setProjectCategory(info.serviceType || '');
        setPhoneNumber(about.phone || '');
      } catch (err) {
        console.error('Fetch hero data error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden font-poppins">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-cyan-900/90 to-blue-800/95"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-bounce delay-1000"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
        <div className="max-w-5xl mx-auto">
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-white/90 text-sm">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <CheckCircle size={16} className="mr-2 text-cyan-400" />
              <span className="font-medium">Licensed & Insured</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Wrench size={16} className="mr-2 text-blue-400" />
              <span className="font-medium">24/7 Emergency Service</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Star size={16} className="mr-2 text-cyan-400" />
              <span className="font-medium">5-Star Rated</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-6 leading-tight">
            Professional
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Plumbing Services
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 font-bold">
              & Emergency Repairs!
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            🔧 24/7 Emergency Service • 💧 Expert Leak Repairs • ⚡ Fast, reliable plumbing solutions
          </p>

          {/* Phone Number Display - Fixed and Responsive */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/30 shadow-2xl">
              <Phone size={28} className="text-cyan-400 mr-3 sm:mr-4 animate-pulse flex-shrink-0" />
              <div className="text-left">
                <div className="text-xs sm:text-sm text-white/70 uppercase tracking-wide font-semibold">Call Now - 24/7 Emergency Service</div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white break-all sm:break-normal">
                  {phoneNumber || '(555) 123-4567'}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a 
              href={`tel:${phoneNumber}`}
              className="group bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-6 py-3 sm:px-8 sm:py-4 lg:px-12 lg:py-6 rounded-full font-bold text-lg sm:text-xl lg:text-2xl transition-all duration-300 flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-center shadow-2xl transform hover:scale-105"
            >
              <Phone size={24} className="group-hover:animate-pulse flex-shrink-0" />
              <span className="whitespace-nowrap">Call Now: {phoneNumber}</span>
            </a>
            
            <button
              onClick={() => navigate('/contact')}
              className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white px-6 py-3 sm:px-8 sm:py-4 lg:px-12 lg:py-6 rounded-full font-bold text-lg sm:text-xl lg:text-2xl transition-all duration-300 flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-center shadow-2xl transform hover:scale-105"
            >
              <Clock size={24} className="group-hover:rotate-12 transition-transform duration-200 flex-shrink-0" />
              <span className="whitespace-nowrap">Free Quote</span>
            </button>
          </div>

          {/* Urgency Message */}
          <div className="bg-gradient-to-r from-blue-500/80 to-cyan-500/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-white font-bold text-base sm:text-lg lg:text-xl flex items-center justify-center flex-wrap gap-2">
              <Zap className="text-cyan-400 animate-pulse flex-shrink-0" />
              <span className="text-center">24/7 Emergency Plumbing Available - Call Now!</span>
              <Zap className="text-cyan-400 animate-pulse flex-shrink-0" />
            </p>
          </div>
        </div>
      </div>

      {/* Floating Call Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <a 
          href={`tel:${phoneNumber}`}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white p-4 rounded-full shadow-2xl animate-bounce"
        >
          <Phone size={24} />
        </a>
      </div>
    </section>
  );
};

export default PlumbingHero;
