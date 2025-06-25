
import React from 'react';
import { Thermometer } from 'lucide-react';

const HVACLoader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Thermometer className="w-8 h-8 text-white animate-spin" />
          </div>
          <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto animate-ping opacity-75"></div>
        </div>
        <p className="text-xl font-semibold text-gray-700 mt-4">Loading</p>
        <div className="flex space-x-1 justify-center mt-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default HVACLoader;
