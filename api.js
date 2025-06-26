import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const { API_URL } = Constants.expoConfig?.extra;

const fetchWithAuth = async (url, options = {}) => {
    const token = await AsyncStorage.getItem('userToken');

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    return fetch(`${API_URL}${url}`, {
        ...options,
        headers,
    });
};

export default {
    register: (data) =>
        fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }),

    login: (data) =>
        fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }),

    getProfile: () =>
        fetchWithAuth('/users/me', {
            method: 'GET',
        }),

    updateProfile: (data) =>
        fetchWithAuth('/users/me', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    getShopItems: () =>
        fetch(`${API_URL}/shopitems`).then(res => res.json()),

    getShopItemById: (id) =>
        fetch(`${API_URL}/shopitems/${id}`).then(res => res.json()),

    deleteShopItem: (id) =>
        fetchWithAuth(`/shopitems/${id}`, {
            method: 'DELETE',
        }),

    getAvailableBirdhouses: () =>
        fetch(`${API_URL}/birdhouses?is_available=true`).then(res => res.json()),
};

