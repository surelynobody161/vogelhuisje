import React, {JSX, useState } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

type PageType = 'home' | 'stream' | 'search' | 'setting'

export default function NavBar(): JSX.Element {
    const [activePage, setActivePage] = useState<PageType>('home')
    const router = useRouter()

    const handleNavigation = (page: PageType, route: string): void => {
        setActivePage(page)
        router.push(route as any)
        console.log(`Navigating to: ${route}`)
    }

    return (
        <View style={styles.navBar}>
            {/* Home → /mijnhuisjes */}
            <TouchableOpacity onPress={() => handleNavigation('home', '/MijnHuisjes')}>
                <View style={styles.iconContainer}>
                    <Image
                        source={
                            activePage === 'home'
                                ? require('../assets/images/nav-icons/Home_active.png')
                                : require('../assets/images/nav-icons/Home.png')
                        }
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>

            {/* Stream → /stream */}
            <TouchableOpacity onPress={() => handleNavigation('stream', '/Stream')}>
                <View style={styles.iconContainer}>
                    <Image
                        source={
                            activePage === 'stream'
                                ? require('../assets/images/nav-icons/Stream_active.png')
                                : require('../assets/images/nav-icons/Stream.png')
                        }
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>

            {/* Shop → /shop */}
            <TouchableOpacity onPress={() => handleNavigation('search', '/Shop')}>
                <View style={styles.iconContainer}>
                    <Image
                        source={
                            activePage === 'search'
                                ? require('../assets/images/nav-icons/Search_active.png')
                                : require('../assets/images/nav-icons/Search.png')
                        }
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>

            {/* Profile → /profile */}
            <TouchableOpacity onPress={() => handleNavigation('setting', '/Profile')}>
                <View style={styles.iconContainer}>
                    <Image
                        source={
                            activePage === 'setting'
                                ? require('../assets/images/nav-icons/Setting_active.png')
                                : require('../assets/images/nav-icons/Setting.png')
                        }
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
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
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
})