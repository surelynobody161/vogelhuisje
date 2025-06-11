import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ProgressBar from '../components/ProgressBar';

export default function Intro() {
    const router = useRouter();

    const fullText = `Welkom bij onze app\nMaak van elke tuin een thuis\nvoor vogels en natuur`;
    const [typedText, setTypedText] = useState('');
    const imageAnim = useRef(new Animated.Value(-120)).current;

    useEffect(() => {
        Animated.timing(imageAnim, {
            toValue: 0,
            duration: 900,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start();

        let index = 0;
        const typeNext = () => {
            if (index <= fullText.length) {
                setTypedText(fullText.slice(0, index));
                index++;
                setTimeout(typeNext, 45);
            }
        };
        typeNext();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ translateY: imageAnim }] }}>
                <Image
                    source={require('../assets/images/teamwork.png')}
                    style={styles.logo}
                />
                <LinearGradient
                    colors={['transparent', '#015C40']}
                    style={styles.gradient}
                />
            </Animated.View>

            <View style={styles.textWrapper}>
                <Text style={styles.text}>{typedText}</Text>

            </View>

            <ProgressBar total={5} currentIndex={0} />

            <TouchableOpacity style={styles.button} onPress={() => router.push('/slide1')}>
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
        justifyContent: 'space-between',
        paddingVertical: 60,
    },
    logo: {
        width: 240,
        height: 240,
        resizeMode: 'contain',
        borderRadius: 16,
        backgroundColor: '#C9FBCF',
    },
    gradient: {
        position: 'absolute',
        bottom: -20,
        left: 0,
        right: 0,
        height: 100,
    },
    textWrapper: {
        paddingHorizontal: 30,
        minHeight: 140,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 26,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 38,
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#C9FBCF',
        padding: 18,
        borderRadius: 999,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
    },
    buttonText: {
        fontSize: 26,
        color: '#015C40',
    },
});
