import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import api from './api';

type RootStackParamList = {
    Login: undefined;
};

export default function Register() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleRegister = async () => {
        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Fout", "Vul alle velden in")
            return
        }

        if (password !== confirmPassword) {
            Alert.alert("Fout", "Wachtwoorden komen niet overeen")
            return
        }

        setIsSubmitting(true)

        try {
            const response = await api.register({
                name,
                email,
                password
            });

            const data = await response.json();

            if (response.ok) {
                // Opslaan user id als die wordt teruggestuurd
                if (data.user_id) {
                    await AsyncStorage.setItem('userId', String(data.user_id));
                }

                Alert.alert("Succes", "Account succesvol aangemaakt!");
                navigation.navigate("Login");
            } else {
                Alert.alert("Fout", data.error || "Registratie mislukt");
            }
        } catch (error) {
            Alert.alert("Fout", "Er is een netwerkfout opgetreden");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#017F56" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.greenHeader}>
                        <Text style={styles.greenHeaderTitle}>Registreren</Text>
                    </View>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.formTitle}>Registreren</Text>
                    </View>
                    <View style={styles.registerForm}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Volledige naam"
                            placeholderTextColor="#666"
                            value={formData.name}
                            onChangeText={(text) => setFormData({ ...formData, name: text })}
                            autoCapitalize="words"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="E-mailadres"
                            placeholderTextColor="#666"
                            value={formData.email}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Wachtwoord"
                            placeholderTextColor="#666"
                            secureTextEntry
                            value={formData.password}
                            onChangeText={(text) => setFormData({ ...formData, password: text })}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Bevestig wachtwoord"
                            placeholderTextColor="#666"
                            secureTextEntry
                            value={formData.confirmPassword}
                            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                        />
                        <TouchableOpacity
                            style={[styles.registerButton, isSubmitting && styles.buttonDisabled]}
                            onPress={handleRegister}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.registerButtonText}>
                                {isSubmitting ? "Bezig met registreren..." : "Aanmelden"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    greenHeader: { backgroundColor: "#017F56", paddingHorizontal: 20, paddingVertical: 24, alignItems: "center" },
    greenHeaderTitle: { fontSize: 20, color: "white", fontWeight: "500" },
    titleWrapper: { alignItems: "center", paddingTop: 16, paddingBottom: 8 },
    formTitle: { fontSize: 24, fontWeight: "600", color: "#333", marginTop: 35 },
    registerForm: { paddingHorizontal: 24, paddingTop: 16 },
    textInput: {
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderRadius: 4,
        fontSize: 16,
        color: "#333",
        marginBottom: 20,
    },
    registerButton: {
        backgroundColor: "#017F56",
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonDisabled: { opacity: 0.6 },
    registerButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
})