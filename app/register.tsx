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

type RegisterMode = "email" | "phone"

interface RegisterFormData {
    email: string
    phone: string
    password: string
    confirmPassword: string
}

export default function RegisterPage() {
    const [formData, setFormData] = useState<RegisterFormData>({
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    })
    const [registerMode, setRegisterMode] = useState<RegisterMode>("email")
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const handleRegister = async () => {
        const contactValue = registerMode === "email" ? formData.email : formData.phone

        if (!contactValue || !formData.password || !formData.confirmPassword) {
            Alert.alert("Fout", "Vul alle velden in")
            return
        }

        if (formData.password !== formData.confirmPassword) {
            Alert.alert("Fout", "Wachtwoorden komen niet overeen")
            return
        }

        setIsSubmitting(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            Alert.alert("Succes", "Account succesvol aangemaakt!")
        } catch (error) {
            Alert.alert("Fout", "Registratie mislukt")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleLogin = () => {
        Alert.alert("Inloggen", "Navigeer naar inlog pagina")
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
                        {/* Selectie email of telefoon */}
                        <View style={styles.toggleWrapper}>
                            <TouchableOpacity
                                style={[
                                    styles.toggleButton,
                                    registerMode === "email" && styles.toggleButtonActive,
                                ]}
                                onPress={() => setRegisterMode("email")}
                            >
                                <Text
                                    style={[
                                        styles.toggleButtonText,
                                        registerMode === "email" && styles.toggleButtonTextActive,
                                    ]}
                                >
                                    Met e-mail
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.toggleButton,
                                    registerMode === "phone" && styles.toggleButtonActive,
                                ]}
                                onPress={() => setRegisterMode("phone")}
                            >
                                <Text
                                    style={[
                                        styles.toggleButtonText,
                                        registerMode === "phone" && styles.toggleButtonTextActive,
                                    ]}
                                >
                                    Met telefoon
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Alleen het gekozen invoerveld tonen */}
                        <View style={styles.inputContainer}>
                            {registerMode === "email" ? (
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="E-mailadres"
                                    placeholderTextColor="#666"
                                    value={formData.email}
                                    onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            ) : (
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Telefoonnummer"
                                    placeholderTextColor="#666"
                                    value={formData.phone}
                                    onChangeText={(text) => setFormData((prev) => ({ ...prev, phone: text }))}
                                    keyboardType="phone-pad"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            )}
                        </View>

                        {/* Wachtwoordvelden */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Wachtwoord"
                                placeholderTextColor="#666"
                                value={formData.password}
                                onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Bevestig wachtwoord"
                                placeholderTextColor="#666"
                                value={formData.confirmPassword}
                                onChangeText={(text) => setFormData((prev) => ({ ...prev, confirmPassword: text }))}
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.registerButton, isSubmitting && styles.buttonDisabled]}
                            onPress={handleRegister}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.registerButtonText}>
                                {isSubmitting ? "Bezig met registreren..." : "Registreer!"}
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.divider} />

                        <Text style={styles.loginText}>Heeft u al een account?</Text>

                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <Text style={styles.loginButtonText}>Inloggen</Text>
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
        backgroundColor: "#ffffff",
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
    titleWrapper: {
        backgroundColor: "#ffffff",
        alignItems: "center",
        paddingTop: 16,
        paddingBottom: 8,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: "#333",
        marginTop: 35,
    },
    registerForm: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 40,
    },
    toggleWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
        gap: 10,
    },
    toggleButton: {
        borderWidth: 1,
        borderColor: "#017F56",
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    toggleButtonActive: {
        backgroundColor: "#017F56",
    },
    toggleButtonText: {
        color: "#017F56",
        fontSize: 16,
    },
    toggleButtonTextActive: {
        color: "#ffffff",
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
        marginBottom: 2,
    },
    registerButton: {
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
    registerButtonText: {
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
        marginBottom: 70,
    },
    loginText: {
        textAlign: "center",
        fontSize: 16,
        color: "#333",
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: "#017F56",
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    loginButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
})
