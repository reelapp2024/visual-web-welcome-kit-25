
import React from 'react';
import { Shield, Clock, Award, Users, CheckCircle, Wrench } from 'lucide-react';

const PlumbingWhyChooseUs = () => {
  const features = [
    {
      icon: <Clock className="w-12 h-12" />,
      title: "24/7 Emergency Service",
      description: "Round-the-clock emergency plumbing service when you need it most, day or night.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Licensed & Insured",
      description: "All our plumbers are fully licensed, bonded, and insured for your protection.",
      gradient: "from-cyan-500 to-cyan-600"
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "25+ Years Experience",
      description: "Over two decades of professional plumbing experience serving our community.",
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Expert Team",
      description: "Skilled, background-checked plumbers who treat your home with respect.",
      gradient: "from-cyan-600 to-blue-600"
    },
    {
      icon: <CheckCircle className="w-12 h-12" />,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all plumbing work with warranty coverage.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: "Modern Equipment",
      description: "Latest plumbing technology and tools for efficient, effective repairs.",
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <section className="py-20 bg-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Why Choose ProFlow Plumbing?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            When you choose us, you're choosing quality, reliability, and exceptional service 
            that's backed by years of experience and thousands of satisfied customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group h-full">
              <div className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 p-8 border border-gray-100 h-full flex flex-col">
                <div className={`bg-gradient-to-br ${feature.gradient} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 text-white shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex-shrink-0">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlumbingWhyChooseUs;
