export enum UserRole {
  PASSENGER,
  DRIVER,
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  role?: UserRole;
  vehicle?: Vehicle;
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
  capacity: number;
}

export interface OfferedRide {
    id: string;
    driverId: string;
    destination: string;
    capacity: number;
    date: string;
}

export interface PassengerRequest {
  id: string;
  passenger: User;
  destination: string;
  date: string;
}

export enum AppState {
  LOGIN,
  ROLE_SELECTION,
  DRIVER_REGISTRATION,
  DASHBOARD,
  DRIVER_DASHBOARD,
  OFFER_RIDE,
  DRIVER_RIDES_REPORT,
  SEARCHING,
  FINDING,
  RIDE_FOUND,
  IN_PROGRESS,
  COMPLETED,
  HISTORY,
  DRIVER_PASSENGER_DASHBOARD,
}