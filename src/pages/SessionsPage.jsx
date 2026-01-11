// src/pages/SessionsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft, MapPin, Calendar, Trophy } from 'lucide-react';
import { apiService } from '../services/apiService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SessionCard from '../components/SessionCard';
import { CircuitStat } from '../components/CircuitStat';
import { AboutCard } from '../components/AboutCard';

export default function SessionsPage() {
  const { meetingKey } = useParams();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [circuitInfo, setCircuitInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
    fetchCircuitInfo();
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

  const fetchCircuitInfo = async () => {
    try {
      const data = await apiService.fetchMeetingInfo(meetingKey);
      setCircuitInfo(data);
    } catch (err) {
      console.error('Failed to fetch circuit info:', err);
    }
  };

  const handleSessionClick = (session) => {
    navigate(`/meetings/${meetingKey}/sessions/${session.session_key}/results`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-red-400 hover:text-red-300"
        >
          <ArrowLeft size={20} />
          Back to Meetings
        </button>

        <ErrorMessage message={error} />
        
        {loading && <LoadingSpinner />}

        {/* Circuit Header Section */}
        {circuitInfo && (
          <div className="mb-8">
            {/* Red accent line */}
            <div className="h-1 bg-linear-to-r from-red-600 to-transparent mb-6" />
            
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
              {/* Left - Circuit Map */}
              <div className="bg-black rounded-lg overflow-hidden">
                {circuitInfo["circuit img"] ? (
                  <img
                    src={circuitInfo["circuit img"]}
                    alt="Circuit Map"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-96 bg-gray-800">
                    <MapPin size={64} className="text-gray-600" />
                  </div>
                )}
              </div>

              {/* Right - Circuit Stats */}
              <div className="space-y-6">
                <h2 className="text-4xl font-black uppercase tracking-wider text-white mb-6">
                  Circuit
                </h2>

                {/* Circuit Stats Grid */}
                <div className="space-y-4">
                  <CircuitStat
                    label="Circuit Length"
                    value={circuitInfo["circuit length"] || "N/A"}
                  />
                  <CircuitStat
                    label="First Grand Prix"
                    value={circuitInfo["first grand prix"] || "N/A"}
                  />
                  <CircuitStat
                    label="Number of Laps"
                    value={circuitInfo["number of laps"] || "N/A"}
                  />
                  <CircuitStat
                    label="Fastest lap time"
                    value={circuitInfo["fastest lap time"] || "N/A"}
                    subtitle={circuitInfo["fastest lap driver"]}
                  />
                  <CircuitStat
                    label="Race Distance"
                    value={circuitInfo["race distance"] || "N/A"}
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            {circuitInfo && hasAboutContent(circuitInfo) && (
              <div className="mt-8">
                <h3 className="text-3xl font-black uppercase tracking-wider text-white mb-6">
                  About
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {circuitInfo["What's the circuit like?"] && (
                    <AboutCard
                      title="What's the circuit like?"
                      content={circuitInfo["What's the circuit like?"]}
                    />
                  )}
                  {circuitInfo["When was its first Grand Prix?"] && (
                    <AboutCard
                      title="When was its first Grand Prix?"
                      content={circuitInfo["When was its first Grand Prix?"]}
                    />
                  )}
                  {circuitInfo["When was the track built?"] && (
                    <AboutCard
                      title="When was the track built?"
                      content={circuitInfo["When was the track built?"]}
                    />
                  )}
                  {circuitInfo["Where is the best place to watch?"] && (
                    <AboutCard
                      title="Where is the best place to watch?"
                      content={circuitInfo["Where is the best place to watch?"]}
                    />
                  )}
                  {circuitInfo["Why go?"] && (
                    <AboutCard
                      title="Why go?"
                      content={circuitInfo["Why go?"]}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sessions Section */}
        <div className="mt-12">
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
    </div>
  );
}

function hasAboutContent(info) {
  return !!(
    info["What's the circuit like?"] ||
    info["When was its first Grand Prix?"] ||
    info["When was the track built?"] ||
    info["Where is the best place to watch?"] ||
    info["Why go?"]
  );
}