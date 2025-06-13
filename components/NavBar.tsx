import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function NavBar() {
    const [activePage, setActivePage] = useState('home');

    return (
        <View style={styles.navBar}>
            <TouchableOpacity onPress={() => setActivePage('home')}>
                <View style={styles.iconContainer}>
                    <Image
                        source={
                            activePage === 'home'
                                ? require('../assets/images/nav-icons/Home_active.png')
                                : require('../assets/images/nav-icons/Home.png')
                        }
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivePage('stream')}>
                <View style={styles.iconContainer}>
                    <Image
                        source={
                            activePage === 'stream'
                                ? require('../assets/images/nav-icons/Stream_active.png')
                                : require('../assets/images/nav-icons/Stream.png')
                        }
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivePage('search')}>
                <View style={styles.iconContainer}>
                    <Image
                        source={
                            activePage === 'search'
                                ? require('../assets/images/nav-icons/Search_active.png')
                                : require('../assets/images/nav-icons/Search.png')
                        }
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivePage('setting')}>
                <View style={styles.iconContainer}>
                    <Image
                        source={
                            activePage === 'setting'
                                ? require('../assets/images/nav-icons/Setting_active.png')
                                : require('../assets/images/nav-icons/Setting.png')
                        }
                    />
                </View>
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
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});