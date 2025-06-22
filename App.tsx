import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { TextSizeProvider } from "./contexts/TextSizeContext"

import Login from "./app/login"
import Register from "./app/register"
import ProfielScherm from "./app/profile"

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <TextSizeProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Profile" component={ProfielScherm} />
                </Stack.Navigator>
            </NavigationContainer>
        </TextSizeProvider>
    )
}
