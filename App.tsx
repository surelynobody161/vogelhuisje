import React from "react"
import { TextSizeProvider } from "./contexts/TextSizeContext"
import ProfielScherm from "./app/profile"

export default function App() {
    return (
        <TextSizeProvider>
            <ProfielScherm />
        </TextSizeProvider>
    )
}