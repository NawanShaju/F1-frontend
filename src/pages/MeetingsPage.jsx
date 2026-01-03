import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { apiService } from '../services/apiService';
import YearSelector from '../components/YearSelector';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import MeetingCard from '../components/MeetingCard';

export default function MeetingsPage() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeetings(selectedYear);
  }, [selectedYear]);

  const fetchMeetings = async (year) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiService.fetchMeetings(year);
      setMeetings(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch meetings');
      setMeetings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMeetingClick = (meeting) => {
    navigate(`/meetings/${meeting.meeting_key}/sessions`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <YearSelector selectedYear={selectedYear} onYearChange={setSelectedYear} />
      <ErrorMessage message={error} />
      
      {loading && <LoadingSpinner />}

      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
          <Trophy size={24} className="text-red-500" />
          Meetings ({selectedYear})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meetings.length === 0 && !loading && (
            <p className="text-gray-400">No meetings found for {selectedYear}</p>
          )}
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.meeting_key}
              meeting={meeting}
              isSelected={false}
              onClick={() => handleMeetingClick(meeting)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
