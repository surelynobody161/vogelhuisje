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

export default function Slide4() {
    const router = useRouter();

    const fullTitle = 'Bijzondere momenten.';
    const fullSubtitle = 'Neem bijzondere momenten van je vogels op en bekijk ze later terug!';

    const [typedTitle, setTypedTitle] = useState('');
    const [typedSubtitle, setTypedSubtitle] = useState('');

    const imageAnim = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        Animated.timing(imageAnim, {
            toValue: 0,
            duration: 800,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start();

        let titleIndex = 0;
        const typeTitle = () => {
            if (titleIndex <= fullTitle.length) {
                setTypedTitle(fullTitle.slice(0, titleIndex));
                titleIndex++;
                setTimeout(typeTitle, 45);
            } else {
                let subtitleIndex = 0;
                const typeSubtitle = () => {
                    if (subtitleIndex <= fullSubtitle.length) {
                        setTypedSubtitle(fullSubtitle.slice(0, subtitleIndex));
                        subtitleIndex++;
                        setTimeout(typeSubtitle, 45);
                    }
                };
                setTimeout(typeSubtitle, 400);
            }
        };
        typeTitle();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <Animated.View style={{ transform: [{ translateY: imageAnim }] }}>
                    <Image
                        source={require('../assets/images/momenten.png')}
                        style={styles.image}
                    />
                    <LinearGradient
                        colors={['transparent', '#015C40']}
                        style={styles.gradientOverlay}
                    />
                </Animated.View>
            </View>

            <View style={styles.bottom}>
                <Text style={styles.title}>{typedTitle}</Text>
                <Text style={styles.subtitle}>{typedSubtitle}</Text>

                <ProgressBar total={5} currentIndex={4} />

                <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={() => router.push('/tabs')}
                >
                    <Text style={styles.arrowText}>✓</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#015C40',
    },
    imageWrapper: {
        flex: 1.3,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 400,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
    },
    bottom: {
        flex: 0.7,
        alignItems: 'center',
        paddingTop: 10,
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: -10,
    },
    subtitle: {
        color: 'white',
        fontSize: 22,
        marginBottom: 32,
        textAlign: 'center',
        paddingHorizontal: 20,
        marginTop: -8,
    },
    arrowButton: {
        backgroundColor: '#C9FBCF',
        padding: 16,
        borderRadius: 999,
    },
    arrowText: {
        color: '#015C40',
        fontSize: 28,
    },
});
