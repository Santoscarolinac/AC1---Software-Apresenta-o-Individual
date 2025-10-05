
import React from 'react';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';

interface RideSearchFormProps {
  destination: string;
  setDestination: (destination: string) => void;
  onSearch: () => void;
  error: string | null;
}

const RideSearchForm: React.FC<RideSearchFormProps> = ({ destination, setDestination, onSearch, error }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Para onde vamos?</h2>
      <p className="text-gray-500 mb-6">Informe seu destino para encontrar uma carona.</p>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LocationMarkerIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Digite o endereço de destino"
            className="w-full p-4 pl-10 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E8565] focus:border-[#6E8565] transition duration-200"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="w-full mt-4 bg-[#3D4C3A] text-white font-bold py-4 px-4 rounded-lg hover:bg-[#2c382a] transition-colors duration-300 text-lg shadow-md"
        >
          Buscar Carona
        </button>
      </form>
    </div>
  );
};

export default RideSearchForm;
