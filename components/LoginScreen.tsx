
import React, { useState } from 'react';
import { UserIcon } from './icons/UserIcon';

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name);
    } else {
      setError('Por favor, insira seu nome para continuar.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mt-8 max-w-md mx-auto text-center">
      <img 
        src="https://storage.googleapis.com/gemini-prod-us-west1-assets/e8f70355403e2303_i3.png" 
        alt="Ilustração de um mapa com um pino de geolocalização" 
        className="rounded-xl shadow-md object-cover w-full h-48 mb-6"
      />
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo(a) ao App Caronas!</h2>
      <p className="text-gray-500 mb-6">Conectando você ao seu destino com segurança e economia.</p>
      <form onSubmit={handleSubmit}>
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
        {error && <p className="text-red-500 text-sm mt-2 text-left">{error}</p>}
        <button
          type="submit"
          className="w-full mt-4 bg-[#3D4C3A] text-white font-bold py-4 px-4 rounded-lg hover:bg-[#2c382a] transition-colors duration-300 text-lg shadow-md"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;