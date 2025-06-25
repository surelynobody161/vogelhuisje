import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function register() {
        try {
            const response = await fetch('http://145.24.223.199/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Registratie mislukt');
                setSuccess('');
                return;
            }

            setSuccess('Registratie succesvol! Je kan nu inloggen.');
            setError('');
        } catch (e) {
            setError('Er is een fout opgetreden');
            setSuccess('');
            console.error(e);
        }
    }

    return (
        <View style={{ padding: 20 }}>
            <TextInput placeholder="Naam" value={name} onChangeText={setName} />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput placeholder="Wachtwoord" secureTextEntry value={password} onChangeText={setPassword} />
            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
            {success ? <Text style={{ color: 'green' }}>{success}</Text> : null}
            <Button title="Registreren" onPress={register} />
            <Button title="Terug naar Inloggen" onPress={() => navigation.navigate('Login')} />
        </View>
    );
}
