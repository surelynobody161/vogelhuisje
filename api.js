import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://145.24.223.199';

const fetchWithAuth = async (url, options = {}) => {
    const token = await AsyncStorage.getItem('userToken');

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
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
        fetch(`${BASE_URL}/shopitems`).then(res => res.json()),

    getShopItemById: (id) =>
        fetch(`${BASE_URL}/shopitems/${id}`).then(res => res.json()),

    deleteShopItem: (id) =>
        fetchWithAuth(`/shopitems/${id}`, {
            method: 'DELETE',
        }),

    getAvailableBirdhouses: () =>
        fetch(`${BASE_URL}/birdhouses?_available=true`).then(res => res.json()),
};

