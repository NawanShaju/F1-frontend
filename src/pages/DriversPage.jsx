// src/pages/DriversPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import YearSelector from '../components/YearSelector';
import DriverCard from '../components/DriverCard';

export default function DriversPage() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrivers(selectedYear);
  }, [selectedYear]);

  const fetchDrivers = async (year) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiService.fetchDriversByYear(year);
      setDrivers(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch drivers');
      setDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDriverClick = (driver) => {
    navigate(`/driver/${driver.driver_number}?year=${selectedYear}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">F1 Drivers</h1>
          <p className="text-gray-400">Explore the current season's driver lineup</p>
        </div>

        <YearSelector selectedYear={selectedYear} onYearChange={setSelectedYear} />
        <ErrorMessage message={error} />
        
        {loading && <LoadingSpinner />}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {drivers.length === 0 && !loading && (
            <p className="text-gray-400 col-span-full text-center py-12">
              No drivers found for {selectedYear}
            </p>
          )}
          
          {drivers
            .filter(driver => driver.first_name && driver.first_name.trim() !== '')
            .map(driver => (
                <DriverCard
                key={driver.driver_number}
                driver={driver}
                onClick={handleDriverClick}
                />
            ))}
        </div>
      </div>
    </div>
  );
}