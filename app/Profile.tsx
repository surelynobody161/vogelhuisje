import { useState, useEffect } from "react"
import {
    View,
    Image,
    TouchableOpacity,
    Switch,
    ScrollView,
    SafeAreaView,
    Alert,
    TextInput,
    StyleSheet,
    Text,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import * as ImagePicker from "expo-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NavBar from "./NavBar"

type RootStackParamList = {
    Home: undefined
    Recorder: undefined
    Profile: undefined
    Intro: undefined
    login: undefined
}

export default function ProfielScherm() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [cameraAan, setCameraAan] = useState(true)
    const [notificatiesAan, setNotificatiesAan] = useState(false)
    const [clipLengte, setClipLengte] = useState("30")
    const [profielfoto, setProfielfoto] = useState("https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_640.jpg")
    const [naam, setNaam] = useState("Birdney")
    const [email, setEmail] = useState("britney@email.com")

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const saved = await AsyncStorage.getItem("profileSettings")
                if (saved) {
                    const data = JSON.parse(saved)
                    setCameraAan(data.cameraAan)
                    setNotificatiesAan(data.notificatiesAan)
                    setClipLengte(data.clipLengte || "30")
                    setProfielfoto(data.profielfoto)
                    setNaam(data.naam)
                    setEmail(data.email)
                }
            } catch {
                // ignore
            }
        }
        loadSettings()
    }, [])

    const slaInstellingenOp = async () => {
        const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email)
        const isValidName = (naam: string) => naam.trim().length >= 2

        if (!isValidName(naam)) {
            Alert.alert("Fout", "Voer een geldige naam in (minimaal 2 tekens).")
            return
        }

        if (!isValidEmail(email)) {
            Alert.alert("Fout", "Voer een geldig e-mailadres in.")
            return
        }

        const data = { cameraAan, notificatiesAan, clipLengte, profielfoto, naam, email }

        try {
            await AsyncStorage.setItem("profileSettings", JSON.stringify(data))
            Alert.alert("Opgeslagen", "Je instellingen zijn opgeslagen.")
        } catch {
            Alert.alert("Fout", "Kon instellingen niet opslaan.")
        }
    }

    const kiesFoto = async () => {
        const toestemming = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (toestemming.status !== "granted") {
            Alert.alert("Toestemming vereist", "Toegang tot je fotobibliotheek is nodig.")
            return
        }
        const resultaat = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        if (!resultaat.canceled) setProfielfoto(resultaat.assets[0].uri)
    }

    const handleLogout = () => {
        Alert.alert("Uitloggen", "Weet je zeker dat je wilt uitloggen?", [
            { text: "Annuleren", style: "cancel" },
            {
                text: "Uitloggen",
                style: "destructive",
                onPress: () =>
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "login" }],
                    }),
            },
        ])
    }

    const getClipLengteLabel = (value: string) => {
        switch (value) {
            case "10": return "10 seconden"
            case "30": return "30 seconden"
            case "50": return "50 seconden"
            default: return "30 seconden"
        }
    }

    const showClipLengteOptions = () => {
        Alert.alert("Kies Clip Lengte", "Selecteer de gewenste clip lengte:", [
            { text: "10 seconden", onPress: () => setClipLengte("10") },
            { text: "30 seconden", onPress: () => setClipLengte("30") },
            { text: "50 seconden", onPress: () => setClipLengte("50") },
            { text: "Annuleren", style: "cancel" },
        ])
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView
                    style={styles.content}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={24} color="#B9FFBC" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Mijn Profiel</Text>
                        <View style={{ width: 40 }} />
                    </View>

                    <View style={styles.profileSection}>
                        <Image source={{ uri: profielfoto }} style={styles.profileImage} />
                        <Text style={styles.profileName}>{naam || "Gebruiker"}</Text>
                        <TouchableOpacity style={styles.editPhotoButton} onPress={kiesFoto}>
                            <Text style={styles.saveButtonText}>Wijzig Foto</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Persoonlijke Info</Text>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Naam</Text>
                            <TextInput
                                style={[styles.infoValue, { fontSize: 14 }]}
                                value={naam}
                                onChangeText={setNaam}
                                placeholder="Vul je naam in"
                            />
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>E-mail</Text>
                            <TextInput
                                style={[styles.infoValue, { fontSize: 14 }]}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Vul je e-mail in"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.startGuideButton} onPress={() => navigation.navigate("Intro")}>
                        <Text style={styles.startGuideButtonText}>Start Gids</Text>
                    </TouchableOpacity>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Instellingen</Text>
                        <View style={styles.settingRow}>
                            <Text style={styles.settingLabel}>Camera Aan</Text>
                            <Switch
                                value={cameraAan}
                                onValueChange={setCameraAan}
                                trackColor={{ false: "#d3d3d3", true: "#006e41" }}
                                thumbColor="#ffffff"
                            />
                        </View>
                        <View style={styles.settingRow}>
                            <Text style={styles.settingLabel}>Notificaties</Text>
                            <Switch
                                value={notificatiesAan}
                                onValueChange={setNotificatiesAan}
                                trackColor={{ false: "#d3d3d3", true: "#006e41" }}
                                thumbColor="#ffffff"
                            />
                        </View>
                        <View style={styles.settingRow}>
                            <Text style={styles.settingLabel}>Clip Lengte</Text>
                            <TouchableOpacity style={styles.customDropdown} onPress={showClipLengteOptions}>
                                <Text style={styles.dropdownText}>{getClipLengteLabel(clipLengte)}</Text>
                                <Ionicons name="chevron-down" size={16} color="#017F56" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.saveButton} onPress={slaInstellingenOp}>
                        <Text style={styles.saveButtonText}>Instellingen Opslaan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={20} color="#fff" style={styles.logoutIcon} />
                        <Text style={styles.logoutButtonText}>Uitloggen</Text>
                    </TouchableOpacity>
                </ScrollView>

                <NavBar />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#fff" },
    container: { flex: 1 },
    content: { flex: 1 },
    scrollContent: { paddingBottom: 20 },
    header: {
        backgroundColor: "#017F56",
        paddingVertical: 30,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    backButton: {
        backgroundColor: "#015C40",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    headerTitle: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
    },
    profileSection: { alignItems: "center", paddingVertical: 20 },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#ffffff",
    },
    profileName: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
    editPhotoButton: {
        backgroundColor: "#017F56",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    saveButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
    section: { backgroundColor: "white", margin: 15, borderRadius: 8, padding: 15 },
    sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 15 },
    infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    infoLabel: { fontSize: 14, color: "#333", flex: 1 },
    infoValue: {
        backgroundColor: "#f0f0f0",
        padding: 8,
        borderRadius: 5,
        flex: 2,
        color: "#555",
    },
    settingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    settingLabel: { fontSize: 14, color: "#333" },
    customDropdown: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#017F56",
        minWidth: 130,
    },
    dropdownText: { fontSize: 14, color: "#333", marginRight: 8, flex: 1 },
    saveButton: {
        backgroundColor: "#017F56",
        margin: 15,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    startGuideButton: {
        backgroundColor: "#017F56",
        margin: 15,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    startGuideButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    logoutButton: {
        backgroundColor: "#dc3545",
        margin: 15,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    logoutButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
    logoutIcon: { marginRight: 8 },
})
