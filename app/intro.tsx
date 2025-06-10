// app/intro.tsx
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Intro() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/teamwork.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>
                Wauw mooie <Text style={styles.green}>app</Text> en tekst{'\n'}
                buy een <Text style={styles.green}>huisje</Text>{'\n'}
                enzo
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => router.replace('/tabs')}>
                <Text style={styles.buttonText}>→</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#015C40',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 60,
    },
    logo: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
        borderRadius: 16,
        backgroundColor: '#C9FBCF',
        padding: 20,
    },
    text: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 36,
        fontWeight: '500',
    },
    green: {
        color: '#A8F4C1',
    },
    button: {
        backgroundColor: '#C9FBCF',
        padding: 20,
        borderRadius: 100,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
    },
    buttonText: {
        fontSize: 24,
        color: '#015C40',
    },
});
