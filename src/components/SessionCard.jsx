import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { formatDate } from '../utils/formatters';

export default function SessionCard({ session, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-700 border-2 ${
        isSelected ? 'border-red-500' : 'border-transparent'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-bold text-white">{session.session_name}</h3>
          <p className="text-sm text-gray-400 mt-1">{session.session_type}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <Calendar size={12} />
            {formatDate(session.date_start)}
          </div>
        </div>
        <ChevronRight className="text-gray-500" />
      </div>
    </div>
  );
}
