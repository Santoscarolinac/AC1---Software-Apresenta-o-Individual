import React from 'react';
import { PassengerRequest } from '../types';
import { UserIcon } from './icons/UserIcon';

interface PassengerRequestsDashboardProps {
  requests: PassengerRequest[];
  onBack: () => void;
}

const PassengerRequestsDashboard: React.FC<PassengerRequestsDashboardProps> = ({ requests, onBack }) => {
  const handleOfferRide = (passengerName: string) => {
    alert(`Convite de carona enviado para ${passengerName}! (Simulado)`);
  };

  const timeSince = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " anos atrás";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " meses atrás";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " dias atrás";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " horas atrás";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutos atrás";
    return Math.floor(seconds) + " segundos atrás";
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Passageiros Procurando Carona</h2>
        <button onClick={onBack} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm">
          Voltar
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <UserIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Nenhum passageiro no momento</h3>
          <p className="text-gray-500 mt-2">Volte mais tarde para ver novas solicitações de carona.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {requests.map(req => (
            <li key={req.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div className="flex items-center mb-3 sm:mb-0">
                  <img src={req.passenger.avatarUrl} alt={req.passenger.name} className="h-12 w-12 rounded-full mr-4"/>
                  <div>
                    <p className="font-bold text-lg text-gray-800">{req.passenger.name}</p>
                    <p className="text-sm text-gray-600">Destino: <span className="font-semibold text-[#3D4C3A]">{req.destination}</span></p>
                    <p className="text-xs text-gray-400 mt-1">
                      Procurando há: {timeSince(req.date)}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 text-left sm:text-right">
                    <button 
                      onClick={() => handleOfferRide(req.passenger.name)}
                      className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 text-sm shadow">
                      Oferecer Carona
                    </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PassengerRequestsDashboard;