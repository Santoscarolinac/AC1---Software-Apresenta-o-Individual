
import React, { useState, useCallback, useEffect } from 'react';
import { AppState, Trip, User, UserRole, Vehicle, OfferedRide, PassengerRequest } from './types';
import Header from './components/Header';
import RideSearchForm from './components/RideSearchForm';
import FindingRide from './components/FindingRide';
import RideDetails from './components/RideDetails';
import TripInProgress from './components/TripInProgress';
import TripComplete from './components/TripComplete';
import LoginScreen from './components/LoginScreen';
import HistoryScreen from './components/HistoryScreen';
import Dashboard from './components/Dashboard';
import { findRide as fetchRide, getPassengerRequests } from './services/mockApi';
import RoleSelection from './components/RoleSelection';
import DriverVehicleForm from './components/DriverVehicleForm';
import DriverDashboard from './components/DriverDashboard';
import OfferRideForm from './components/OfferRideForm';
import OfferedRidesReport from './components/OfferedRidesReport';
import PassengerRequestsDashboard from './components/PassengerRequestsDashboard';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOGIN);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tripHistory, setTripHistory] = useState<Trip[]>([]);
  const [offeredRides, setOfferedRides] = useState<OfferedRide[]>([]);
  const [passengerRequests, setPassengerRequests] = useState<PassengerRequest[]>([]);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [destination, setDestination] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Load passenger requests on app start to populate the dashboard
    const loadPassengerRequests = async () => {
      const requests = await getPassengerRequests();
      setPassengerRequests(requests);
    };
    loadPassengerRequests();
  }, []);

  const handleRegister = (name: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      avatarUrl: `https://i.pravatar.cc/150?u=${name}`
    };
    setUsers(prev => ({ ...prev, [newUser.id]: newUser }));
    setCurrentUser(newUser);
    setAppState(AppState.ROLE_SELECTION);
  };

  const handleSelectRole = (role: UserRole) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, role };
    setUsers(prev => ({...prev, [currentUser.id]: updatedUser}));
    setCurrentUser(updatedUser);

    if (role === UserRole.DRIVER) {
      setAppState(AppState.DRIVER_REGISTRATION);
    } else {
      setAppState(AppState.DASHBOARD);
    }
  };
  
  const handleRegisterVehicle = (vehicle: Vehicle) => {
      if (!currentUser) return;
      const updatedUser = { ...currentUser, vehicle };
      setUsers(prev => ({...prev, [currentUser.id]: updatedUser}));
      setCurrentUser(updatedUser);
      setAppState(AppState.DRIVER_DASHBOARD);
  };
  
  const handleOfferRide = (destination: string, capacity: number) => {
    if (!currentUser) return;
    const newOfferedRide: OfferedRide = {
      id: `offer-${Date.now()}`,
      driverId: currentUser.id,
      destination,
      capacity,
      date: new Date().toISOString(),
    };
    setOfferedRides(prev => [...prev, newOfferedRide]);
    alert('Sua oferta de carona foi publicada com sucesso!');
    setAppState(AppState.DRIVER_DASHBOARD);
  };
  
  const handleLogin = (name: string) => {
    // This is a simplified login for demo purposes.
    // FIX: Switched from Object.values to Object.keys().map() for better type inference,
    // which resolves an issue where `existingUser` was inferred as `unknown`.
    const existingUser = Object.keys(users).map(k => users[k]).find(u => u.name.toLowerCase() === name.toLowerCase());
    if (existingUser) {
        setCurrentUser(existingUser);
        if (existingUser.role === UserRole.DRIVER) {
            setAppState(AppState.DRIVER_DASHBOARD);
        } else {
            setAppState(AppState.DASHBOARD);
        }
    } else {
        handleRegister(name);
    }
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
    const returnState = currentUser?.role === UserRole.DRIVER ? AppState.DRIVER_DASHBOARD : AppState.DASHBOARD;
    setAppState(AppState.COMPLETED);
  };
  
  const handleReturnToDashboard = () => {
    setTrip(null);
    setDestination('');
    setError(null);
    const dashboardState = currentUser?.role === UserRole.DRIVER ? AppState.DRIVER_DASHBOARD : AppState.DASHBOARD;
    setAppState(dashboardState);
  };

  const handleShowHistory = () => {
    setAppState(AppState.HISTORY);
  };

  const handleShowRidesReport = () => {
    setAppState(AppState.DRIVER_RIDES_REPORT);
  };

  const handleShowPassengerDashboard = () => {
    setAppState(AppState.DRIVER_PASSENGER_DASHBOARD);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.LOGIN:
        return <LoginScreen onLoginOrRegister={handleLogin} />;
      case AppState.ROLE_SELECTION:
        return <RoleSelection onSelectRole={handleSelectRole} />;
      case AppState.DRIVER_REGISTRATION:
        return <DriverVehicleForm onSubmit={handleRegisterVehicle} />;
      case AppState.DASHBOARD:
        return currentUser && <Dashboard user={currentUser} onFindRide={handleFindRide} onShowHistory={handleShowHistory} />;
      case AppState.DRIVER_DASHBOARD:
        return currentUser && <DriverDashboard user={currentUser} onOfferRide={() => setAppState(AppState.OFFER_RIDE)} onShowHistory={handleShowHistory} onShowRidesReport={handleShowRidesReport} onShowPassengerDashboard={handleShowPassengerDashboard} />;
      case AppState.OFFER_RIDE:
        return <OfferRideForm onSubmit={handleOfferRide} onCancel={handleReturnToDashboard} />;
      case AppState.DRIVER_RIDES_REPORT:
        return currentUser && <OfferedRidesReport rides={offeredRides.filter(r => r.driverId === currentUser.id)} onBack={handleReturnToDashboard} />;
      case AppState.DRIVER_PASSENGER_DASHBOARD:
        return <PassengerRequestsDashboard requests={passengerRequests} onBack={handleReturnToDashboard} />;
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
        return <LoginScreen onLoginOrRegister={handleLogin} />;
    }
  };

  return (
    <div className="bg-[#FEFDF9] min-h-screen font-sans text-gray-800">
      {currentUser && appState !== AppState.LOGIN && appState !== AppState.ROLE_SELECTION && appState !== AppState.DRIVER_REGISTRATION && <Header user={currentUser} onShowHistory={handleShowHistory} onLogout={handleLogout} />}
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