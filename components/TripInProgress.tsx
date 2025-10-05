import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trip } from '../types';
import { generateTripSummary } from '../services/geminiService';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { ClockIcon } from './icons/ClockIcon';

declare global {
    interface Window {
        initMap?: () => void;
        google?: any;
    }
}

interface TripInProgressProps {
  trip: Trip;
  onEndTrip: () => void;
}

const TripInProgress: React.FC<TripInProgressProps> = ({ trip, onEndTrip }) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(trip.estimatedDurationMinutes);
  const [summary, setSummary] = useState<string>('Gerando resumo da viagem e dicas de segurança com IA...');
  const [loadingSummary, setLoadingSummary] = useState(true);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState(false);
  const [isMapScriptLoaded, setMapScriptLoaded] = useState(!!window.google?.maps);


  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const result = await generateTripSummary(trip);
        setSummary(result);
      } catch (error)
      {
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
      const durationInMs = trip.estimatedDurationMinutes * 60 * 1000;
      const interval = 500;
      const increment = (interval / durationInMs) * 100;
      
      const timer = setInterval(() => {
        setProgress(prev => {
            const newProgress = Math.min(prev + increment, 100);
            if (newProgress < 100) {
              const newTimeLeft = Math.ceil(trip.estimatedDurationMinutes * (1 - (newProgress / 100)));
              setTimeLeft(newTimeLeft);
            } else {
              setTimeLeft(0);
            }
            return newProgress;
        });
      }, interval);
      return () => clearInterval(timer);
    } else {
      const endTimer = setTimeout(() => {
        onEndTrip();
      }, 1000);
      return () => clearTimeout(endTimer);
    }
  }, [progress, onEndTrip, trip.estimatedDurationMinutes]);

  const initMap = useCallback(() => {
    if (!mapRef.current || !window.google?.maps) return;

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    const map = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: { lat: -23.55052, lng: -46.633308 }, // São Paulo
        disableDefaultUI: true,
    });
    directionsRenderer.setMap(map);

    directionsService.route(
        {
            origin: trip.origin,
            destination: trip.destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result: any, status: any) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
            } else {
                console.error(`Directions request failed due to ${status}`);
                setMapError(true);
            }
        }
    );
  }, [trip.origin, trip.destination]);

  useEffect(() => {
    if (isMapScriptLoaded) {
        initMap();
        return;
    }

    const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;

    if (!apiKey || apiKey === 'YOUR_API_KEY') {
        console.error("Google Maps API key is not configured.");
        setMapError(true);
        return;
    }

    const scriptId = "google-maps-script";
    if (document.getElementById(scriptId)) {
        return;
    }

    window.initMap = () => {
        setMapScriptLoaded(true);
    };

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
        console.error("Google Maps script failed to load.");
        setMapError(true);
    };
    document.head.appendChild(script);
    
    return () => {
      if (window.initMap) {
        delete window.initMap;
      }
    }
  }, [isMapScriptLoaded, initMap]);


  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Viagem em progresso para:</h2>
      <p className="text-lg text-[#3D4C3A] font-semibold mb-6">{trip.destination}</p>
      
      {/* Map and ETA */}
      <div className="mb-6">
        <div ref={mapRef} className="relative aspect-video w-full rounded-xl overflow-hidden shadow-md border bg-gray-200">
           {!isMapScriptLoaded && !mapError && (
             <div className="flex items-center justify-center h-full text-center text-gray-600">
                <p>Carregando mapa...</p>
             </div>
           )}
           {mapError && (
             <div className="flex items-center justify-center h-full text-center text-gray-600 px-4">
                <p>Não foi possível carregar o mapa.<br/>Isso pode ser devido a uma chave de API inválida ou restrições de endereço.</p>
             </div>
           )}
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
