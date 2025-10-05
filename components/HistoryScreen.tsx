
import React from 'react';
import { Trip } from '../types';
import { CarIcon } from './icons/CarIcon';

interface HistoryScreenProps {
  trips: Trip[];
  onBack: () => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ trips, onBack }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Histórico de Viagens</h2>
        <button onClick={onBack} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm">
          Voltar
        </button>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-12">
          <CarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Nenhuma viagem no histórico</h3>
          <p className="text-gray-500 mt-2">Complete sua primeira viagem para vê-la aqui.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {trips.map(trip => (
            <li key={trip.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div>
                  <p className="font-bold text-lg text-[#3D4C3A]">{trip.destination}</p>
                  <p className="text-sm text-gray-600">com {trip.driver.name}</p>
                   <p className="text-xs text-gray-400 mt-1">
                    {new Date(trip.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 text-left sm:text-right">
                    <p className="text-xl font-bold text-gray-800">R$ {trip.costPerPassenger.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
            </li>
          )).reverse()}
        </ul>
      )}
    </div>
  );
};

export default HistoryScreen;
