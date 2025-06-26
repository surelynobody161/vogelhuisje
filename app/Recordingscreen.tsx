import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import RecordingItem from "../components/RecordingItem";
import NavBar from "./NavBar";

type Recording = {
    recording_id: string;
    rental_id: string;
    clip_url: string;
    timestamp: string;
    duration: number;
    note: string;
};

export default function App() {
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
                <View style={styles.recordingsList}>
                    {recordings.map((recording) => (
                        <RecordingItem
                            key={recording.recording_id}
                            recording={recording}
                            onDelete={() => handleDeleteRecording(recording.recording_id)}
                        />
                    ))}
                </View>
            </ScrollView>
            <NavBar/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f0",
    },
    header: { backgroundColor: "#017F56", paddingVertical: 30, paddingHorizontal: 16, flexDirection: "row", alignItems: "center" },

    headerTitle: { color: "white", fontSize: 25, fontWeight: "bold", textAlign: "center", flex: 1 },
    scrollView: {
        flex: 1,
    },
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