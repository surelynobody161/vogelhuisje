import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        backgroundColor: "#006e41",
        paddingVertical: 30,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        zIndex: 1,
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    content: {
        flex: 1,
    },
    profileSection: {
        alignItems: "center",
        paddingVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#ffffff",
        alignSelf: "center",
        marginTop: -50, // laat 'm in de header vallen
        zIndex: 2, // zorg dat hij boven ligt
    },
    profileName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    editPhotoButton: {
        backgroundColor: "#006e41",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    editPhotoText: {
        color: "white",
        fontWeight: "500",
    },
    section: {
        backgroundColor: "white",
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 8,
        padding: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    infoLabel: {
        fontSize: 14,
        color: "#333",
    },
    infoValueContainer: {
        backgroundColor: "#f0f0f0",
        padding: 8,
        borderRadius: 5,
        flex: 1,
        marginLeft: 15,
    },
    infoValue: {
        fontSize: 14,
        color: "#555",
    },
    settingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    settingLabel: {
        fontSize: 14,
        color: "#333",
    },
    saveButton: {
        backgroundColor: "#006e41",
        marginHorizontal: 15,
        marginVertical: 20,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    saveButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    bottomNav: {
        flexDirection: "row",
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
        height: 60,
    },
    navItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    activeNavItem: {
        borderTopWidth: 2,
        borderTopColor: "#006e41",
    },
    startGuideButton: {
        backgroundColor: "#006e41",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
        alignSelf: "center",
    },
    startGuideButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    picker: {
        height: 40,
        width: 160,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        marginLeft: 8,
    },

})

