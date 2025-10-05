
import React, { useState, useCallback } from 'react';
import { AppState, Trip, User } from './types';
import Header from './components/Header';
import RideSearchForm from './components/RideSearchForm';
import FindingRide from './components/FindingRide';
import RideDetails from './components/RideDetails';
import TripInProgress from './components/TripInProgress';
import TripComplete from './components/TripComplete';
import LoginScreen from './components/LoginScreen';
import HistoryScreen from './components/HistoryScreen';
import Dashboard from './components/Dashboard';
import { findRide as fetchRide } from './services/mockApi';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOGIN);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tripHistory, setTripHistory] = useState<Trip[]>([]);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [destination, setDestination] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const handleLogin = (name: string) => {
    setCurrentUser({
      id: `user-${Date.now()}`,
      name,
      avatarUrl: `https://i.pravatar.cc/150?u=${name}`
    });
    setAppState(AppState.DASHBOARD);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setTripHistory([]);
    setTrip(null);
    setDestination('');
    setError(null);
    setAppState(AppState.LOGIN);
  };
  
  const handleFindRide = () => {
    setAppState(AppState.SEARCHING);
  };

  const handleSearch = useCallback(async () => {
    if (!destination.trim()) {
      setError('Por favor, insira um destino.');
      return;
    }
    setError(null);
    setAppState(AppState.FINDING);
    try {
      const foundTrip = await fetchRide(destination);
      setTrip(foundTrip);
      setAppState(AppState.RIDE_FOUND);
    } catch (e) {
      setError('Não foi possível encontrar uma carona. Tente novamente mais tarde.');
      setAppState(AppState.SEARCHING);
    }
  }, [destination]);

  const handleConfirmRide = () => {
    setAppState(AppState.IN_PROGRESS);
  };

  const handleEndTrip = () => {
    if (trip) {
      setTripHistory(prev => [...prev, trip]);
    }
    setAppState(AppState.COMPLETED);
  };
  
  const handleReturnToDashboard = () => {
    setTrip(null);
    setDestination('');
    setError(null);
    setAppState(AppState.DASHBOARD);
  };

  const handleShowHistory = () => {
    setAppState(AppState.HISTORY);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.LOGIN:
        return <LoginScreen onLogin={handleLogin} />;
      case AppState.DASHBOARD:
        return currentUser && <Dashboard user={currentUser} onFindRide={handleFindRide} onShowHistory={handleShowHistory} />;
      case AppState.SEARCHING:
        return (
          <RideSearchForm
            destination={destination}
            setDestination={setDestination}
            onSearch={handleSearch}
            error={error}
          />
        );
      case AppState.FINDING:
        return <FindingRide />;
      case AppState.RIDE_FOUND:
        return trip && <RideDetails trip={trip} onConfirm={handleConfirmRide} onCancel={handleReturnToDashboard} />;
      case AppState.IN_PROGRESS:
        return trip && <TripInProgress trip={trip} onEndTrip={handleEndTrip} />;
      case AppState.COMPLETED:
        return trip && <TripComplete trip={trip} onNewSearch={handleReturnToDashboard} />;
      case AppState.HISTORY:
        return <HistoryScreen trips={tripHistory} onBack={handleReturnToDashboard} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="bg-[#FEFDF9] min-h-screen font-sans text-gray-800">
      {currentUser && <Header user={currentUser} onShowHistory={handleShowHistory} onLogout={handleLogout} />}
      <main className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-xs text-gray-400">
        <p>Feito por Carolina C dos Santos (Simulado)</p>
        <p>App Caronas / Mesmo Destino &copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;
