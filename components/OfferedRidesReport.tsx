
import React from 'react';
import { OfferedRide } from '../types';
import { CarIcon } from './icons/CarIcon';
import { UsersIcon } from './icons/UsersIcon';

interface OfferedRidesReportProps {
  rides: OfferedRide[];
  onBack: () => void;
}

const OfferedRidesReport: React.FC<OfferedRidesReportProps> = ({ rides, onBack }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Relatório de Caronas Oferecidas</h2>
        <button onClick={onBack} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm">
          Voltar
        </button>
      </div>

      {rides.length === 0 ? (
        <div className="text-center py-12">
          <CarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Nenhuma carona oferecida</h3>
          <p className="text-gray-500 mt-2">Ofereça sua primeira carona para vê-la aqui no relatório.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {rides.map(ride => (
            <li key={ride.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div>
                  <p className="font-bold text-lg text-[#3D4C3A]">{ride.destination}</p>
                   <p className="text-xs text-gray-400 mt-1">
                    Oferecida em: {new Date(ride.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 text-left sm:text-right">
                    <div className="flex items-center justify-end text-lg font-bold text-gray-800 bg-gray-200 px-3 py-1 rounded-full">
                        <UsersIcon className="h-5 w-5 mr-2" />
                        <span>{ride.capacity} {ride.capacity > 1 ? 'lugares' : 'lugar'}</span>
                    </div>
                </div>
              </div>
            </li>
          )).reverse()}
        </ul>
      )}
    </div>
  );
};

export default OfferedRidesReport;
