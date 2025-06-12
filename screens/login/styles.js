import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 24,
        justifyContent: "center",
    },
    topHeader: {
        backgroundColor: "#e8e8e8",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    topHeaderText: {
        fontSize: 16,
        color: "#999",
        fontWeight: "400",
    },
    greenHeader: {
        backgroundColor: "#2e8b57",
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        gap: 16,
    },
    backArrow: {
        marginRight: 16,
    },
    headerTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "500",
    },
    form: {
        backgroundColor: "white",
        padding: 24,
        marginTop: 20,
        borderRadius: 8,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: "#333",
        marginBottom: 32,
    },
    input: {
        backgroundColor: "#f0f0f0",
        borderRadius: 4,
        fontSize: 16,
        color: "#333",
        padding: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#2e8b57",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 24,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    divider: {
        width: 60,
        height: 3,
        backgroundColor: "#2e8b57",
        alignSelf: "center",
        borderRadius: 2,
        marginVertical: 32,
    },
    registerText: {
        textAlign: "center",
        fontSize: 16,
        color: "#333",
        marginBottom: 16,
    },
});
