import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import NavBar from './NavBar';
import LiveStream from "../components/LiveStream";

export default function Stream() {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState<{ text: string; timestamp: string }[]>([]);

    const handleSaveNote = () => {
        if (note.trim()) {
            const timestamp = new Date().toLocaleTimeString();
            setNotes([...notes, { text: note, timestamp }]);
            setNote('');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <View style={styles.container}>
                <Text style={styles.header}>Stream</Text>

                {/* Stream Section */}
                <View style={styles.streamContainer}>
                    <Text style={styles.streamPlaceholder}></Text>
                    <LiveStream/>
                </View>

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
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.notesList}
                    renderItem={({ item }) => (
                        <View style={styles.noteCard}>
                            <Text style={styles.noteText}>{item.text}</Text>
                            <Text style={styles.timestamp}>{item.timestamp}</Text>
                        </View>
                    )}
                />

                <NavBar />
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
        backgroundColor: '#00794D',
        paddingVertical: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
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
    },
    noteText: { color: 'white', fontSize: 16 },
    timestamp: { color: '#ddd', fontSize: 12, marginTop: 5, textAlign: 'right' },
});