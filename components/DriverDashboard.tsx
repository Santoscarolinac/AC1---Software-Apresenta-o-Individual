import React from 'react';
import { User } from '../types';
import { CarIcon } from './icons/CarIcon';
import { HistoryIcon } from './icons/HistoryIcon';
import { ClipboardListIcon } from './icons/ClipboardListIcon';
import { UserListIcon } from './icons/UserListIcon';

interface DriverDashboardProps {
  user: User;
  onOfferRide: () => void;
  onShowHistory: () => void;
  onShowRidesReport: () => void;
  onShowPassengerDashboard: () => void;
}

const DriverDashboard: React.FC<DriverDashboardProps> = ({ user, onOfferRide, onShowHistory, onShowRidesReport, onShowPassengerDashboard }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 mt-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800">Olá, Motorista {user.name.split(' ')[0]}!</h2>
      <p className="text-gray-600 mt-2 mb-8">Pronto para a sua próxima viagem?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          onClick={onOfferRide}
          className="group bg-green-50 p-6 rounded-lg border-2 border-green-200 hover:bg-green-100 hover:border-green-300 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <div className="flex items-center mb-2">
            <CarIcon className="h-8 w-8 text-green-600 mr-4" />
            <h3 className="text-xl font-bold text-green-800">Oferecer Carona</h3>
          </div>
          <p className="text-green-700">Defina seu destino e o número de assentos disponíveis.</p>
        </button>

        <button
          onClick={onShowPassengerDashboard}
          className="group bg-indigo-50 p-6 rounded-lg border-2 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <div className="flex items-center mb-2">
            <UserListIcon className="h-8 w-8 text-indigo-600 mr-4" />
            <h3 className="text-xl font-bold text-indigo-800">Painel de Passageiros</h3>
          </div>
          <p className="text-indigo-700">Veja todos os passageiros que estão procurando por caronas ativamente.</p>
        </button>

        <button
          onClick={onShowRidesReport}
          className="group bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <div className="flex items-center mb-2">
            <ClipboardListIcon className="h-8 w-8 text-yellow-600 mr-4" />
            <h3 className="text-xl font-bold text-yellow-800">Relatório de Caronas</h3>
          </div>
          <p className="text-yellow-700">Veja um relatório de todas as caronas que você já ofereceu.</p>
        </button>

        <button
          onClick={onShowHistory}
          className="group bg-blue-50 p-6 rounded-lg border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-blue-400 lg:col-span-3"
        >
          <div className="flex items-center mb-2">
            <HistoryIcon className="h-8 w-8 text-blue-600 mr-4" />
            <h3 className="text-xl font-bold text-blue-800">Histórico de Viagens Concluídas</h3>
          </div>
          <p className="text-blue-700">Revise os detalhes e os ganhos das suas viagens anteriores.</p>
        </button>
      </div>
    </div>
  );
};

export default DriverDashboard;