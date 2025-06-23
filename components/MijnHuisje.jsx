import React from "react"
import { Pressable, Text, View, StyleSheet } from "react-native"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { useNavigation } from "@react-navigation/native"

export default function MijnHuisje() {
    const navigation = useNavigation()

    return (
        <Pressable style={styles.huisjeContainer} onPress={() => console.log("huisje 1")}>
            <View style={styles.huisjeImgContainer}>
                <Text style={styles.huisjeLocatieText}>De Hoge Veluwe</Text>
                {/* <Image source={require('../assets/images/huisje1.png')} style={{width: 355, height: 236}}/> */}
            </View>

            <Text style={styles.huisjeMainText}>Nachtzwaluw</Text>
            <Text style={styles.huisjeSubText}>Geldig van: 3 Juni 2025 tot en met 3 Juni 2026</Text>

            <View style={styles.detailsButtonView}>
                <Pressable
                    style={styles.detailsButton}
                    onPress={() => navigation.navigate("HuisjeDetails")}
                >
                    <Text style={styles.detailsText}>
                        Details{" "}
                        <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
                    </Text>
                </Pressable>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    huisjeContainer: {
        marginTop: 31,
        backgroundColor: "#017F56",
        height: 383,
        width: 355,
        display: "flex",
        borderRadius: 10,
        elevation: 4,
    },
    huisjeLocatieText: {
        backgroundColor: "#017F56",
        borderRadius: 10,
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        padding: 10,
        margin: 10,
    },
    huisjeImgContainer: {
        width: "100%",
        height: 236,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "black",
        display: "flex",
        alignItems: "flex-start",
    },
    huisjeMainText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 13,
        marginTop: 10,
    },
    huisjeSubText: {
        color: "white",
        fontSize: 16,
        marginLeft: 13,
    },
    detailsButtonView: {
        display: "flex",
        flexDirection: "row-reverse",
        padding: 10,
        paddingRight: 20,
        paddingBottom: 20,
        paddingTop: 10,
        paddingLeft: 10,
    },
    detailsButton: {
        backgroundColor: "#B9FFBC",
        width: 100,
        borderRadius: 10,
        textAlign: "center",
        padding: 10,
        display: "flex",
        alignItems: "center",
        elevation: 4,
    },
    detailsText: {
        color: "black",
        fontSize: 16,
        fontWeight: "normal",
    },
})
