
import React from 'react';

const FindingRide: React.FC = () => {
  return (
    <div className="text-center p-12 bg-white rounded-2xl shadow-lg border border-gray-100 mt-8">
      <div className="flex justify-center items-center mb-4">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-[#3D4C3A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Buscando passageiros...</h2>
      <p className="text-gray-500 mt-2">Nossa busca inteligente está encontrando a melhor rota para você.</p>
    </div>
  );
};

export default FindingRide;
