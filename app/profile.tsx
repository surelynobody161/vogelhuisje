import { useState, useEffect } from "react"
import { View, Image, TouchableOpacity, Switch, ScrollView, SafeAreaView, Alert, TextInput, StyleSheet, Text } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import * as ImagePicker from "expo-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"

type RootStackParamList = {
    Home: undefined
    Recorder: undefined
    Profile: undefined
    Intro: undefined
}

export default function ProfielScherm() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [cameraAan, setCameraAan] = useState(true)
    const [notificatiesAan, setNotificatiesAan] = useState(false)
    const [clipLengte, setClipLengte] = useState("30")
    const [profielfoto, setProfielfoto] = useState("https://randomuser.me/api/portraits/women/44.jpg")
    const [naam, setNaam] = useState("Britney Krabbendam")
    const [email, setEmail] = useState("britney@email.com")

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const saved = await AsyncStorage.getItem("profileSettings")
                if (saved) {
                    const data = JSON.parse(saved)
                    setCameraAan(data.cameraAan)
                    setNotificatiesAan(data.notificatiesAan)
                    setClipLengte(data.clipLengte)
                    setProfielfoto(data.profielfoto)
                    setNaam(data.naam)
                    setEmail(data.email)
                }
            } catch (e) {
                // ignore errors
            }
        }
        loadSettings()
    }, [])

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
            quality: 1
        })
        if (!resultaat.canceled) setProfielfoto(resultaat.assets[0].uri)
    }

    const slaInstellingenOp = async () => {
        const data = {
            cameraAan,
            notificatiesAan,
            clipLengte,
            profielfoto,
            naam,
            email,
        }
        try {
            await AsyncStorage.setItem("profileSettings", JSON.stringify(data))
            Alert.alert("Opgeslagen", "Je instellingen zijn opgeslagen.")
        } catch (e) {
            Alert.alert("Fout", "Kon instellingen niet opslaan.")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
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
                            style={[styles.infoValue, {fontSize: 14}]}
                            value={naam}
                            onChangeText={setNaam}
                            placeholder="Vul je naam in"
                        />
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>E-mail</Text>
                        <TextInput
                            style={[styles.infoValue, {fontSize: 14}]}
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
                        <Switch value={cameraAan} onValueChange={setCameraAan} trackColor={{ false: "#d3d3d3", true: "#006e41" }} thumbColor="#ffffff" />
                    </View>
                    <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>Notificaties</Text>
                        <Switch value={notificatiesAan} onValueChange={setNotificatiesAan} trackColor={{ false: "#d3d3d3", true: "#006e41" }} thumbColor="#ffffff" />
                    </View>
                    <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>Clip Lengte</Text>
                        <Picker selectedValue={clipLengte} onValueChange={setClipLengte} style={styles.picker}>
                            <Picker.Item label="30 seconden" value="30" />
                            <Picker.Item label="1 minuut" value="60" />
                            <Picker.Item label="2 minuten" value="120" />
                            <Picker.Item label="Langer" value="long" />
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={slaInstellingenOp}>
                    <Text style={styles.saveButtonText}>Instellingen Opslaan</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white" },
    content: { flex: 1 },
    header: {
        backgroundColor: "#017F56",
        paddingVertical: 30,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center"
    },
    backButton: {
        backgroundColor: "#015C40",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
    },
    headerTitle: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1
    },
    profileSection: {
        alignItems: "center",
        paddingVertical: 20
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#ffffff"
    },
    profileName: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10
    },
    editPhotoButton: {
        backgroundColor: "#017F56",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
        alignItems: "center"
    },
    saveButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    section: {
        backgroundColor: "white",
        margin: 15,
        borderRadius: 8,
        padding: 15
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12
    },
    infoLabel: {
        fontSize: 14,
        color: "#333",
        flex: 1
    },
    infoValue: {
        backgroundColor: "#f0f0f0",
        padding: 8,
        borderRadius: 5,
        flex: 2,
        color: "#555"
    },
    settingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15
    },
    settingLabel: {
        fontSize: 14,
        color: "#333"
    },
    saveButton: {
        backgroundColor: "#017F56",
        margin: 15,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center"
    },
    startGuideButton: {
        backgroundColor: "#017F56",
        margin: 15,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center"
    },
    startGuideButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },
    picker: {
        height: 40,
        width: 160,
        backgroundColor: "#f0f0f0",
        borderRadius: 8
    },
})