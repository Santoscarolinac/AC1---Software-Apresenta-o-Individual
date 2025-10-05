
import React from 'react';
import { User } from '../types';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';
import { HistoryIcon } from './icons/HistoryIcon';

interface DashboardProps {
  user: User;
  onFindRide: () => void;
  onShowHistory: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onFindRide, onShowHistory }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 mt-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800">Olá, {user.name.split(' ')[0]}!</h2>
      <p className="text-gray-600 mt-2 mb-8">O que você gostaria de fazer hoje?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Find Ride Card */}
        <button
          onClick={onFindRide}
          className="group bg-green-50 p-6 rounded-lg border-2 border-green-200 hover:bg-green-100 hover:border-green-300 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <div className="flex items-center mb-2">
            <LocationMarkerIcon className="h-8 w-8 text-green-600 mr-4" />
            <h3 className="text-xl font-bold text-green-800">Procurar uma Carona</h3>
          </div>
          <p className="text-green-700">Encontre motoristas e passageiros indo para o mesmo destino que você.</p>
        </button>

        {/* History Card */}
        <button
          onClick={onShowHistory}
          className="group bg-blue-50 p-6 rounded-lg border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <div className="flex items-center mb-2">
            <HistoryIcon className="h-8 w-8 text-blue-600 mr-4" />
            <h3 className="text-xl font-bold text-blue-800">Ver Histórico</h3>
          </div>
          <p className="text-blue-700">Revise os detalhes das suas viagens anteriores e suas avaliações.</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
