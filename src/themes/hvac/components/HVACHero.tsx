
import React from 'react';
import { Phone, Clock, Thermometer, Wind, Shield, Award } from 'lucide-react';

const HVACHero = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-orange-600 via-red-600 to-orange-800 text-white overflow-hidden min-h-[700px] flex items-center font-poppins">
      {/* Geometric Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-lg rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-white/10 rounded-lg rotate-12 animate-bounce" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Icon Header */}
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm border border-white/30">
                <Thermometer className="w-8 h-8 text-orange-300" />
              </div>
              <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm border border-white/30">
                <Wind className="w-8 h-8 text-orange-300" />
              </div>
              <span className="text-orange-200 font-semibold text-lg">HVAC Experts</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Expert HVAC Services
              <span className="block text-orange-300 mt-2">You Can Trust</span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-orange-100 leading-relaxed">
              Professional heating, ventilation, and air conditioning services. 
              24/7 emergency repairs, installations, and maintenance for your comfort.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:5551234567"
                className="group bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl transform hover:scale-105"
              >
                <Phone size={24} className="group-hover:animate-pulse" />
                <span>Emergency: (555) 123-4567</span>
              </a>
              
              <a 
                href="/hvac/services"
                className="group bg-red-500/80 backdrop-blur-sm hover:bg-red-400 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 border border-white/30 transform hover:scale-105"
              >
                <Clock size={24} />
                <span>View Services</span>
              </a>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="bg-white/20 rounded-2xl p-4 mb-4 mx-auto w-fit">
                    <Shield className="w-8 h-8 text-orange-300" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-orange-200 text-sm">Emergency Service</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-2xl p-4 mb-4 mx-auto w-fit">
                    <Award className="w-8 h-8 text-orange-300" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">20+</div>
                  <div className="text-orange-200 text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-2xl p-4 mb-4 mx-auto w-fit">
                    <Thermometer className="w-8 h-8 text-orange-300" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-orange-200 text-sm">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-2xl p-4 mb-4 mx-auto w-fit">
                    <Wind className="w-8 h-8 text-orange-300" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">1000+</div>
                  <div className="text-orange-200 text-sm">Happy Customers</div>
                </div>
              </div>
            </div>
            
            {/* Emergency Call Box */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-6 shadow-2xl border border-white/20">
              <h3 className="text-xl font-bold mb-4 text-center">Need Emergency HVAC Repair?</h3>
              <p className="text-orange-100 text-center mb-4">24/7 emergency service available</p>
              <a 
                href="tel:5551234567"
                className="block w-full bg-white text-red-600 text-center py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Call Emergency Line
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HVACHero;
