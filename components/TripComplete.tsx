
import React, { useState } from 'react';
import { Trip } from '../types';
import { StarIcon } from './icons/StarIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface TripCompleteProps {
  trip: Trip;
  onNewSearch: () => void;
}

const TripComplete: React.FC<TripCompleteProps> = ({ trip, onNewSearch }) => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (rate: number) => {
    if (!submitted) {
      setRating(rate);
    }
  };

  const handleSubmit = () => {
    if(rating > 0){
        setSubmitted(true);
    }
  };

  return (
    <div className="bg-white text-center p-8 rounded-2xl shadow-lg border border-gray-100 mt-8 animate-fade-in">
      <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-3xl font-bold text-gray-800">Viagem Concluída!</h2>
      <p className="text-gray-600 mt-2 mb-6">Você chegou ao seu destino: {trip.destination}.</p>

      <div className="bg-gray-50 p-6 rounded-lg border max-w-md mx-auto">
        <h3 className="text-xl font-semibold mb-4">Avalie sua viagem com {trip.driver.name}</h3>
        {submitted ? (
             <p className="text-green-700 font-semibold">Obrigado pela sua avaliação!</p>
        ) : (
            <>
                <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => handleRating(star)} className="focus:outline-none">
                    <StarIcon
                        className={`h-10 w-10 cursor-pointer ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    />
                    </button>
                ))}
                </div>
                <button 
                    onClick={handleSubmit}
                    disabled={rating === 0}
                    className="w-full bg-[#3D4C3A] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#2c382a] transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    Enviar Avaliação
                </button>
            </>
        )}
      </div>

      <button
        onClick={onNewSearch}
        className="mt-8 bg-gray-800 text-white font-bold py-4 px-6 rounded-lg hover:bg-black transition-colors duration-300 text-lg shadow-md"
      >
        Procurar Nova Carona
      </button>
    </div>
  );
};

export default TripComplete;
