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
    const { streamId } = useLocalSearchParams();
    const [recordings, setRecordings] = useState<Recording[]>([]);

    useEffect(() => {
        let isMounted = true;
        const loadRecordings = async () => {
            if (!streamId) return;
            fetch(`http://145.137.73.193:80/recordings?streamId=${streamId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (isMounted) {
                        setRecordings(data.data || []);
                        AsyncStorage.setItem(`recordings_${streamId}`, JSON.stringify(data.data || []));
                    }
                })
                .catch((err) => console.error("Failed to fetch recordings:", err));
        };
        loadRecordings();
        return () => { isMounted = false; };
    }, [streamId]);

    // Save recordings to AsyncStorage when leaving the screen
    useFocusEffect(
        React.useCallback(() => {
            return () => {
                AsyncStorage.setItem(`recordings_${streamId}`, JSON.stringify(recordings)).catch(() => { });
            };
        }, [recordings, streamId])
    );

    const handleAddRecording = async () => {
        const newRecording = {
            recording_id: Date.now().toString(),
            rental_id: "1",
            streamId, // link to vogelhuisje
            clip_url: "https://example.com/clip.mp3",
            timestamp: new Date().toISOString(),
            duration: 30,
        };

        try {
            const res = await fetch("http://145.137.73.193:80/recordings/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRecording),
            });
            const data = await res.json();
            if (data.success) {
                setRecordings((prev) => [data.data, ...prev]);
            }
        } catch (err) {
            console.error("Failed to add recording:", err);
        }
    }

    const handleDeleteRecording = async (id) => {
        console.log('Deleting recording with id:', id); // Add this for debugging
        try {
            const res = await fetch(`http://145.137.73.193:80/recordings/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                setRecordings(prev => prev.filter(r => r.recording_id !== id));
            } else {
                console.error('Backend did not delete:', data);
            }
        } catch (err) {
            console.error('Failed to delete recording:', err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#00804A" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mijn Opnames</Text>
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
    recordingsList: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
})
