import React, { createContext, useContext, useState } from 'react';

type TextSize = 'klein' | 'medium' | 'groot';
const defaultSize: TextSize = 'medium';

// Define the context type
interface TextSizeContextType {
    textSize: TextSize;
    setTextSize: (size: TextSize) => void;
}

// Create the context with default values
const TextSizeContext = createContext<TextSizeContextType>({
    textSize: defaultSize,
    setTextSize: () => {},
});

// Hook to use text size in components
export const useTextSize = () => useContext(TextSizeContext);

// Provider to wrap your app with
export const TextSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [textSize, setTextSize] = useState<TextSize>(defaultSize);

    return (
        <TextSizeContext.Provider value={{ textSize, setTextSize }}>
            {children}
        </TextSizeContext.Provider>
    );
};
