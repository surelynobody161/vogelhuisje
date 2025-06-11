import React from "react"
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

export default function ProfileScreen() {
    const navigation = useNavigation()

    const [cameraEnabled, setCameraEnabled] = React.useState(true)
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(false)
    const [textSize, setTextSize] = React.useState("medium")
    const [clipLength, setClipLength] = React.useState("30")

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
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.profileName}>Britney Krabbie</Text>
                    <TouchableOpacity style={styles.editPhotoButton}>
                        <Text style={styles.editPhotoText}>Foto wijzigen</Text>
                    </TouchableOpacity>
                </View>

                {/* Personal Information Section */}
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

                {/* ✅ Startgids knop BOVEN instellingen */}
                <TouchableOpacity
                    style={styles.startGuideButton}
                    onPress={() => navigation.navigate("Intro")}
                >
                    <Text style={styles.startGuideButtonText}>Startgids</Text>
                </TouchableOpacity>

                {/* Settings Section */}
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

                {/* Save Settings Button */}
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Instellingen bewaren</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Bottom Navigation */}
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
