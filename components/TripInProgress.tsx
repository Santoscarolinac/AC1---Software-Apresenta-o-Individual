import React, { useState, useEffect, useRef } from 'react';
import { Trip } from '../types';
import { generateTripSummary } from '../services/geminiService';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { ClockIcon } from './icons/ClockIcon';

interface TripInProgressProps {
  trip: Trip;
  onEndTrip: () => void;
}

const TripInProgress: React.FC<TripInProgressProps> = ({ trip, onEndTrip }) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(trip.estimatedDurationMinutes);
  const [summary, setSummary] = useState<string>('Gerando resumo da viagem e dicas de segurança com IA...');
  const [loadingSummary, setLoadingSummary] = useState(true);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const result = await generateTripSummary(trip);
        setSummary(result);
      } catch (error) {
        console.error(error);
        setSummary("Não foi possível carregar o resumo. Tenha uma ótima viagem!");
      } finally {
        setLoadingSummary(false);
      }
    };

    fetchSummary();
  }, [trip]);

  useEffect(() => {
    if (progress < 100) {
      const timer = setInterval(() => {
        setProgress(prev => {
            const newProgress = Math.min(prev + 1, 100);
            const newTimeLeft = Math.ceil(trip.estimatedDurationMinutes * (1 - (newProgress / 100)));
            setTimeLeft(newTimeLeft);
            return newProgress;
        });
      }, 500);
      return () => clearInterval(timer);
    } else {
      const endTimer = setTimeout(() => {
        onEndTrip();
      }, 1000);
      return () => clearTimeout(endTimer);
    }
  }, [progress, onEndTrip, trip.estimatedDurationMinutes]);

  const strokeDashoffset = pathLength - (pathLength * progress) / 100;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Viagem em progresso para:</h2>
      <p className="text-lg text-[#3D4C3A] font-semibold mb-6">{trip.destination}</p>
      
      {/* Map and ETA */}
      <div className="mb-6">
        <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-md border">
           <img 
              src="https://storage.googleapis.com/gemini-prod-us-west1-assets/53239a543b5f7e7f_i1.png" 
              alt="Map of a city route"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 180" preserveAspectRatio="none">
                {/* Full route path (background) */}
                <path
                    ref={pathRef}
                    d="M20 130 Q60 80 100 90 T180 80 T240 120 T300 110"
                    fill="none"
                    stroke="#A9A9A9"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="8 8"
                />
                {/* Progress path */}
                 <path
                    d="M20 130 Q60 80 100 90 T180 80 T240 120 T300 110"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={pathLength}
                    strokeDashoffset={strokeDashoffset}
                    style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                />
            </svg>
        </div>
      </div>
       
      {/* Progress Bar and Time */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700">Progresso</span>
            <div className="flex items-center text-sm text-gray-600 font-medium">
                <ClockIcon className="h-4 w-4 mr-1.5" />
                <span>Tempo restante: ~{timeLeft} min</span>
            </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-600 h-2.5 rounded-full transition-all duration-500 ease-linear" style={{ width: `${progress}%` }}></div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verification Code */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center h-full flex flex-col justify-center">
          <h3 className="font-bold text-lg mb-2 flex items-center justify-center"><ShieldCheckIcon className="h-5 w-5 mr-2 text-blue-500" /> Código de Verificação</h3>
          <p className="text-4xl font-mono tracking-widest text-blue-800 bg-white p-3 rounded-lg">{trip.pickupCode}</p>
          <p className="text-xs text-gray-500 mt-2">Mostre este código ao motorista ({trip.driver.name}).</p>
        </div>

        {/* Gemini Summary */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="font-bold text-lg mb-2">Resumo e Dicas (IA)</h3>
          {loadingSummary ? (
            <div className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-purple-600" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600">Gerando...</span>
            </div>
          ) : (
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{summary}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripInProgress;