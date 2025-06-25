import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://145.24.223.199:80';

const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            ...options,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${errorText}`);
        }

        return response.json();
    } catch (error) {
        throw new Error(
            error.name === 'AbortError'
                ? 'Verbinding time-out (server niet bereikbaar)'
                : error.message
        );
    }
};

const fetchWithAuth = async (url, options = {}) => {
    const token = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');

    return fetchWithTimeout(url, {
        ...options,
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(userId && { 'X-User-ID': userId }),
            ...options.headers,
        },
    });
};

export default {
    login: async (credentials) => {
        return fetchWithTimeout('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    register: async (data) => {
        return fetchWithTimeout('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    getProfile: async () => {
        const userId = await AsyncStorage.getItem('userId');
        return fetchWithAuth(`/users/${userId}`);
    },

    updateProfile: async (data) => {
        const userId = await AsyncStorage.getItem('userId');
        return fetchWithAuth(`/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
};
