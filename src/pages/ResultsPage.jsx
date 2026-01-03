import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft } from 'lucide-react';
import { apiService } from '../services/apiService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ResultsTable from '../components/ResultsTable';

export default function ResultsPage() {
    const { meetingKey, sessionKey } = useParams();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [meeting, setMeeting] = useState([]);
    const [session, setSession] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchResults();
    }, [sessionKey]);

    const fetchResults = async () => {
        setLoading(true);
        setError(null);
        
        try {
        const data = await apiService.fetchSessionResults(sessionKey);
        const meetingData = await apiService.fetchMeeting(meetingKey);
        const sessionData = await apiService.fetchSession(sessionKey);
        setResults(data);
        setMeeting(meetingData[0]);
        setSession(sessionData[0]);
        } catch (err) {
        setError(err.message || 'Failed to fetch results');
        setResults([]);
        } finally {
        setLoading(false);
        }
    };

    const handleDriverClick = (driverNumber) => {
        console.log('Driver clicked:', driverNumber);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
        <button
            onClick={() => navigate(`/meetings/${meetingKey}/sessions`)}
            className="mb-6 flex items-center gap-2 text-red-400 hover:text-red-300"
        >
            <ArrowLeft size={20} />
            Back to Sessions
        </button>

        <ErrorMessage message={error} />
        
        {loading && <LoadingSpinner />}

        <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
            <Trophy size={24} className="text-red-500" />
            {meeting.meeting_official_name} - {session.session_name}
            </h2>
                <p className="text-sm text-gray-300">
                {meeting.country_name}, {meeting.location} <br />
                {new Date(meeting.date_start).toLocaleString("en-AU", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                })}
            </p>
            {results.length === 0 && !loading && (
            <p className="text-gray-400">No results available</p>
            )}
            {results.length > 0 && (
                <ResultsTable results={results} session_type={session.session_type} onDriverClick={handleDriverClick} />
            )}
        </div>
        </div>
    );
}
