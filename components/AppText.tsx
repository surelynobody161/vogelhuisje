import React from "react"
import { Text, TextProps, StyleSheet } from "react-native"
import { useTextSize } from "../contexts/TextSizeContext"

export function AppText({ style, children, ...props }: TextProps) {
    const { tekstGrootte } = useTextSize()
    let fontSize = 14
    if (tekstGrootte === "medium") fontSize = 18
    if (tekstGrootte === "large") fontSize = 22

    return (
        <Text style={[{ fontSize }, style]} {...props}>
            {children}
        </Text>
    )
}