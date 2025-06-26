import React, { JSX } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useRouter, usePathname } from 'expo-router'

type PageType = 'home' | 'stream' | 'search' | 'setting'

function getActivePage(pathname: string): PageType {
    if (pathname.toLowerCase().startsWith('/mijnhuisjes')) return 'home'
    if (pathname.toLowerCase().startsWith('/stream')) return 'stream'
    if (pathname.toLowerCase().startsWith('/shop')) return 'search'
    if (pathname.toLowerCase().startsWith('/profile')) return 'setting'
    return 'home'
}

export default function NavBar(): JSX.Element {
    const router = useRouter()
    const pathname = usePathname()
    const activePage = getActivePage(pathname)

    const handleNavigation = (route: string): void => {
        router.push(route as any)
        console.log(`Navigating to: ${route}`)
    }

    return (
        <View style={styles.navBar}>
            {/* Home → /mijnhuisjes */}
            <TouchableOpacity onPress={() => handleNavigation('/MijnHuisjes')}>
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
            <TouchableOpacity onPress={() => handleNavigation('/streamlist')}>
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
            <TouchableOpacity onPress={() => handleNavigation('/Shop')}>
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
            <TouchableOpacity onPress={() => handleNavigation('/Profile')}>
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