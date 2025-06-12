import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../components/NavBar';
import { useFavorites } from './FavoritesContext'; // <-- Add this import

const birdhouses = [
    { id: '1', name: 'Vogelhuisje A', price: '€ 14.95/jaar', size: 'Klein', sale: false, image: require('../assets/images/vogelhuisa.png') },
    { id: '2', name: 'Vogelhuisje B', price: '€ 12.75/jaar', oldPrice: '€ 16.95/jaar', size: 'Klein', sale: true, image: require('../assets/images/vogelhuisa.png') },
    { id: '3', name: 'Vogelhuisje C', price: '€ 12.95/jaar', size: 'Middel', sale: false, image: require('../assets/images/vogelhuisa.png') },
    { id: '4', name: 'Vogelhuisje D', price: '€ 10.95/jaar', size: 'Groot', sale: false, image: require('../assets/images/vogelhuisa.png') },
];

//test

export default function Shop() {
    const router = useRouter();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [showFavorites, setShowFavorites] = useState(false);

    const { favorites, toggleFavorite } = useFavorites(); // <-- Add this line here

    // Filtering logic
    let filtered = birdhouses;
    if (selectedSize) {
        filtered = filtered.filter(b => b.size === selectedSize);
    }
    if (search.trim()) {
        filtered = filtered.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (showFavorites) {
        filtered = filtered.filter(b => favorites.includes(b.id));
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <View style={styles.container}>
                <Text style={styles.header}>Huisje zoeken</Text>

                <View style={styles.searchBar}>
                    <TextInput
                        placeholder="Zoeken..."
                        style={styles.input}
                        value={search}
                        onChangeText={setSearch}
                    />
                    <Ionicons name="search" size={24} />
                    <TouchableOpacity onPress={() => setShowFavorites(fav => !fav)}>
                        <Ionicons
                            name={showFavorites ? "heart" : "heart-outline"}
                            size={24}
                            color={showFavorites ? "orangered" : undefined}
                            style={{ marginLeft: 10 }}
                        />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    ListHeaderComponent={
                        <>
                            <TouchableOpacity
                                style={styles.saleCard}
                                onPress={() => router.push(`/detail/2`)}
                            >
                                <View style={styles.saleBadge}><Text style={styles.saleText}>SALE</Text></View>
                                <Image source={require('../assets/images/vogelhuisa.png')} style={styles.mainImage} />
                                <Text style={styles.productNameLarge}>Vogelhuisje B</Text>
                                <Text style={styles.price}>€ 12.75/jaar</Text>
                                <Text style={styles.oldPrice}>€ 16.95/jaar</Text>
                            </TouchableOpacity>
                            <View style={styles.sizeButtons}>
                                {['Klein', 'Middel', 'Groot'].map((size) => (
                                    <TouchableOpacity
                                        key={size}
                                        style={[
                                            styles.sizeButton,
                                            selectedSize === size && { borderWidth: 3, borderColor: '#C9FBCF' }
                                        ]}
                                        onPress={() => setSelectedSize(selectedSize === size ? null : size)}
                                    >
                                        <Ionicons name="home-outline" size={28} color="white" />
                                        <Text style={styles.sizeText}>{size}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => router.push(`/detail/${item.id}`)}
                        >
                            {item.sale && <Text style={styles.cardSaleBadge}>SALE</Text>}
                            <Image source={item.image} style={styles.cardImage} />
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.cardPrice}>{item.price}</Text>
                            <TouchableOpacity
                                style={{ position: 'absolute', top: 8, right: 8 }}
                                onPress={() => toggleFavorite(item.id)}
                            >
                                <Ionicons
                                    name={favorites.includes(item.id) ? "heart" : "heart-outline"}
                                    size={22}
                                    color={favorites.includes(item.id) ? "orangered" : "white"}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />

                <NavBar />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#00794D',
        paddingVertical: 20,
        paddingTop: 40, // Optional if SafeAreaView handles it
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 10, marginHorizontal: 10, borderRadius: 10, marginTop: 10 },
    input: { flex: 1, fontSize: 16 },
    saleCard: {
        backgroundColor: '#00794D',
        margin: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
    },    
    saleBadge: { position: 'absolute', left: 0, top: 0, backgroundColor: 'red', padding: 4, borderTopLeftRadius: 10, borderBottomRightRadius: 10 },
    saleText: { color: 'white', fontWeight: 'bold' },
    mainImage: { width: 100, height: 100, marginTop: 10 },
    price: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    oldPrice: { textDecorationLine: 'line-through', color: '#ddd' },
    sizeButtons: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
    sizeButton: {
        backgroundColor: '#00794D',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 90,
        borderRadius: 16,
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: '#fff',
    },
    sizeText: { color: 'white', marginTop: 8, fontSize: 20, fontWeight: 'bold' },
    card: {
        width: '48%',
        backgroundColor: '#00794D',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
    },    cardImage: { width: 60, height: 60, marginBottom: 5 },
    productName: { fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 4, textAlign: 'center' },
    productNameLarge: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 4, textAlign: 'center' },
    cardPrice: { color: 'white', fontWeight: 'bold', fontSize: 18 },
    cardSaleBadge: { position: 'absolute', top: 4, left: 4, backgroundColor: 'red', color: 'white', paddingHorizontal: 4, borderRadius: 4, fontSize: 10 },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#00794D',
        paddingBottom: 20,
    },
    navIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
});