import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from 'lucide-react';
import { formatGapToLeader, formatDuration } from '../utils/formatters';

export default function ResultsTable({ results, session_type }) {
    const navigate = useNavigate();
    const { sessionKey } = useParams();

    const sortedResults = [...results].sort((a, b) => (a.position || 999) - (b.position || 999));
    
    const isQualifying = session_type.includes('Qualifying');
    // const isPractice = session_type.includes('Practice');
    const isRace = session_type.includes('Race');
    
    const formatQualifyingTime = (duration) => {
        if (!duration) return '-';
        if (Array.isArray(duration)) {
        return duration.map(time => time ? formatDuration(time) : '-');
        }
        return [formatDuration(duration), '-', '-'];
    };

     const handleDriverClick = (driverNumber) => {
        console.log('Driver profile navigation not yet implemented for driver:', driverNumber);
        alert('Driver profile navigation from race results coming soon!');
    };


    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-900">
                        <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-300">Pos</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-300">NO.</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-300">Driver</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-300">Team</th>
                                                
                        {isQualifying ? (
                            <>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-300">Q1</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-300">Q2</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-300">Q3</th>
                            </>
                        ) : (
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-300">TIME / RETIRED</th>
                        )}

                        {isRace && (
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-300">Points</th>
                        )}

                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-300">Laps</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {sortedResults.map((result, idx) => {
                            const qualifyingTimes = isQualifying ? formatQualifyingTime(result.duration) : null;
                            
                            return (
                                <tr key={idx} className="hover:bg-gray-700 transition-colors">
                                    <td className="px-4 py-3 font-bold text-white">
                                        {result.position || '-'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                        onClick={() => handleDriverClick(result.driver_number)}
                                        className="text-white hover:text-white flex items-center gap-2"
                                        >
                                        {result.driver_number}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                        onClick={() => handleDriverClick(result.driver_number)}
                                        className="text-red-400 hover:text-red-300 hover:underline flex items-center gap-2"
                                        >
                                        {result.headshot_url ? (
                                            <div
                                            className="w-7 h-7 rounded-full flex items-center justify-center overflow-hidden"
                                            style={{ backgroundColor: `#${result.team_colour}` }}
                                            >
                                            <img
                                                src={result.headshot_url}
                                                alt={result.full_name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                            </div>
                                        ) : (
                                            <User size={14} />
                                        )}
                                        {result.full_name}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                        onClick={() => handleDriverClick(result.driver_number)}
                                        className="text-white hover:text-white flex items-center gap-2"
                                        >
                                        {result.team_name}
                                        </button>
                                    </td>
                                                                    
                                    {isQualifying ? (
                                        <>
                                        <td className="px-4 py-3 text-sm text-white">
                                            {qualifyingTimes[0]}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-white">
                                            {qualifyingTimes[1]}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-white">
                                            {qualifyingTimes[2]}
                                        </td>
                                        </>
                                    ) : (
                                        <td className="px-4 py-3 text-sm text-white">
                                        {result.dnf ? (
                                            <span className="text-red-400">DNF</span>
                                        ) : result.dns ? (
                                            <span className="text-yellow-400">DNS</span>
                                        ) : result.dsq ? (
                                            <span className="text-purple-400">DSQ</span>
                                        ) : (
                                            formatGapToLeader(result.gap_to_leader, result.duration)
                                        )}
                                        </td>
                                    )}

                                    {isRace && (
                                        <td className="px-4 py-3 text-white">
                                        {result.points !== null && result.points !== undefined
                                            ? result.points
                                            : '-'}
                                        </td>
                                    )}

                                    <td className="px-4 py-3 text-white">
                                        {result.number_of_laps || '-'}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}