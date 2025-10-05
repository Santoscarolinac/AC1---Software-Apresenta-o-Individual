import { Trip, Driver, Vehicle, User } from '../types';

export const findRide = async (destination: string): Promise<Trip> => {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 2500));

  const mockDriver: Driver = {
    id: 'driver-01',
    name: 'Ricardo',
    avatarUrl: 'https://picsum.photos/id/1005/100/100',
    rating: 4.9,
    totalTrips: 124,
  };

  const mockVehicle: Vehicle = {
    make: 'Honda',
    model: 'Civic',
    color: 'Cinza',
    licensePlate: 'BRA-2E19',
  };

  const mockPassengers: User[] = [
    { id: 'pass-01', name: 'Juliana', avatarUrl: 'https://picsum.photos/id/1011/100/100' },
    { id: 'pass-02', name: 'Marcos', avatarUrl: 'https://picsum.photos/id/1025/100/100' },
  ];

  const totalCost = Math.floor(Math.random() * (70 - 40 + 1) + 40);
  const costPerPassenger = totalCost / (mockPassengers.length + 1);

  return {
    id: `trip-${Date.now()}`,
    origin: 'Centro da Cidade',
    destination,
    date: new Date().toISOString(),
    driver: mockDriver,
    vehicle: mockVehicle,
    passengers: mockPassengers,
    costPerPassenger: parseFloat(costPerPassenger.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2)),
    pickupCode: `ID-${Math.floor(Math.random() * 9000) + 1000}`,
    estimatedDurationMinutes: Math.floor(Math.random() * (45 - 15 + 1) + 15), // e.g., 15 to 45 minutes
  };
};