import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft } from 'lucide-react';
import { apiService } from '../services/apiService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SessionCard from '../components/SessionCard';

export default function SessionsPage() {
  const { meetingKey } = useParams();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, [meetingKey]);

  const fetchSessions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiService.fetchSessions(meetingKey);
      setSessions(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch sessions');
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSessionClick = (session) => {
    navigate(`/meetings/${meetingKey}/sessions/${session.session_key}/results`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2 text-red-400 hover:text-red-300"
      >
        <ArrowLeft size={20} />
        Back to Meetings
      </button>

      <ErrorMessage message={error} />
      
      {loading && <LoadingSpinner />}

      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
          <Clock size={24} className="text-red-500" />
          Sessions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.length === 0 && !loading && (
            <p className="text-gray-400">No sessions found</p>
          )}
          {sessions.map((session) => (
            <SessionCard
              key={session.session_key}
              session={session}
              isSelected={false}
              onClick={() => handleSessionClick(session)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
