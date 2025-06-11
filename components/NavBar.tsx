import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function NavBar() {
    return (
        <View style={styles.navBar}>
            <TouchableOpacity>
                <Image source={require('../assets/images/house icon.png')} style={styles.navIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require('../assets/images/livestream icon.png')} style={styles.navIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require('../assets/images/search icon.png')} style={styles.navIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require('../assets/images/profile icon.png')} style={styles.navIcon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#00794D',
        paddingBottom: 20,
    },
    navIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
});