import React from 'react';
import { MapPin, Calendar, ChevronRight } from 'lucide-react';
import { formatDate } from '../utils/formatters';

export default function MeetingCard({ meeting, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-700 border-2 ${
        isSelected ? 'border-red-500' : 'border-transparent'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-white">{meeting.meeting_name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
            <MapPin size={14} />
            {meeting.location}, {meeting.country_name}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
            <Calendar size={14} />
            {formatDate(meeting.date_start)}
          </div>
        </div>
        <ChevronRight className="text-gray-500" />
      </div>
    </div>
  );
}
