import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles.js';

const SlideshowNR1 = () => {
    return (
        <View style={styles.container}>
            {/* <Image
                source={require('../../assets/images/teamwork.png')}
                style={styles.logo}
            /> */}
            <Text style={styles.text}>
                Wauw mooie <Text style={styles.green}>app</Text> en tekst{'\n'}
                buy een <Text style={styles.green}>huisje</Text>{'\n'}
                enzo
            </Text>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>→</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SlideshowNR1;
