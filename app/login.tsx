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

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Profile: undefined;
};

export default function Login() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    const [formData, setFormData] = useState({
        emailOrPhone: "",
        password: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleLogin = async () => {
        if (!formData.emailOrPhone || !formData.password) {
            Alert.alert("Fout", "Vul alle velden in")
            return
        }

        setIsSubmitting(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            Alert.alert("Succes", "Inloggen gelukt!")
            navigation.navigate("Profile")
        } catch (error) {
            Alert.alert("Fout", "Inloggen mislukt")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleRegister = () => {
        navigation.navigate("Register")
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#017F56" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.greenHeader}>
                        <Text style={styles.greenHeaderTitle}>Inloggen</Text>
                    </View>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.formTitle}>Inloggen</Text>
                    </View>
                    <View style={styles.loginForm}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="E-mailadres of telefoonnummer"
                            placeholderTextColor="#666"
                            value={formData.emailOrPhone}
                            onChangeText={(text) => setFormData({ ...formData, emailOrPhone: text })}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Wachtwoord"
                            placeholderTextColor="#666"
                            value={formData.password}
                            onChangeText={(text) => setFormData({ ...formData, password: text })}
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TouchableOpacity
                            style={[styles.loginButton, isSubmitting && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.loginButtonText}>
                                {isSubmitting ? "Bezig met inloggen..." : "Log in!"}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.registerText}>Heeft u nog geen account?</Text>
                        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                            <Text style={styles.registerButtonText}>Aanmelden</Text>
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
    loginForm: { paddingHorizontal: 24, paddingTop: 16 },
    textInput: {
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderRadius: 4,
        fontSize: 16,
        color: "#333",
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: "#017F56",
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
    },
    buttonDisabled: { opacity: 0.6 },
    loginButtonText: { color: "white" },
    registerText: {
        textAlign: "center",
        color: "#333",
        marginBottom: 8,
        fontSize: 16,
    },
    registerButton: {
        backgroundColor: "#e0e0e0",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
    },
    registerButtonText: {
        color: "#017F56",
        fontWeight: "600",
        fontSize: 16,
    },
});
