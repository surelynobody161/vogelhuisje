import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import MijnHuisje from "../components/MijnHuisje";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function MijnHuisjes() {
    const navigation = useNavigation();

    // Function for details navigation
    const handleDetailsPress = (huisjeId) => {
        navigation.navigate('HuisjeDetail', { huisjeId });
    };

    // Function for shop navigation
    const handleHuisjesKopen = () => {
        navigation.navigate('Shop');
    };

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: '#FAF9F6',
            display: 'flex',
            alignItems: 'center',
        },
        header: {
            backgroundColor: '#017F56',
            height: 107,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        },
        headerText: {
            color: 'white',
            fontSize: 32,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 10,
        },
        meerHuisjesTextView: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 340,
            marginTop: 6
        },
        meerHuisjesText: {
            color: 'black',
            fontSize: 16,
            display: 'flex',
        },
        huisjeKopenButtonView: {
            backgroundColor: '#017F56',
            width: '100%',
            height: 94,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginTop: 40
        },
        huisjeKopenButton: {
            backgroundColor: '#B9FFBC',
            width: 249,
            height: 63,
            borderRadius: 10,
            textAlign: 'center',
            padding: 10,
            margin: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 4,
        },
        huisjeKopenText: {
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            display: 'flex',
        }
    });

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.mainContainer}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Mijn huisjes</Text>
                        </View>

                        {/* Pass onDetailsPress to each MijnHuisje */}
                        <MijnHuisje onDetailsPress={() => handleDetailsPress('huisje1')} />
                        <MijnHuisje onDetailsPress={() => handleDetailsPress('huisje2')} />
                        <MijnHuisje onDetailsPress={() => handleDetailsPress('huisje3')} />

                        <View style={styles.meerHuisjesTextView}>
                            <Text style={styles.meerHuisjesText}>
                                Ga naar de lijst met beschikbare vogelhuisjes om meer vogels te bekijken.
                            </Text>
                        </View>

                        <View style={styles.huisjeKopenButtonView}>
                            <Pressable
                                style={styles.huisjeKopenButton}
                                onPress={handleHuisjesKopen}
                            >
                                <Text style={styles.huisjeKopenText}>
                                    Huisjes kopen <AntDesign
                                    style={styles.huisjeKopenText}
                                    name="pluscircle"
                                    size={24}
                                    color="black"
                                />
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}