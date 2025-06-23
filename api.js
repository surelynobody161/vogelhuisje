import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://145.24.223.199';

const fetchWithAuth = async (url, options = {}) => {
    const token = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(userId && { 'X-User-ID': userId }),
        ...options.headers,
    };

    return fetch(`${BASE_URL}${url}`, {
        ...options,
        headers,
    });
};

export default {
    register: (data) =>
        fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }),

    login: (data) =>
        fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }),

    getProfile: async () => {
        const userId = await AsyncStorage.getItem('userId');
        return fetchWithAuth(`/users/${userId}`, {
            method: 'GET',
        });
    },

    updateProfile: async (data) => {
        const userId = await AsyncStorage.getItem('userId');
        return fetchWithAuth(`/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    getAllUsers: () =>
        fetchWithAuth('/users', {
            method: 'GET',
        }),

    getUserById: (id) =>
        fetchWithAuth(`/users/${id}`, {
            method: 'GET',
        }),
};