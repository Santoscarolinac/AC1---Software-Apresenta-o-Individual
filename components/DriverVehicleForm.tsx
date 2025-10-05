
import React, { useState } from 'react';
import { Vehicle } from '../types';
import { CarIcon } from './icons/CarIcon';

interface DriverVehicleFormProps {
  onSubmit: (vehicle: Vehicle) => void;
}

const DriverVehicleForm: React.FC<DriverVehicleFormProps> = ({ onSubmit }) => {
  const [vehicle, setVehicle] = useState<Vehicle>({
    make: '',
    model: '',
    color: '',
    licensePlate: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [licensePlateError, setLicensePlateError] = useState<string | null>(null);


  const validateLicensePlate = (plate: string): boolean => {
    // Regex for old format (AAA-1234) and Mercosul format (ABC1D23)
    const licensePlateRegex = /^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;
    return licensePlateRegex.test(plate);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'licensePlate') {
      setLicensePlateError(null); // Clear error on change
      setVehicle({ ...vehicle, [name]: value.toUpperCase() });
    } else {
      setVehicle({ ...vehicle, [name]: value });
    }
    setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    // FIX: Explicitly type `v` as `string` to allow calling `trim`.
    if (Object.values(vehicle).some((v: string) => v.trim() === '')) {
      setFormError('Por favor, preencha todos os campos.');
      return;
    }

    // License plate format validation
    if (!validateLicensePlate(vehicle.licensePlate)) {
        setLicensePlateError('Formato de placa inválido. Use AAA-1234 ou ABC1D23.');
        return;
    }

    onSubmit(vehicle);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mt-8">
      <div className="flex items-center mb-6">
        <CarIcon className="h-8 w-8 text-gray-500 mr-4" />
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Informações do Veículo</h2>
            <p className="text-gray-500">Cadastre seu veículo para começar a oferecer caronas.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="make"
          value={vehicle.make}
          onChange={handleChange}
          placeholder="Marca (ex: Honda)"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="model"
          value={vehicle.model}
          onChange={handleChange}
          placeholder="Modelo (ex: Civic)"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="color"
          value={vehicle.color}
          onChange={handleChange}
          placeholder="Cor (ex: Cinza)"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <div>
          <input
            type="text"
            name="licensePlate"
            value={vehicle.licensePlate}
            onChange={handleChange}
            placeholder="Placa (ex: ABC1D23)"
            className={`w-full p-3 border rounded-lg ${licensePlateError ? 'border-red-500' : 'border-gray-300'}`}
            required
            maxLength={8}
          />
          {licensePlateError && <p className="text-red-500 text-sm mt-1">{licensePlateError}</p>}
        </div>

        {formError && <p className="text-red-500 text-sm">{formError}</p>}

        <button
          type="submit"
          className="w-full mt-4 bg-[#3D4C3A] text-white font-bold py-4 px-4 rounded-lg hover:bg-[#2c382a] transition-colors duration-300 text-lg shadow-md"
        >
          Salvar Veículo e Continuar
        </button>
      </form>
    </div>
  );
};

export default DriverVehicleForm;
