import React, { useState } from 'react';
import { Trip } from '../types';
import { UserIcon } from './icons/UserIcon';
import { CarIcon } from './icons/CarIcon';
import { StarIcon } from './icons/StarIcon';
import { CreditCardIcon } from './icons/CreditCardIcon';
import { CashIcon } from './icons/CashIcon';
import { PixIcon } from './icons/PixIcon';

interface RideDetailsProps {
  trip: Trip;
  onConfirm: () => void;
  onCancel: () => void;
}

const RideDetails: React.FC<RideDetailsProps> = ({ trip, onConfirm, onCancel }) => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const paymentOptions = [
    { id: 'credit', name: 'Crédito', Icon: CreditCardIcon },
    { id: 'debit', name: 'Débito', Icon: CreditCardIcon },
    { id: 'pix', name: 'PIX', Icon: PixIcon },
    { id: 'cash', name: 'Dinheiro', Icon: CashIcon },
  ];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Carona Encontrada!</h2>
      
      {/* Driver and Vehicle Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Driver Card */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-bold text-lg mb-2 flex items-center"><UserIcon className="h-5 w-5 mr-2 text-gray-500" /> Motorista</h3>
          <div className="flex items-center">
            <img src={trip.driver.avatarUrl} alt={trip.driver.name} className="h-16 w-16 rounded-full mr-4 border-2 border-white shadow" />
            <div>
              <p className="font-semibold text-xl">{trip.driver.name}</p>
              <div className="flex items-center text-sm text-gray-600">
                <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                <span>{trip.driver.rating} ({trip.driver.totalTrips} viagens)</span>
              </div>
            </div>
          </div>
        </div>
        {/* Vehicle Card */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-bold text-lg mb-2 flex items-center"><CarIcon className="h-5 w-5 mr-2 text-gray-500" /> Veículo</h3>
          <p className="font-semibold text-xl">{trip.vehicle.make} {trip.vehicle.model}</p>
          <p className="text-gray-600">Cor: {trip.vehicle.color}</p>
          <p className="text-gray-600">Placa: {trip.vehicle.licensePlate}</p>
        </div>
      </div>

      {/* Passengers */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">Outros Passageiros</h3>
        <div className="flex space-x-2">
          {trip.passengers.map(p => (
            <div key={p.id} className="text-center">
              <img src={p.avatarUrl} alt={p.name} title={p.name} className="h-12 w-12 rounded-full border-2 border-white shadow" />
              <p className="text-xs mt-1 text-gray-500">{p.name.split(' ')[0]}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Payment */}
      <div className="bg-[#FFFBEB] p-4 rounded-lg border border-yellow-200">
         <h3 className="font-bold text-lg mb-2">Cálculo e Pagamento</h3>
         <div className="flex justify-between items-center">
            <p className="text-gray-600">Sua parte do trajeto:</p>
            <p className="text-2xl font-bold text-[#3D4C3A]">R$ {trip.costPerPassenger.toFixed(2).replace('.', ',')}</p>
         </div>
         <p className="text-xs text-gray-500 mt-2">Pagamento seguro processado via Mercado Pago (simulado).</p>
      </div>

      {/* Payment Method */}
      <div className="mt-6">
        <h3 className="font-bold text-lg mb-3">Forma de Pagamento</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {paymentOptions.map(({ id, name, Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedPayment(id)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ${
                selectedPayment === id
                  ? 'border-[#3D4C3A] bg-[#F7F9F6] shadow-inner'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <Icon className={`h-8 w-8 mb-1 ${selectedPayment === id ? 'text-[#3D4C3A]' : 'text-gray-500'}`} />
              <span className={`text-sm font-semibold ${selectedPayment === id ? 'text-[#3D4C3A]' : 'text-gray-600'}`}>{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={onConfirm}
          disabled={!selectedPayment}
          className="w-full bg-[#3D4C3A] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#2c382a] transition-colors duration-300 text-lg shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {selectedPayment === 'cash' ? 'Confirmar Carona' : 'Confirmar e Pagar'}
        </button>
        <button onClick={onCancel} className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-lg">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default RideDetails;
