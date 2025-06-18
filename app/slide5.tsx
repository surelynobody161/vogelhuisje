import { useRouter } from 'expo-router';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
    Animated,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from '../components/ProgressBar';

export const options = {
    headerShown: false,
};

const { width } = Dimensions.get('window');

export default function Slide5() {
    const router = useRouter();
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(50)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handlePress = (route: string) => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            router.push(route as any);
        });
    };

    return (
        <LinearGradient
            colors={['#015C40', '#02704D', '#015C40']}
            style={styles.container}
        >
            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <Animated.View
                    style={[
                        styles.card,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    <View style={styles.decorativeCircle1} />
                    <View style={styles.decorativeCircle2} />

                    <View style={styles.iconContainer}>
                        <Ionicons name="home" size={48} color="#C9FBCF" />
                    </View>

                    <Text style={styles.title}>Scala aan vogelhuisjes</Text>
                    <Text style={styles.subtitle}>
                        Welkom! Kies een optie om aan de slag te gaan met je vogelhuisjes collectie
                    </Text>

                    <View style={styles.authButtonsContainer}>
                        <TouchableOpacity
                            style={[styles.authButton, styles.primaryButton]}
                            onPress={() => handlePress('/register')}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#C9FBCF', '#A8F5B0']}
                                style={styles.buttonGradient}
                            >
                                <Ionicons name="person-add" size={20} color="#015C40" />
                                <Text style={styles.primaryButtonText}>Aanmelden</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.authButton, styles.secondaryButton]}
                            onPress={() => handlePress('/login')}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="log-in" size={20} color="#C9FBCF" />
                            <Text style={styles.secondaryButtonText}>Inloggen</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.progressContainer}>
                        <ProgressBar total={5} currentIndex={5} />
                    </View>
                </Animated.View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 32,
        padding: 40,
        width: width * 0.9,
        maxWidth: 400,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden',
    },
    decorativeCircle1: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(201, 251, 207, 0.1)',
    },
    decorativeCircle2: {
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(201, 251, 207, 0.05)',
    },
    iconContainer: {
        marginBottom: 24,
        padding: 16,
        borderRadius: 20,
        backgroundColor: 'rgba(201, 251, 207, 0.1)',
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 12,
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    subtitle: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center',
        opacity: 0.9,
        lineHeight: 24,
        paddingHorizontal: 8,
    },
    authButtonsContainer: {
        width: '100%',
        gap: 16,
        marginBottom: 32,
    },
    authButton: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    primaryButton: {},
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#C9FBCF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        gap: 8,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        gap: 8,
    },
    primaryButtonText: {
        color: '#015C40',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    secondaryButtonText: {
        color: '#C9FBCF',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    progressContainer: {
        width: '100%',
        alignItems: 'center',
    },
});