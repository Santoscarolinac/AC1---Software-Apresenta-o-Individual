
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Driver extends User {
  rating: number;
  totalTrips: number;
}

export interface Vehicle {
  make: string;
  model: string;
  color: string;
  licensePlate: string;
}

export interface Trip {
  id: string;
  origin: string;
  destination: string;
  date: string;
  driver: Driver;
  vehicle: Vehicle;
  passengers: User[];
  costPerPassenger: number;
  totalCost: number;
  pickupCode: string;
  estimatedDurationMinutes: number;
}

export enum AppState {
  LOGIN,
  DASHBOARD,
  SEARCHING,
  FINDING,
  RIDE_FOUND,
  IN_PROGRESS,
  COMPLETED,
  HISTORY,
}
