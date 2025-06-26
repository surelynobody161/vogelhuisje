import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


interface RecordingItemProps {
    recording: {
        recording_id: string;
        image: string;
        description: string;
        date: string;
    };
    onDelete: () => void;
}

const imageMap = {
    'live1.png': require('../assets/images/live1.png'),
    'live2.png': require('../assets/images/live2.png'),
    'live3.png': require('../assets/images/live3.png'),
    'live4.png': require('../assets/images/live4.png'),
    'live5.png': require('../assets/images/live5.png'),
};

export default function RecordingItem({ recording, onDelete }: RecordingItemProps) {
    return (
        <View style={styles.container}>
            <Image source={imageMap[recording.image as keyof typeof imageMap] || imageMap['live1.png']} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionLabel}>uw beschrijving</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        {recording.description}
                    </Text>
                </View>

                <View style={styles.actionsContainer}>
                    <View style={styles.textAndDeleteContainer}>
                        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                            <Text style={styles.deleteButtonText}>Verwijder opname</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.playButton}>
                        <Ionicons name="play" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: "100%",
        height: 120,
        resizeMode: "cover",
    },
    infoContainer: {
        backgroundColor: "#00804A",
        padding: 12,
    },
    descriptionContainer: {
        marginBottom: 12,
    },
    descriptionLabel: {
        fontFamily: "SpaceGrotesk-Regular",
        color: "white",
        fontSize: 12,
        marginBottom: 3,
        opacity: 0.9,
    },
    description: {
        fontFamily: "Radikal-Regular",
        color: "white",
        fontSize: 14,
        lineHeight: 18,
    },
    actionsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textAndDeleteContainer: {
        flex: 1,
        alignItems: "flex-start",
    },
    deleteButton: {
        backgroundColor: "#B9FFBC",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 18,
        alignSelf: "flex-start",
    },
    deleteButtonText: {
        fontFamily: "Radikal-Regular",
        color: "black",
        fontSize: 13,
        fontWeight: "600",
    },
    playButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#015C40",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 12,
    },
})
