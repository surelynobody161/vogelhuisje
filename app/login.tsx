import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function login() {
        try {
            const response = await fetch('http://145.24.223.199/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Login mislukt');
                return;
            }

            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('user_id', data.user_id.toString());

            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } catch (e) {
            setError('Er is een fout opgetreden');
            console.error(e);
        }
    }

    return (
        <View style={{ padding: 20 }}>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput placeholder="Wachtwoord" secureTextEntry value={password} onChangeText={setPassword} />
            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
            <Button title="Inloggen" onPress={login} />
            <Button title="Registreren" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}
