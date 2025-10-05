
import React from 'react';
import { User } from '../types';
import { HistoryIcon } from './icons/HistoryIcon';
import { LogoutIcon } from './icons/LogoutIcon';

interface HeaderProps {
  user: User;
  onShowHistory: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onShowHistory, onLogout }) => {
  return (
    <header className="bg-[#FFFBEB] p-4 sm:p-6 rounded-b-3xl shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={user.avatarUrl} alt={user.name} className="h-12 w-12 rounded-full border-2 border-white shadow mr-4" />
          <div>
            <p className="text-sm text-gray-500">Bem-vindo(a),</p>
            <p className="font-bold text-lg text-[#3D4C3A]">{user.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={onShowHistory} className="flex items-center gap-2 text-gray-600 hover:text-[#3D4C3A] bg-white border border-gray-200 px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200">
                <HistoryIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Histórico</span>
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 text-gray-600 hover:text-[#3D4C3A] bg-white border border-gray-200 px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200">
                <LogoutIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Sair</span>
            </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto text-center sm:text-left mt-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3D4C3A]">
            App Caronas
          </h1>
          <h2 className="text-3xl sm:text-4xl font-light text-gray-600">
            / Mesmo Destino
          </h2>
      </div>
    </header>
  );
};

export default Header;
