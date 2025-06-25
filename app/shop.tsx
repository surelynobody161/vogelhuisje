import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../components/NavBar';
import api from './api';
import { useFavorites } from './FavoritesContext';

export default function Shop() {
    const router = useRouter();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [showFavorites, setShowFavorites] = useState(false);
    const [shopItems, setShopItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [connectionTested, setConnectionTested] = useState(false);

    const { favorites, toggleFavorite } = useFavorites();

    // Test server connection first
    useEffect(() => {
        const testConnection = async () => {
            try {
                console.log('[DEBUG] Testing server connection...');
                const startTime = Date.now();
                const result = await api.testConnection();
                console.log(`[DEBUG] Server connection successful (${Date.now() - startTime}ms):`, result);
                setConnectionTested(true);
                fetchShopItems();
            } catch (err) {
                console.error('[DEBUG] Server connection failed:', {
                    name: err.name,
                    message: err.message,
                    stack: err.stack
                });
                setError(
                    err.message.includes('timed out')
                        ? 'Server niet bereikbaar (timeout)'
                        : `Netwerkfout: ${err.message}`
                );
                setLoading(false);
            }
        };
        testConnection();
    }, []);

    const fetchShopItems = async () => {
        try {
            console.log('[DEBUG] Fetching shop items...');
            setLoading(true);
            setError(null);
            const startTime = Date.now();

            const response = await api.getShopItems();
            console.log(`[DEBUG] Received response in ${Date.now() - startTime}ms`);

            const responseData = await response.json();
            console.log('[DEBUG] Response data:', responseData);

            if (!responseData?.data) {
                throw new Error('Ongeldig server antwoord: geen data gevonden');
            }

            setShopItems(responseData.data);
        } catch (err) {
            console.error('[DEBUG] Error fetching shop items:', {
                name: err.name,
                message: err.message,
                stack: err.stack
            });
            setError(err.message || 'Fout bij ophalen van producten');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleFavorite = async (itemId: number) => {
        try {
            console.log('[DEBUG] Toggling favorite for item:', itemId);
            await api.toggleFavorite(itemId);
            toggleFavorite(itemId.toString());
        } catch (err) {
            console.error('[DEBUG] Error toggling favorite:', {
                name: err.name,
                message: err.message
            });
        }
    };

    const handleRetry = () => {
        console.log('[DEBUG] Retrying connection...');
        setError(null);
        setLoading(true);
        setConnectionTested(false);
    };

    if (!connectionTested && loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00794D" />
                <Text style={styles.loadingText}>Verbinden met server...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons name="warning" size={50} color="#FF3B30" />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={handleRetry}
                >
                    <Text style={styles.retryButtonText}>Opnieuw proberen</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Filter items
    let filteredItems = shopItems;
    if (selectedSize) {
        filteredItems = filteredItems.filter(item => item.size === selectedSize);
    }
    if (search.trim()) {
        filteredItems = filteredItems.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }
    if (showFavorites) {
        filteredItems = filteredItems.filter(item =>
            favorites.includes(item.item_id.toString())
        );
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
                    <Ionicons name="search" size={24} color="#00794D" />
                    <TouchableOpacity
                        onPress={() => setShowFavorites(!showFavorites)}
                        style={styles.favoriteToggle}
                    >
                        <Ionicons
                            name={showFavorites ? "heart" : "heart-outline"}
                            size={24}
                            color={showFavorites ? "#FF3B30" : "#00794D"}
                        />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={filteredItems}
                    keyExtractor={(item) => item.item_id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
                    ListHeaderComponent={
                        <>
                            {shopItems.find(item => item.sale) && (
                                <TouchableOpacity
                                    style={styles.saleCard}
                                    onPress={() => router.push(`/detail/${shopItems.find(item => item.sale)?.item_id}`)}
                                >
                                    <View style={styles.saleBadge}>
                                        <Text style={styles.saleText}>SALE</Text>
                                    </View>
                                    <Image
                                        source={{ uri: shopItems.find(item => item.sale)?.image_url || 'https://via.placeholder.com/100' }}
                                        style={styles.mainImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.productNameLarge}>
                                        {shopItems.find(item => item.sale)?.name}
                                    </Text>
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.price}>
                                            € {shopItems.find(item => item.sale)?.price}/jaar
                                        </Text>
                                        {shopItems.find(item => item.sale)?.oldPrice && (
                                            <Text style={styles.oldPrice}>
                                                € {shopItems.find(item => item.sale)?.oldPrice}/jaar
                                            </Text>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            )}
                            <View style={styles.sizeButtons}>
                                {['Klein', 'Middel', 'Groot'].map((size) => (
                                    <TouchableOpacity
                                        key={size}
                                        style={[
                                            styles.sizeButton,
                                            selectedSize === size && styles.sizeButtonSelected
                                        ]}
                                        onPress={() => setSelectedSize(selectedSize === size ? null : size)}
                                    >
                                        <Ionicons
                                            name="home-outline"
                                            size={28}
                                            color={selectedSize === size ? "#00794D" : "white"}
                                        />
                                        <Text style={[
                                            styles.sizeText,
                                            selectedSize === size && styles.sizeTextSelected
                                        ]}>
                                            {size}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => router.push(`/detail/${item.item_id}`)}
                        >
                            {item.sale && (
                                <View style={styles.cardSaleBadge}>
                                    <Text style={styles.cardSaleText}>SALE</Text>
                                </View>
                            )}
                            <Image
                                source={{ uri: item.image_url || 'https://via.placeholder.com/60' }}
                                style={styles.cardImage}
                                resizeMode="contain"
                            />
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.cardPrice}>€ {item.price}/jaar</Text>
                            <TouchableOpacity
                                style={styles.favoriteButton}
                                onPress={() => handleToggleFavorite(item.item_id)}
                            >
                                <Ionicons
                                    name={favorites.includes(item.item_id.toString()) ? "heart" : "heart-outline"}
                                    size={22}
                                    color={favorites.includes(item.item_id.toString()) ? "#FF3B30" : "#00794D"}
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
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#00794D',
        paddingVertical: 20,
        paddingTop: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 5,
        elevation: 2
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333'
    },
    favoriteToggle: {
        marginLeft: 10,
        padding: 5
    },
    saleCard: {
        backgroundColor: '#00794D',
        margin: 10,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        elevation: 3
    },
    saleBadge: {
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: '#FF3B30',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    saleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12
    },
    mainImage: {
        width: 120,
        height: 120,
        marginVertical: 10
    },
    productNameLarge: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
        textAlign: 'center'
    },
    priceContainer: {
        alignItems: 'center'
    },
    price: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    oldPrice: {
        color: '#ddd',
        fontSize: 14,
        textDecorationLine: 'line-through'
    },
    sizeButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        paddingHorizontal: 5
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
        elevation: 3
    },
    sizeButtonSelected: {
        backgroundColor: '#C9FBCF',
        borderWidth: 2,
        borderColor: '#00794D'
    },
    sizeText: {
        color: 'white',
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },
    sizeTextSelected: {
        color: '#00794D'
    },
    card: {
        width: '48%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        elevation: 2,
        borderWidth: 1,
        borderColor: '#eee'
    },
    cardImage: {
        width: 80,
        height: 80,
        marginBottom: 8
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
        textAlign: 'center'
    },
    cardPrice: {
        color: '#00794D',
        fontWeight: 'bold',
        fontSize: 16
    },
    cardSaleBadge: {
        position: 'absolute',
        top: 5,
        left: 5,
        backgroundColor: '#FF3B30',
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 4
    },
    cardSaleText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold'
    },
    favoriteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        padding: 4
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    loadingText: {
        marginTop: 15,
        color: '#00794D',
        fontSize: 16
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 18,
        marginVertical: 15,
        textAlign: 'center'
    },
    retryButton: {
        backgroundColor: '#00794D',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        elevation: 3
    },
    retryButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
});