
import React from 'react';
import { Heart, Users, Leaf, Award, Clock, Shield } from 'lucide-react';

const CleaningValues = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Customer First",
      description: "Your satisfaction is our top priority. We listen to your needs and exceed your expectations with every service.",
      color: "text-green-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Professional Team",
      description: "Our trained and experienced cleaning professionals are background-checked, insured, and committed to excellence.",
      color: "text-emerald-600"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Eco-Friendly",
      description: "We use environmentally safe, non-toxic cleaning products that are safe for your family, pets, and the planet.",
      color: "text-green-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Standards",
      description: "We maintain the highest standards of cleanliness and quality control in every job we undertake.",
      color: "text-emerald-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Reliability",
      description: "Count on us to arrive on time and complete your cleaning service efficiently and thoroughly.",
      color: "text-green-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trust & Safety",
      description: "We are fully licensed, bonded, and insured, giving you complete peace of mind with every service.",
      color: "text-emerald-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            Our Core Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            These fundamental principles guide everything we do and define who we are as a cleaning service provider.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100 h-full flex flex-col">
              <div className={`${value.color} mb-6 flex justify-center flex-shrink-0`}>
                <div className="bg-gray-50 rounded-full p-4">
                  {value.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center flex-shrink-0">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed text-center flex-grow">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment to Excellence</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              At our core, we believe that a clean environment contributes to better health, increased productivity, 
              and overall well-being. This belief drives us to continuously improve our services, invest in our team's 
              training, and adopt the latest cleaning technologies and methods.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We don't just clean spaces; we create healthier environments where families can thrive and businesses 
              can prosper. Every job we complete is a testament to our dedication to quality and our commitment to 
              making a positive difference in our clients' lives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleaningValues;
