import { useState } from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native"

interface LoginFormData {
    emailOrPhone: string
    password: string
}

export default function LoginPage() {
    const [formData, setFormData] = useState<LoginFormData>({
        emailOrPhone: "",
        password: "",
    })
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const handleLogin = async () => {
        if (!formData.emailOrPhone || !formData.password) {
            Alert.alert("Fout", "Vul alle velden in")
            return
        }

        setIsSubmitting(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            Alert.alert("Succes", "Succesvol ingelogd!")
        } catch (error) {
            Alert.alert("Fout", "Inloggen mislukt")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleRegister = () => {
        Alert.alert("Registreren", "Navigeer naar registratie pagina")
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#017F56" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {/* Green Header zonder back-button */}
                    <View style={styles.greenHeader}>
                        <Text style={styles.greenHeaderTitle}>Inloggen</Text>
                    </View>

                    {/* Login Form */}
                    <View style={styles.loginForm}>
                        <Text style={styles.formTitle}>Inloggen</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="E-mailadres of telefoonnummer"
                                placeholderTextColor="#666"
                                value={formData.emailOrPhone}
                                onChangeText={(text) =>
                                    setFormData((prev) => ({ ...prev, emailOrPhone: text }))
                                }
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Wachtwoord"
                                placeholderTextColor="#666"
                                value={formData.password}
                                onChangeText={(text) =>
                                    setFormData((prev) => ({ ...prev, password: text }))
                                }
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.loginButton, isSubmitting && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.loginButtonText}>
                                {isSubmitting ? "Bezig met inloggen..." : "Log in!"}
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.divider} />

                        <Text style={styles.registerText}>Heeft u nog geen account?</Text>

                        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                            <Text style={styles.registerButtonText}>Registreren</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    greenHeader: {
        backgroundColor: "#017F56",
        paddingHorizontal: 20,
        paddingVertical: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    greenHeaderTitle: {
        fontSize: 20,
        color: "white",
        fontWeight: "500",
    },
    loginForm: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 40,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: "#333",
        marginBottom: 32,
        textAlign: "left",
    },
    inputContainer: {
        marginBottom: 20,
    },
    textInput: {
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderRadius: 4,
        fontSize: 16,
        color: "#333",
    },
    loginButton: {
        backgroundColor: "#017F56",
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 24,
        marginBottom: 32,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    loginButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    divider: {
        width: 60,
        height: 3,
        backgroundColor: "#017F56",
        alignSelf: "center",
        borderRadius: 2,
        marginBottom: 32,
    },
    registerText: {
        textAlign: "center",
        fontSize: 16,
        color: "#333",
        marginBottom: 16,
    },
    registerButton: {
        backgroundColor: "#017F56",
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    registerButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
})
