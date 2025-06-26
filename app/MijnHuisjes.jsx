import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MijnHuisje from '../components/MijnHuisje';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NavBar from './NavBar';

export default function MijnHuisjes() {
    const navigation = useNavigation();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea} edges={['bottom']}>
                <View style={styles.mainContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Mijn huisjes</Text>
                        </View>

                        <MijnHuisje />
                        <MijnHuisje />
                        <MijnHuisje />

                        <View style={styles.meerHuisjesTextView}>
                            <Text style={styles.meerHuisjesText}>
                                Ga naar de lijst met beschikbare vogelhuisjes om meer vogels te bekijken.
                            </Text>
                        </View>

                        <View style={styles.huisjeKopenButtonView}>
                            <Pressable
                                style={styles.huisjeKopenButton}
                                onPress={() => navigation.navigate('Shop')}
                                accessibilityLabel="Ga naar de shop om huisjes te kopen"
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.huisjeKopenText}>Huisjes kopen </Text>
                                    <AntDesign name="pluscircle" size={24} color="black" />
                                </View>
                            </Pressable>
                        </View>
                    </ScrollView>

                    <NavBar />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAF9F6',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#FAF9F6',
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    header: {
        backgroundColor: '#017F56',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: '100%',
    },
    headerText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    meerHuisjesTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 340,
        marginTop: 6,
    },
    meerHuisjesText: {
        color: 'black',
        fontSize: 16,
    },
    huisjeKopenButtonView: {
        backgroundColor: '#017F56',
        width: '100%',
        height: 94,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 40,
    },
    huisjeKopenButton: {
        backgroundColor: '#B9FFBC',
        width: 249,
        height: 63,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        elevation: 4,
    },
    huisjeKopenText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
