import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Switch,
    ScrollView,
    SafeAreaView,
    Alert,
    TextInput,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import { Ionicons } from "@expo/vector-icons"
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function ProfileScreen() {
    const navigation = useNavigation()

    const [cameraEnabled, setCameraEnabled] = useState(true)
    const [notificationsEnabled, setNotificationsEnabled] = useState(false)
    const [textSize, setTextSize] = useState("medium")
    const [clipLength, setClipLength] = useState("30")
    const [profileImage, setProfileImage] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        const loadData = async () => {
            const storedCamera = await AsyncStorage.getItem("cameraEnabled")
            const storedNotifications = await AsyncStorage.getItem("notificationsEnabled")
            const storedTextSize = await AsyncStorage.getItem("textSize")
            const storedClipLength = await AsyncStorage.getItem("clipLength")
            const storedImage = await AsyncStorage.getItem("profileImage")
            const storedName = await AsyncStorage.getItem("userName")
            const storedEmail = await AsyncStorage.getItem("userEmail")

            if (storedCamera !== null) setCameraEnabled(storedCamera === "true")
            if (storedNotifications !== null) setNotificationsEnabled(storedNotifications === "true")
            if (storedTextSize) setTextSize(storedTextSize)
            if (storedClipLength) setClipLength(storedClipLength)
            if (storedImage) setProfileImage(storedImage)
            else setProfileImage("https://randomuser.me/api/portraits/women/44.jpg")
            if (storedName) setName(storedName)
            if (storedEmail) setEmail(storedEmail)
        }

        loadData()
    }, [])

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (permission.status !== "granted") {
            alert("Toegang tot je fotobibliotheek is nodig.")
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (!result.canceled) {
            const uri = result.assets[0].uri
            setProfileImage(uri)
            await AsyncStorage.setItem("profileImage", uri)
        }
    }

    const saveSettings = async () => {
        try {
            await AsyncStorage.setItem("cameraEnabled", cameraEnabled.toString())
            await AsyncStorage.setItem("notificationsEnabled", notificationsEnabled.toString())
            await AsyncStorage.setItem("textSize", textSize)
            await AsyncStorage.setItem("clipLength", clipLength)
            await AsyncStorage.setItem("userName", name)
            await AsyncStorage.setItem("userEmail", email)
            Alert.alert("Opgeslagen", "Je instellingen zijn succesvol bewaard.")
        } catch (error) {
            Alert.alert("Fout", "Er ging iets mis bij het opslaan.")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                {/* Header (nu binnen ScrollView, dus niet sticky) */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color="#B9FFBC" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Mijn Profiel</Text>
                </View>

                {/* Profielfoto */}
                <View style={styles.profileSection}>
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    <Text style={styles.profileName}>{name || "Gebruiker"}</Text>
                    <TouchableOpacity style={styles.editPhotoButton} onPress={pickImage}>
                        <Text style={styles.saveButtonText}>Foto wijzigen</Text>
                    </TouchableOpacity>
                </View>

                {/* Persoonlijke gegevens */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Persoonlijke gegevens</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Naam</Text>
                        <View style={styles.infoValueContainer}>
                            <TextInput
                                style={styles.infoValue}
                                value={name}
                                onChangeText={setName}
                                placeholder="Voer je naam in"
                            />
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>E-mail</Text>
                        <View style={styles.infoValueContainer}>
                            <TextInput
                                style={styles.infoValue}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Voer je e-mail in"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>
                </View>

                {/* Startgids knop */}
                <TouchableOpacity style={styles.startGuideButton} onPress={() => navigation.navigate("Intro")}>
                    <Text style={styles.startGuideButtonText}>Startgids</Text>
                </TouchableOpacity>

                {/* Instellingen */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Instellingen</Text>

                    <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>Camera-gebruik aan</Text>
                        <Switch
                            value={cameraEnabled}
                            onValueChange={setCameraEnabled}
                            trackColor={{ false: "#d3d3d3", true: "#006e41" }}
                            thumbColor="#ffffff"
                        />
                    </View>

                    <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>Meldingen</Text>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: "#d3d3d3", true: "#006e41" }}
                            thumbColor="#ffffff"
                        />
                    </View>

                    <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>Tekstgrootte</Text>
                        <Picker
                            selectedValue={textSize}
                            onValueChange={(value) => setTextSize(value)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Klein" value="small" />
                            <Picker.Item label="Medium" value="medium" />
                            <Picker.Item label="Groot" value="large" />
                        </Picker>
                    </View>

                    <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>Clip lengte</Text>
                        <Picker
                            selectedValue={clipLength}
                            onValueChange={(value) => setClipLength(value)}
                            style={styles.picker}
                        >
                            <Picker.Item label="30 seconden" value="30" />
                            <Picker.Item label="1 minuut" value="60" />
                            <Picker.Item label="2 minuten" value="120" />
                            <Picker.Item label="Verder" value="long" />
                        </Picker>
                    </View>
                </View>

                {/* Instellingen opslaan */}
                <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
                    <Text style={styles.saveButtonText}>Instellingen bewaren</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Navigatie onderin */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="home-outline" size={24} color="#777" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="mic-outline" size={24} color="#777" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
                    <Ionicons name="person" size={24} color="#006e41" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
