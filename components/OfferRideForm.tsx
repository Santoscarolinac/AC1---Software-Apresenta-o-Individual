
import React, { useState } from 'react';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';
import { UsersIcon } from './icons/UsersIcon';

interface OfferRideFormProps {
  onSubmit: (destination: string, capacity: number) => void;
  onCancel: () => void;
}

const OfferRideForm: React.FC<OfferRideFormProps> = ({ onSubmit, onCancel }) => {
  const [destination, setDestination] = useState('');
  const [capacity, setCapacity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination.trim() && capacity > 0) {
      onSubmit(destination, capacity);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Oferecer Carona</h2>
      <p className="text-gray-500 mb-6">Informe os detalhes da viagem que você está planejando.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LocationMarkerIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Digite o endereço de destino"
            className="w-full p-4 pl-10 text-lg border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UsersIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value, 10))}
            placeholder="Lugares disponíveis"
            min="1"
            max="6"
            className="w-full p-4 pl-10 text-lg border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
            type="submit"
            className="w-full bg-[#3D4C3A] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#2c382a] transition-colors duration-300 text-lg shadow-md"
            >
            Publicar Carona
            </button>
            <button type="button" onClick={onCancel} className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-lg">
                Cancelar
            </button>
        </div>
      </form>
    </div>
  );
};

export default OfferRideForm;
