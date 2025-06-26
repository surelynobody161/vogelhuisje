import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api';
import { useFavorites } from './FavoritesContext';
import NavBar from './NavBar';

type Birdhouse = {
    id: number | string;
    name: string;
    size: string;
    image_url: string;
    price: number;
    oldPrice?: number;
    sale?: boolean;
};

export default function Shop() {
    const router = useRouter();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [showFavorites, setShowFavorites] = useState(false);
    const [items, setItems] = useState<Birdhouse[]>([]);

    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        const loadItems = async () => {
            try {
                const res = await api.getAvailableBirdhouses();
                setItems(res);
            } catch (err) {
                console.error('Fout bij laden van birdhouses', err);
            }
        };
        loadItems();
    }, []);

    let filtered = items;
    if (selectedSize) filtered = filtered.filter(b => b.size === selectedSize);
    if (search.trim()) filtered = filtered.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));
    if (showFavorites) filtered = filtered.filter(b => favorites.includes(String(b.id)));

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
                    <TouchableOpacity onPress={() => setShowFavorites(f => !f)}>
                        <Ionicons
                            name={showFavorites ? "heart" : "heart-outline"}
                            size={24}
                            color={showFavorites ? "orangered" : undefined}
                            style={{ marginLeft: 10 }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.sizeButtons}>
                    {['Klein', 'Middel', 'Groot'].map(size => (
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

                <FlatList
                    data={filtered}
                    keyExtractor={item => String(item.id)}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => router.push(`/detail/${item.id}`)}
                        >
                            {item.sale && <Text style={styles.cardSaleBadge}>SALE</Text>}
                            <Image source={{ uri: item.image_url }} style={styles.cardImage} />
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.cardPrice}>€ {item.price}/jaar</Text>
                            {item.oldPrice && (
                                <Text style={styles.oldPrice}>€ {item.oldPrice}/jaar</Text>
                            )}
                            <TouchableOpacity
                                style={{ position: 'absolute', top: 8, right: 8 }}
                                onPress={() => toggleFavorite(String(item.id))}
                            >
                                <Ionicons
                                    name={favorites.includes(String(item.id)) ? "heart" : "heart-outline"}
                                    size={22}
                                    color={favorites.includes(String(item.id)) ? "orangered" : "white"}
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
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#00794D',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    input: { flex: 1, fontSize: 16 },
    sizeButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
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
    },
    cardImage: { width: 60, height: 60, marginBottom: 5 },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
        textAlign: 'center',
    },
    cardPrice: { color: 'white', fontWeight: 'bold', fontSize: 18 },
    oldPrice: {
        textDecorationLine: 'line-through',
        color: '#ddd',
        fontSize: 14,
    },
    cardSaleBadge: {
        position: 'absolute',
        top: 4,
        left: 4,
        backgroundColor: 'red',
        color: 'white',
        paddingHorizontal: 4,
        borderRadius: 4,
        fontSize: 10,
    },
});
