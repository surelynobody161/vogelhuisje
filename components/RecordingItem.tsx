import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface RecordingItemProps {
    recording: {
        id: string
        image: any
        description: string
        date: string
    }
}

export default function RecordingItem({ recording }: RecordingItemProps) {
    return (
        <View style={styles.container}>
            <Image source={recording.image} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionLabel}>uw beschrijving</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        {recording.description}
                    </Text>
                </View>

                <View style={styles.actionsContainer}>
                    <View style={styles.textAndDeleteContainer}>
                        <TouchableOpacity style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>verwijder opname</Text>
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
        color: "white",
        fontSize: 12,
        marginBottom: 3,
        opacity: 0.9,
    },
    description: {
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
        backgroundColor: "white",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
        alignSelf: "flex-start",
    },
    deleteButtonText: {
        color: "#015C40",
        fontSize: 12,
        fontWeight: "500",
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
