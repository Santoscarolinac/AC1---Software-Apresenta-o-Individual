import React, { useState } from 'react';
import { UserIcon } from './icons/UserIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface LoginScreenProps {
  onLoginOrRegister: (name: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginOrRegister }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLoginOrRegister(name);
    } else {
      setError('Por favor, insira seu nome para continuar.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mt-8 max-w-md mx-auto text-center">
      <img 
        src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop" 
        alt="Carro em uma rodovia, simbolizando uma viagem de carona" 
        className="rounded-xl shadow-md object-cover w-full h-48 mb-6"
      />
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo(a)!</h2>
      <p className="text-gray-500 mb-6">Entre ou cadastre-se para começar.</p>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                    }}
                    placeholder="Qual é o seu nome?"
                    className="w-full p-4 pl-10 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E8565] focus:border-[#6E8565] transition duration-200"
                    aria-label="Seu nome"
                />
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha (simulada)"
                    className="w-full p-4 pl-10 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E8565] focus:border-[#6E8565] transition duration-200"
                    aria-label="Sua senha"
                />
            </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-2 text-left">{error}</p>}
        <button
          type="submit"
          className="w-full mt-4 bg-[#3D4C3A] text-white font-bold py-4 px-4 rounded-lg hover:bg-[#2c382a] transition-colors duration-300 text-lg shadow-md"
        >
          Entrar ou Cadastrar
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;