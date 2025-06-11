import React, { useEffect, useState } from "react"
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Switch,
    ScrollView,
    SafeAreaView,
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

    // ✅ Profielfoto ophalen bij opstarten
    useEffect(() => {
        const loadProfileImage = async () => {
            const storedUri = await AsyncStorage.getItem("profileImage")
            if (storedUri) {
                setProfileImage(storedUri)
            } else {
                // fallback afbeelding
                setProfileImage("https://randomuser.me/api/portraits/women/44.jpg")
            }
        }
        loadProfileImage()
    }, [])

    // ✅ Foto kiezen en opslaan
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

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mijn Profiel</Text>
            </View>

            <ScrollView style={styles.content}>
                {/* Profielfoto */}
                <View style={styles.profileSection}>
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    <Text style={styles.profileName}>Britney Krabbie</Text>
                    <TouchableOpacity style={styles.editPhotoButton} onPress={pickImage}>
                        <Text style={styles.editPhotoText}>Foto wijzigen</Text>
                    </TouchableOpacity>
                </View>

                {/* Persoonlijke gegevens */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Persoonlijke gegevens</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Naam</Text>
                        <View style={styles.infoValueContainer}>
                            <Text style={styles.infoValue}>Britney Krabbie</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>E-mail</Text>
                        <View style={styles.infoValueContainer}>
                            <Text style={styles.infoValue}>birdney@email.com</Text>
                        </View>
                    </View>
                </View>

                {/* Startgids */}
                <TouchableOpacity
                    style={styles.startGuideButton}
                    onPress={() => navigation.navigate("Intro")}
                >
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

                {/* Opslaan */}
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Instellingen bewaren</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Navigatie onderaan */}
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
