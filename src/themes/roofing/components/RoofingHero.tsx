
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Clock, CheckCircle, Star, Zap, Home, Shield, Award } from 'lucide-react';
import { httpFile } from '../../../config.js';

const RoofingHero = () => {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden font-poppins">
      {/* Background with geometric overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80"
          alt="Professional roofing services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-700/95"></div>
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg width="100%" height="100%" preserveAspectRatio="none">
              <pattern id="roof-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M0 0L30 30L60 0M0 60L30 30L60 60" stroke="white" strokeWidth="1" fill="none" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#roof-pattern)" />
            </svg>
          </div>
        </div>
      </div>

      {/* Geometric floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-400/10 rotate-45 blur-xl animate-bounce-slow"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-slate-400/10 rounded-lg rotate-12 blur-xl animate-bounce-slow delay-1000"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-orange-300/10 rounded-lg rotate-45 blur-xl animate-bounce-slow delay-700"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left column: Hero text */}
          <div className="text-left">
            <div className="inline-flex items-center bg-slate-800/50 backdrop-blur-sm px-5 py-2 rounded-lg border-l-4 border-orange-500 mb-8">
              <Shield size={18} className="text-orange-400 mr-2" />
              <span className="text-white/80 font-medium">Licensed & Professional Roofers</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Expert 
              <span className="ml-2 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Roofing 
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2">
                Solutions for Your Home
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-lg">
              Professional roof installation, repair, and replacement services with industry-leading warranties.
            </p>

            {/* Trust badges in a horizontal strip */}
            <div className="flex flex-wrap gap-5 mb-8">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mr-2 border border-orange-500/30">
                  <CheckCircle size={18} className="text-orange-400" />
                </div>
                <span className="text-white/90 text-sm">Fully Insured</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mr-2 border border-orange-500/30">
                  <Clock size={18} className="text-orange-400" />
                </div>
                <span className="text-white/90 text-sm">Same-Day Service</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mr-2 border border-orange-500/30">
                  <Award size={18} className="text-orange-400" />
                </div>
                <span className="text-white/90 text-sm">10-Year Warranty</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start mb-8">
              <a 
                href={`tel:${phoneNumber}`}
                className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 flex items-center space-x-2 shadow-xl border border-orange-600/50 w-full sm:w-auto justify-center"
              >
                <Phone size={20} className="group-hover:animate-pulse" />
                <span>Call Now: {phoneNumber}</span>
              </a>
              
              <button 
                onClick={() => navigate('/contact')}
                className="group bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 flex items-center space-x-2 border border-slate-600 w-full sm:w-auto justify-center"
              >
                <span>Free Quote</span>
              </button>
            </div>
          </div>

          {/* Right column: Contact card */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl w-full max-w-md transform hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">Emergency Roof Repair?</h2>
                <p className="text-white/70">Response in 30 minutes or less</p>
              </div>

              {/* Large phone display */}
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-5 mb-6 border border-slate-600">
                <div className="flex items-center justify-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-4 animate-pulse">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60 uppercase tracking-wide font-medium">Call Now</div>
                    <div className="text-3xl font-bold text-white">(555) 123-4567</div>
                  </div>
                </div>
              </div>

              {/* Service highlights */}
              <div className="space-y-4">
                <div className="flex items-center text-white/80">
                  <Zap size={18} className="text-orange-500 mr-3" />
                  <span>24/7 Emergency Services</span>
                </div>
                <div className="flex items-center text-white/80">
                  <Home size={18} className="text-orange-500 mr-3" />
                  <span>Residential & Commercial</span>
                </div>
                <div className="flex items-center text-white/80">
                  <Star size={18} className="text-orange-500 mr-3" />
                  <span>5-Star Guaranteed Service</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                <a 
                  href="tel:5551234567"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 w-full"
                >
                  <Phone size={20} />
                  <span>Call Now</span>
                </a>
              </div>

              {/* Emergency notification */}
              <div className="mt-4 bg-orange-500/20 border border-orange-500/40 rounded-lg p-3 flex items-center">
                <Zap className="text-orange-400 mr-2 animate-pulse" size={18} />
                <p className="text-sm text-white font-medium">Roof leaking? Call our emergency line!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating call button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <a 
          href={`tel:${phoneNumber}`}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-2xl relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-ping opacity-75"></div>
          <Phone size={24} />
        </a>
      </div>
    </section>
  );
};

export default RoofingHero;
