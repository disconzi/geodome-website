import React from 'react';

const DomeCharacteristics = ({ characteristics }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="md:p-6 p-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
          Características Principais
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {characteristics.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-2 md:p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 mb-2 text-emerald-600">
                {item.icon}
              </div>
              <h4 className="text-sm md:text-base font-medium text-gray-900">
                {item.title}
              </h4>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DomeCharacteristics;
