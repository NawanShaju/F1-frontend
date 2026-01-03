import React from 'react';
import { Calendar } from 'lucide-react';

export default function YearSelector({ selectedYear, onYearChange }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <label className="text-lg font-semibold flex items-center gap-2 text-white">
        <Calendar size={20} />
        Select Year:
      </label>
      <select
        value={selectedYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none"
      >
        <option value={2023}>2023</option>
        <option value={2024}>2024</option>
        <option value={2025}>2025</option>
      </select>
    </div>
  );
}
