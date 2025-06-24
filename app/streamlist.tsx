import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const streams = [
    {
        id: "1",
        title: "Vogelhuisje 1",
        description: "Live stream van het eerste vogelhuisje.",
    },
    {
        id: "2",
        title: "Vogelhuisje 2",
        description: "Bekijk de vogels in het tweede vogelhuisje.",
    },
    {
        id: "3",
        title: "Vogelhuisje 3",
        description: "Een kijkje in het derde vogelhuisje.",
    },
    {
        id: "4",
        title: "Vogelhuisje 4",
        description: "Live beelden van het vierde vogelhuisje.",
    },
    {
        id: "5",
        title: "Vogelhuisje 5",
        description: "Het vijfde vogelhuisje in actie.",
    },
];

export default function StreamList({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#00804A" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Live Cameras</Text>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.streamsList}>
                    {streams.map((stream) => (
                        <View key={stream.id} style={styles.streamItem}>
                            <View style={styles.streamImageContainer}>
                                <Text style={styles.placeholderText}>[Image Placeholder]</Text>
                                <TouchableOpacity
                                    style={styles.playButton}
                                    onPress={() => navigation.navigate("Stream", { streamId: stream.id })}
                                >
                                    <Ionicons name="play-circle" size={50} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.streamDetailsBar}>
                                <Text style={styles.streamTitle}>{stream.title}</Text>
                                <TouchableOpacity
                                    style={styles.goToButton}
                                    onPress={() => navigation.navigate("RecordingScreen", { streamId: stream.id })}
                                >
                                    <Text style={styles.goToButtonText}>Go to Recordings</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f0",
    },
    header: {
        backgroundColor: "#017F56",
        paddingVertical: 30,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    headerTitle: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    streamsList: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    streamItem: {
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    streamImageContainer: {
        height: 200,
        backgroundColor: "#e0e0e0",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    placeholderText: {
        fontSize: 16,
        color: "#666",
    },
    playButton: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
    streamDetailsBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    streamTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    goToButton: {
        backgroundColor: "#017F56",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    goToButtonText: {
        color: "white",
        fontSize: 14,
    },
});