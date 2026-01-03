import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MeetingsPage from './pages/MeetingsPage';
import SessionsPage from './pages/SessionsPage';
import ResultsPage from './pages/ResultsPage';
import DriverProfilePage from './pages/DriverProfilePage';
import DriversPage from './pages/DriversPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Header />
        <Routes>
          <Route path="/" element={<MeetingsPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/meetings/:meetingKey/sessions" element={<SessionsPage />} />
          <Route path="/meetings/:meetingKey/sessions/:sessionKey/results" element={<ResultsPage />} />
          <Route path="/driver/:driverNumber" element={<DriverProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;