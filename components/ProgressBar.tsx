import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
    total: number;
    currentIndex: number;
};

export default function ProgressBar({ total, currentIndex }: Props) {
    const progressWidth = `${((currentIndex + 1) / total) * 100}%`;

    return (
        <View style={styles.wrapper}>
            <View style={styles.track}>
                <View style={[styles.progress, { width: progressWidth }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '80%',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 20,
    },
    track: {
        width: '100%',
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        backgroundColor: '#C9FBCF',
        borderRadius: 3,
    },
});
