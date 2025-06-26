import { createContext, useEffect, useState } from "react";
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";


const { API_URL } = Constants.expoConfig?.extra;

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        (async () => {
            setToken(JSON.parse(await AsyncStorage.getItem('jwt')))
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await AsyncStorage.setItem('jwt', token);
        })();
    }, [token]);

    const login = async ({ email, password }) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            const token = result?.token;
            console.log(result)
            if (!token) throw new Error('No token recieved');

            setToken(token);
            return token;
        } catch(error) {
            console.error(error);
            alert('Failed to log in');
        }
    }

    const register = async ({ name, email, password }) => {
        console.log(`${API_URL}/auth/register`);

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const text = await response.text();
            console.log('Status:', response.status);
            console.log('Response OK?', response.ok);
            console.log('Raw Response Text:', text);

            if (!response.ok) throw new Error('Registration failed');

            const result = JSON.parse(text);
            return result;

        } catch (error) {
            console.error(error);
            alert('Failed to register');
        }
    };


    return (
        <AuthContext.Provider value={{ token, login, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
}