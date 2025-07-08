
import React from 'react';
import { Leaf, Shield, Clock, Award, Users, CheckCircle } from 'lucide-react';

const CleaningUSP = () => {
  const usps = [
    {
      icon: <Leaf className="w-10 h-10" />,
      title: "100% Eco-Friendly",
      description: "Safe, non-toxic cleaning products that protect your family, pets, and the environment.",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: <Clock className="w-10 h-10" />,
      title: "Same-Day Service",
      description: "Need cleaning today? We offer flexible scheduling with same-day booking available.",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Bonded & Insured",
      description: "Complete protection for your property with fully insured and background-checked staff.",
      gradient: "from-green-600 to-emerald-500"
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee - if you're not happy, we'll make it right at no charge.",
      gradient: "from-emerald-600 to-green-600"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Trained Professionals",
      description: "Experienced, uniformed cleaning professionals who treat your space with respect.",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      title: "Consistent Results",
      description: "Reliable, consistent cleaning results every time with detailed quality checklists.",
      gradient: "from-emerald-500 to-green-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            What Makes Us Different
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our unique advantages that set us apart from other cleaning services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {usps.map((usp, index) => (
            <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 border border-gray-100 h-full flex flex-col">
              <div className={`bg-gradient-to-br ${usp.gradient} rounded-2xl w-20 h-20 flex items-center justify-center mb-6 text-white shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0`}>
                {usp.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex-shrink-0">{usp.title}</h3>
              <p className="text-gray-600 leading-relaxed flex-grow">{usp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CleaningUSP;
