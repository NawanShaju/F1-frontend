// src/pages/DriverProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Trophy, Medal, MapPin, Calendar, ArrowLeft } from 'lucide-react';
import { apiService } from '../services/apiService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import YearSelector from '../components/YearSelector';
import { formatDate } from '../utils/formatters';
import { Stat } from '../components/Stat'

export default function DriverProfilePage() {
  const { driverNumber } = useParams();
  const [searchParams] = useSearchParams();
  const yearFromUrl = searchParams.get('year');
  const navigate = useNavigate();
  
  const [driverInfo, setDriverInfo] = useState(null);
  const [selectedYear, setSelectedYear] = useState(parseInt(yearFromUrl) || 2025);
  const [wins, setWins] = useState([]);
  const [podiums, setPodiums] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (driverNumber) {
      fetchDriverInfo(selectedYear);
    }
  }, [driverNumber, selectedYear]);

  useEffect(() => {
    if (driverNumber) {
      fetchDriverStats(selectedYear);
    }
  }, [selectedYear, driverNumber]);

  const fetchDriverInfo = async (year) => {
    setLoading(true);
    setError(null);
    
    try {
        const data = await apiService.fetchDriverInfoByYear(driverNumber, year);
        setDriverInfo(data);

        const statsData = await apiService.fetchDriverStats(driverNumber, year);
        setStats(statsData)
    } catch (err) {
        setError(err.message || 'Failed to fetch driver information');
    } finally {
        setLoading(false);
    }
    
  };

  const fetchDriverStats = async (year) => {
    setStatsLoading(true);
    
    try {
      const [winsData, podiumsData] = await Promise.all([
        apiService.fetchDriverRaceWins(driverNumber, year),
        apiService.fetchDriverPodiums(driverNumber, year)
      ]);

      setWins(winsData);
      setPodiums(podiumsData);
    } catch (err) {
      console.error('Failed to fetch driver stats:', err);
      setWins([]);
      setPodiums([]);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleWinClick = (win) => {
    navigate(`/meetings/${win.meeting_key}/sessions`);
  };

  const handlePodiumClick = (podium) => {
    navigate(`/meetings/${podium.meeting_key}/sessions`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!driverInfo) return <ErrorMessage message="Driver information not found" />;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Back Button - Fixed Position */}
      <div className="max-w-screen-2xl mx-auto px-8 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      {/* Driver Profile Header - Full Width */}
      <div 
        className="relative overflow-hidden mt-6"
        style={{
          background: `linear-gradient(135deg, #${driverInfo.team_colour}22 0%, #${driverInfo.team_colour}44 100%)`,
          height: '600px'
        }}
      >
        {/* Decorative Pattern Background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 100% 50%, #${driverInfo.team_colour} 0%, transparent 50%),
                             radial-gradient(circle at 0% 100%, #${driverInfo.team_colour} 0%, transparent 50%)`,
          }}
        />
        
        {/* Diagonal Accent Stripes */}
        <div className="absolute top-0 left-0 w-32 h-full bg-white opacity-20 transform -skew-x-12" />
        <div className="absolute top-0 left-16 w-8 h-full bg-white opacity-10 transform -skew-x-12" />
        <div className="absolute bottom-0 right-0 w-32 h-full bg-white opacity-20 transform -skew-x-12" />
        <div className="absolute bottom-0 right-16 w-8 h-full bg-white opacity-10 transform -skew-x-12" />

        {/* Content Container */}
        <div className="relative h-full max-w-screen-2xl mx-auto px-8">
          {/* Left Side - Driver Info (Center Vertically) */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 max-w-2xl z-10">
            {/* First Name (stylized) */}
            <div className="mb-2">
              <span className="text-5xl md:text-6xl font-light italic text-gray-300">
                {driverInfo.first_name}
              </span>
            </div>
            
            {/* Last Name (bold) */}
            <div className="mb-8">
              <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tight leading-none">
                {driverInfo.last_name}
              </h1>
            </div>

            {/* Info Row */}
            <div className="flex flex-wrap items-center gap-4 text-lg mb-8">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xl">{driverInfo.country_code}</span>
              </div>
              <span className="text-gray-400 text-2xl">|</span>
              <span 
                className="font-bold text-2xl"
                style={{ color: `#${driverInfo.team_colour}` }}
              >
                {driverInfo.team_name}
              </span>
              <span className="text-gray-400 text-2xl">|</span>
              <span className="font-bold text-3xl">{driverInfo.driver_number}</span>
            </div>
          </div>

          {/* Decorative number in background */}
            <div 
            className="absolute bottom-15 right-5 text-[600px] md:text-600px] font-black opacity-50 leading-none pointer-events-auto"
            style={{ color: `#${driverInfo.team_colour}` }}
            >
            {driverInfo.driver_number}
            </div>

          {/* Right Side - Driver Image (Bottom Right Corner) */}
          <div className="absolute bottom-0 right-0 z-10">
            {driverInfo.headshot_url ? (
              <img
                src={driverInfo.headshot_url}
                alt={driverInfo.full_name}
                className="h-150 w-auto object-contain object-bottom"
                style={{
                  filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))'
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div 
                className="h-150 w-96 flex items-end justify-center pb-8"
                style={{ backgroundColor: `#${driverInfo.team_colour}` }}
              >
                <span className="text-9xl font-bold text-white opacity-50">
                  {driverInfo.driver_number}
                </span>
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-screen-2xl mx-auto px-8 py-12">
        {statsLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-6">
            {/* Season Overview */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700">
            <h3 className="text-xl font-bold mb-6 text-white">
                Season Overview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* OVERALL / CAREER STATS */}
                <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">
                    Career Stats
                </h4>

                <div className="space-y-3">
                    {console.log(stats)}
                    <Stat label="World Championships" value={stats["World Championships"]} />
                    <Stat label="Career Points" value={stats["Career Points"]} />
                    <Stat label="Podiums" value={stats["Podiums"]} />
                    <Stat label="Pole Positions" value={stats["Pole Positions"]} />
                    <Stat label="Wins" value={stats["Highest Race Finish"]} />
                    <Stat label="DNFs" value={stats["DNFs"]} />
                    <Stat label="Fastest Laps" value={stats["DHL Fastest Laps"]} />
                    <Stat label="Grands Prix Entered" value={stats["Grand Prix Entered"]} />
                </div>
                </div>

                {/* CURRENT SEASON / SESSION STATS */}
                <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">
                    Current Season
                </h4>

                <div className="space-y-3">
                    <Stat label="Season Position" value={stats["Season Position"]} />
                    <Stat label="Season Points" value={stats["Season Points"]} />
                    <Stat label="Grand Prix Races" value={stats["Grand Prix Races"]} />
                    <Stat label="Top 10 Finishes" value={stats["Grand Prix Top 10s"]} />
                    <Stat label="Sprint Races" value={stats["Sprint Races"]} />
                    <Stat label="Sprint Wins" value={stats["Sprint Wins"]} />
                    <Stat label="Sprint Points" value={stats["Sprint Points"]} />
                    <Stat label="Sprint Podiums" value={stats["Sprint Podiums"]} />
                </div>
                </div>

            </div>
            </div>


            {/* Year Selector for Stats */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Career Statistics</h2>
                <YearSelector selectedYear={selectedYear} onYearChange={setSelectedYear} />
            </div>

            {/* Race Wins and Podiums - Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Race Wins Section */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Trophy size={24} className="text-yellow-400" />
                  Race Wins ({selectedYear})
                </h3>
                
                {wins.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No wins in {selectedYear}</p>
                ) : (
                  <div className="space-y-3 max-h-125 overflow-y-auto pr-2 custom-scrollbar">
                    {wins.map((win, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleWinClick(win)}
                        className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-all border-l-4 border-yellow-400 hover:scale-[1.02] hover:shadow-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-bold text-lg mb-1">{win.circuit_short_name}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                              <MapPin size={14} />
                              {win.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                              <Calendar size={14} />
                              {formatDate(win.date_start)}
                            </div>
                          </div>
                          <div className="text-3xl">🏆</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <p className="text-center text-gray-400">
                    <span className="text-4xl font-bold text-yellow-400 block mb-1">{wins.length}</span>
                    <span className="text-sm">Total win{wins.length !== 1 ? 's' : ''} in {selectedYear}</span>
                  </p>
                </div>
              </div>

              {/* Podiums Section */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Medal size={24} className="text-orange-400" />
                  Podiums ({selectedYear})
                </h3>
                
                {podiums.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No podiums in {selectedYear}</p>
                ) : (
                  <div className="space-y-3 max-h-125 overflow-y-auto pr-2 custom-scrollbar">
                    {podiums.map((podium, idx) => (
                      <div
                        key={idx}
                        onClick={() => handlePodiumClick(podium)}
                        className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-all border-l-4 border-orange-400 hover:scale-[1.02] hover:shadow-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="bg-orange-400 text-gray-900 font-bold px-2 py-1 rounded text-sm">
                                P{podium.position}
                              </span>
                              <h4 className="font-bold text-lg">{podium.circuit_short_name}</h4>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                              <MapPin size={14} />
                              {podium.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                              <Calendar size={14} />
                              {formatDate(podium.date_start)}
                            </div>
                          </div>
                          <div className="text-3xl">
                            {podium.position === 1 ? '🥇' : podium.position === 2 ? '🥈' : '🥉'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <p className="text-center text-gray-400">
                    <span className="text-4xl font-bold text-orange-400 block mb-1">{podiums.length}</span>
                    <span className="text-sm">Total podium{podiums.length !== 1 ? 's' : ''} in {selectedYear}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}