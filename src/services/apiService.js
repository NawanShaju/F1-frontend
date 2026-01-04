import { API_BASE_URL } from '../config/api';

export const apiService = {
    async fetchMeetings(year) {
        const response = await fetch(`${API_BASE_URL}/meetings/?year=${year}`);
        const data = await response.json();
        
        if (data.success === false) {
            throw new Error(data.error);
        }
        
        return Array.isArray(data) ? data : [];
    },

    async fetchSessions(meetingKey) {
        const response = await fetch(`${API_BASE_URL}/meetings/sessions/?meeting_key=${meetingKey}`);
        const data = await response.json();

        if (data.success === false) {
            throw new Error(data.error);
        }
        
        return Array.isArray(data) ? data : [];
    },

    async fetchSessionResults(sessionKey) {
        const response = await fetch(`${API_BASE_URL}/meetings/sessions/session_result/?session_key=${sessionKey}`);
        const data = await response.json();
        
        if (data.success === false) {
            throw new Error(data.error);
        }
        
        return Array.isArray(data) ? data : [];
    },

    async fetchMeeting(meetingKey) {
        const response = await fetch(`${API_BASE_URL}/meetings/get-meeting?meeting_key=${meetingKey}`);
        const data = await response.json();
        
        if (data.success === false) {
            throw new Error(data.error);
        }
        
        return Array.isArray(data) ? data : [];
    },

    async fetchSession(sessionKey) {
        const response = await fetch(`${API_BASE_URL}/meetings/sessions/get-session?session_key=${sessionKey}`);
        const data = await response.json();
        
        if (data.success === false) {
            throw new Error(data.error);
        }
        
        return Array.isArray(data) ? data : [];
    },

    async fetchDriverInfo(driverNumber, sessionKey) {
        const response = await fetch(`${API_BASE_URL}/drivers/driver?driver_number=${driverNumber}&session_key=${sessionKey}`);
        const data = await response.json();
        
        if (data.success === false || data.error) {
        throw new Error(data.error);
        }
        
        return Array.isArray(data) ? data[0] : data;
    },

    async fetchDriverInfoByYear(driverNumber, year) {
        const response = await fetch(`${API_BASE_URL}/drivers/driver-for-year?driver_number=${driverNumber}&year=${year}`);
        const data = await response.json();
        
        if (data.success === false || data.error) {
        throw new Error(data.error);
        }
        
        return Array.isArray(data) ? data[0] : data;
    },

    async fetchDriverRaceWins(driverNumber, year) {
        const response = await fetch(`${API_BASE_URL}/drivers/race-wins?driver_number=${driverNumber}&year=${year}`);
        const data = await response.json();
        
        if (data.error) {
        throw new Error(data.error);
        }
        
        if (data.info) {
        return [];
        }
        
        return Array.isArray(data) ? data : [];
    },

    async fetchDriverPodiums(driverNumber, year) {
        const response = await fetch(`${API_BASE_URL}/drivers/podiums?driver_number=${driverNumber}&year=${year}`);
        const data = await response.json();
        
        if (data.error) {
        throw new Error(data.error);
        }
        
        if (data.info) {
        return [];
        }
        
        return Array.isArray(data) ? data : [];
    },

    async fetchDriversByYear(year) {
        const response = await fetch(`${API_BASE_URL}/drivers/?year=${year}`);
        const data = await response.json();
        
        if (data.success === false || data.error) {
            throw new Error(data.error);
        }
        
        return Array.isArray(data) ? data : [];
    },
    
    async fetchDriverStats(driverNumber, year) {
        const response = await fetch(`${API_BASE_URL}/drivers/driver-stats?driver_number=${driverNumber}&year=${year}`);
        const data = await response.json();
        
        if (data.success === false || data.error) {
            return []
        }
        
        return data && typeof data === 'object' ? data : {};
    },

};