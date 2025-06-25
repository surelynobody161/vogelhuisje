import React from "react"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import RecordingItem from "../components/RecordingItem"
import { useRouter } from "expo-router"

const recordings = [
    { id: "1", image: require("../assets/images/bird1.jpg"), description: "een kleine vogeltje in mijn nieuwe tuin", date: "10 juni 2025" },
    { id: "2", image: require("../assets/images/bird2.jpg"), description: "mooie vogels van vanmorgen", date: "8 juni 2025" },
    { id: "3", image: require("../assets/images/bird5.jpg"), description: "vogel eieren in het nestkast", date: "5 juni 2025" },
    { id: "4", image: require("../assets/images/bird3.jpg"), description: "merels paar vlak voor mijn poort", date: "1 juni 2025" },
    { id: "5", image: require("../assets/images/bird4.jpg"), description: "vogel in het park", date: "28 mei 2025" },
]

export default function Recordingscreen() {
    const router = useRouter()

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#00804A" />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#B9FFBC" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mijn Opnames</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.scrollView}>
                <TouchableOpacity style={styles.addButton}>
                    <View style={styles.addButtonIcon}>
                        <Ionicons name="add" size={32} color="white" />
                    </View>
                    <Text style={styles.addButtonText}>maak een nieuw moment aan</Text>
                </TouchableOpacity>

                <View style={styles.recordingsList}>
                    {recordings.map((recording) => (
                        <RecordingItem key={recording.id} recording={recording} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f0" },
    header: {
        backgroundColor: "#017F56",
        paddingVertical: 30,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#015C40",
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1
    },
    scrollView: { flex: 1 },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,
    },
    addButtonIcon: {
        width: 50,
        height: 50,
        backgroundColor: "#4CAF50",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    addButtonText: {
        fontSize: 16,
        marginLeft: 15,
        color: "#333",
    },
    recordingsList: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
})