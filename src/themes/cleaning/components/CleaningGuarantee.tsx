
import React from 'react';
import { useGuaranteeData } from '../../../hooks/useGuaranteeData.js';
import DynamicFAIcon from '../../../extras/DynamicFAIcon.js';

const CleaningGuarantee = () => {
  const {
    guarantees,
    guaranteeText,
    promiseLine,
    projectCategory,
    isLoading
  } = useGuaranteeData();

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="bg-gray-200 h-12 w-64 mx-auto mb-6 rounded"></div>
              <div className="bg-gray-200 h-4 w-96 mx-auto rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl h-64"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            Our {projectCategory} Guarantee
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {guaranteeText}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 p-8 border border-gray-100">
                <div
                  className={`bg-gradient-to-br ${guarantee.gradient || 'from-gray-400 to-gray-600'
                    } rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-all duration-300`}
                >
                  <DynamicFAIcon iconClass={guarantee.iconClass || ''} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{guarantee.title}</h3>
                <p className="text-gray-600 leading-relaxed">{guarantee.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-xl p-8 shadow-xl max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Promise to You</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {promiseLine}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleaningGuarantee;
