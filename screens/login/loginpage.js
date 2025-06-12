import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (email && password) {
            Alert.alert("Succes", "Je bent ingelogd!");
        } else {
            Alert.alert("Fout", "Vul je e-mailadres en wachtwoord in.");
        }
    };

    return (
        <View>
            <Text>Inloggen</Text>

            <TextInput
                placeholder="E-mailadres of telefoonnummer"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                placeholder="Wachtwoord"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity onPress={handleLogin}>
                <Text>Log in!</Text>
            </TouchableOpacity>

            <Text>Heeft u nog geen account?</Text>

            <TouchableOpacity>
                <Text>Registreren</Text>
            </TouchableOpacity>
        </View>
    );
}
