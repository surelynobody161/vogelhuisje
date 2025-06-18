import { View, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect } from "react";

const videoSource = 'http://145.24.223.199:8080/stream/baseball.m3u8';

export default function LiveStream() {
    const player = useVideoPlayer(videoSource, player => {
        player.play();
    });

    useEffect(() => {
        const interval = setInterval(async () => {
            if (player.currentTime < player.duration - 10) {
                player.seekBy(player.duration - 5);
                player.play();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [player]);

    return (
        <View style={ styles.container }>
            <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture nativeControls requiresLinearPlayback />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%'
    },
    video: {
        width: '100%',
        height: '100%'
    }
});