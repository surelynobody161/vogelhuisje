import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ImageBackground } from "expo-image";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function huisjeDetails() {
    const router = useRouter();

    const styles = StyleSheet.create({
        header: {
            backgroundColor: '#017F56',
            height: 107,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
        },
        backButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#015C40',
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerText: {
            color: 'white',
            fontSize: 32,
            fontWeight: 'bold',
            textAlign: 'center',
            flex: 1,
            padding: 10,
        },
        detailsContainer: {
            flex: 1,
            backgroundColor: '#017F56',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
        },
        detailsSubTextContainer: {
            marginTop: -30,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            backgroundColor: '#017F56',
            width: 100,
            height: 30,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
        },
        detailsSubText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
        },
        detailsTextContainer: {
            padding: 20,
            margin: 10,
        },
        detailsText: {
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
        },
        detailsMap: {
            width: 300,
            height: 200,
        },
        mapContainer: {
            borderRadius: 10,
            overflow: 'hidden',
        }
    });

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView>
                    <View>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                                <Ionicons name="chevron-back" size={28} color="#B9FFBC" />
                            </TouchableOpacity>
                            <Text style={styles.headerText}>De Hoge Veluwe</Text>
                            <View style={{ width: 40 }} />
                        </View>
                        <View>
                            <ImageBackground source={require('../assets/images/MijnHuisjeDetailImage.png')} style={{ width: '100%', height: 250 }} />
                        </View>
                        <View style={styles.detailsSubTextContainer}>
                            <Text style={styles.detailsSubText}>Details</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                            <View style={styles.detailsTextContainer}>
                                <Text style={styles.detailsText}>Huurstatus: Actief</Text>
                                <Text style={styles.detailsText}>Gehuurd sinds: 10 mei 2025</Text>
                                <Text style={styles.detailsText}>Huurperiode: 3 maanden</Text>
                                <Text style={styles.detailsText}>Verloopt op: 10 augustus 2025</Text>
                            </View>
                            <View style={styles.mapContainer}>
                                <MapView
                                    style={styles.detailsMap}
                                    initialRegion={{
                                        latitude: 18.978189,
                                        longitude: 73.024911,
                                        latitudeDelta: 0.01,
                                        longitudeDelta: 0.01,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}