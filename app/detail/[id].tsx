import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../FavoritesContext';

const birdhouses = [
    { id: '1', name: 'Vogelhuisje A', price: '€ 14.95/jaar', size: 'Klein', sale: false, image: require('../../assets/images/vogelhuisa.png') },
    { id: '2', name: 'Vogelhuisje B', price: '€ 12.75/jaar', oldPrice: '€ 16.95/jaar', size: 'Klein', sale: true, image: require('../../assets/images/vogelhuisa.png') },
    { id: '3', name: 'Vogelhuisje C', price: '€ 12.95/jaar', size: 'Middel', sale: false, image: require('../../assets/images/vogelhuisa.png') },
    { id: '4', name: 'Vogelhuisje D', price: '€ 10.95/jaar', size: 'Groot', sale: false, image: require('../../assets/images/vogelhuisa.png') },
];

export default function Detail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const product = birdhouses.find(b => b.id === id);
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = favorites.includes(product.id);

    if (!product) return <Text>Niet gevonden</Text>;

    return (
        <View style={styles.container}>
            {/* Top section */}
            <View style={styles.topSection}>
                <Text style={styles.header}>Details</Text>
                <Image source={product.image} style={styles.image} />
                <TouchableOpacity style={styles.heartButton} onPress={() => toggleFavorite(product.id)}>
                    <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color="orangered" />
                </TouchableOpacity>
            </View>

            {/* Product info */}
            <View style={styles.details}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.size}>{product.size}</Text>
                <Text style={styles.price}>{product.price}</Text>
                {product.oldPrice && <Text style={styles.oldPrice}>{product.oldPrice}</Text>}

                <Text style={styles.sectionTitle}>Over Vogelhuisje</Text>
                <Text style={styles.description}>
                    Bied tuinvogels een veilige nestplek met dit duurzame huisje. Eenvoudig op te hangen en perfect voor elke tuin.
                </Text>
            </View>

            {/* Bottom navigation */}
            <View style={styles.navBar}>
                {['home-outline', 'wifi', 'search-outline', 'person-outline'].map((icon, i) => (
                    <Ionicons key={i} name={icon} size={26} color="white" />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    topSection: {
        backgroundColor: '#00794D',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingTop: 50,
        paddingBottom: 30,
        alignItems: 'center',
        position: 'relative',
    },
    header: { color: 'white', fontSize: 20, marginBottom: 10 },
    image: { width: 180, height: 180, resizeMode: 'contain' },
    heartButton: {
        position: 'absolute',
        right: 20,
        bottom: -20,
        backgroundColor: '#C6FFD9',
        borderRadius: 12,
        padding: 6,
        elevation: 5,
    },

    details: { padding: 20 },
    name: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
    size: { fontSize: 16, color: 'grey', marginBottom: 10 },
    price: { fontSize: 22, color: '#00794D', fontWeight: 'bold' },
    oldPrice: { fontSize: 18, color: '#aaa', textDecorationLine: 'line-through', marginBottom: 10 },

    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 5 },
    description: { fontSize: 15, color: '#666' },

    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 12,
        backgroundColor: '#00794D',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
});
