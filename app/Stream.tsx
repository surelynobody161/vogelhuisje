import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import LiveStream from "../components/LiveStream";
import { useRouter } from 'expo-router';

export default function Stream() {
    const [note, setNote] = useState('');
    // Update notes type to include note_id and content
    const [notes, setNotes] = useState<{ note_id: string; content: string; timestamp?: string }[]>([]);
    const router = useRouter();
    const { streamId } = useLocalSearchParams();

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            if (!streamId) return;
            // Fetch notes for this streamId from backend
            fetch(`http://145.137.73.193:80/notes?rental_id=${streamId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (isActive) setNotes(data.data || []);
                })
                .catch((err) => console.error("Failed to fetch notes:", err));
            return () => { isActive = false; };
        }, [streamId])
    );

    // Save note to backend
    const handleSaveNote = async () => {
        if (note.trim() && streamId) {
            const newNote = {
                note_id: Date.now().toString(),
                rental_id: streamId,
                content: note,
            };
            try {
                const res = await fetch("http://145.137.73.193:80/notes/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newNote),
                });
                const data = await res.json();
                if (data.success) {
                    setNotes((prev) => [...prev, data.data]);
                    setNote('');
                }
            } catch (err) {
                console.error("Failed to save note:", err);
            }
        }
    };

    // Delete note from backend
    const handleDeleteNote = async (note_id: string) => {
        try {
            const res = await fetch(`http://145.137.73.193:80/notes/${note_id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                setNotes((prevNotes) => prevNotes.filter((n: any) => n.note_id !== note_id));
            }
        } catch (error) {
            console.error('Failed to delete note:', error);
        }
    };

    const handleAddClip = async () => {
        if (!streamId) return;
        const newRecording = {
            recording_id: Date.now().toString(),
            rental_id: "1",
            clip_url: "https://example.com/clip.mp3",
            timestamp: new Date().toISOString(),
            duration: 30,
            note: "Nieuwe opname via Clip knop",
            streamId: streamId, // Make sure this is included
        };
        try {
            const res = await fetch("http://145.137.73.193:80/recordings/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRecording),
            });
            const data = await res.json();
            if (data.success) {
                router.push(`/Recordingscreen?streamId=${streamId}`);
            }
        } catch (err) {
            console.error("Failed to add recording:", err);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <View style={styles.container}>
                <View style={styles.headerRow}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={28} color="#B9FFBC" />
                    </TouchableOpacity>
                    <Text style={styles.header}>Stream</Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* Stream Section */}
                <View style={styles.streamContainer}>
                    <Text style={styles.streamPlaceholder}></Text>
                    <LiveStream/>
                </View>

                {/* Clip Button */}
                <TouchableOpacity
                    style={[styles.saveButton, { marginBottom: 10, alignSelf: 'center', flexDirection: 'row', gap: 8 }]}
                    onPress={handleAddClip}
                >
                    <Ionicons name="cut-outline" size={22} color="white" />
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Clip</Text>
                </TouchableOpacity>

                {/* Notes Section */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Write your note here..."
                        value={note}
                        onChangeText={setNote}
                        multiline
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
                        <Ionicons name="save-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={notes}
                    keyExtractor={(item, index) => item.note_id ? item.note_id : index.toString()}
                    contentContainerStyle={styles.notesList}
                    renderItem={({ item }) => (
                        <View style={styles.noteCard}>
                            <Text style={styles.noteText}>{item.content}</Text>
                            <Text style={styles.timestamp}>{item.timestamp}</Text>
                            <TouchableOpacity
                                style={{ position: 'absolute', top: 8, right: 8 }}
                                onPress={() => handleDeleteNote(item.note_id)}
                            >
                                <Ionicons name="trash-outline" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1, backgroundColor: '#fff'},
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        flex: 1,
    },
    streamContainer: {
        height: 200,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,
    },
    streamPlaceholder: { fontSize: 16, color: '#555' },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#00794D',
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 10,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#00794D',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    notesList: { paddingHorizontal: 10, marginTop: 10 },
    noteCard: {
        backgroundColor: '#00794D',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#fff',
        position: 'relative',
    },
    noteText: { color: 'white', fontSize: 16 },
    timestamp: { color: '#ddd', fontSize: 12, marginTop: 5, textAlign: 'right' },
    deleteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#d9534f',
        borderRadius: 8,
        padding: 4,
    },
});