
import React from 'react';
import { UserRole } from '../types';
import { UserIcon } from './icons/UserIcon';
import { CarIcon } from './icons/CarIcon';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 mt-8 animate-fade-in text-center">
      <h2 className="text-3xl font-bold text-gray-800">Quase lá!</h2>
      <p className="text-gray-600 mt-2 mb-8">Como você gostaria de usar o aplicativo principalmente?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => onSelectRole(UserRole.PASSENGER)}
          className="group bg-blue-50 p-6 rounded-lg border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <div className="flex items-center mb-2">
            <UserIcon className="h-8 w-8 text-blue-600 mr-4" />
            <h3 className="text-xl font-bold text-blue-800">Sou Passageiro</h3>
          </div>
          <p className="text-blue-700">Quero encontrar caronas seguras e econômicas para o meu destino.</p>
        </button>

        <button
          onClick={() => onSelectRole(UserRole.DRIVER)}
          className="group bg-green-50 p-6 rounded-lg border-2 border-green-200 hover:bg-green-100 hover:border-green-300 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <div className="flex items-center mb-2">
            <CarIcon className="h-8 w-8 text-green-600 mr-4" />
            <h3 className="text-xl font-bold text-green-800">Sou Motorista</h3>
          </div>
          <p className="text-green-700">Quero oferecer caronas, compartilhar despesas e otimizar minhas viagens.</p>
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-8">Você poderá alternar entre os perfis depois, se desejar (funcionalidade futura).</p>
    </div>
  );
};

export default RoleSelection;
