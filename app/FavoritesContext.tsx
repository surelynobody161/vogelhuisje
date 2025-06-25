import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext<{
    favorites: string[];
    toggleFavorite: (id: string) => void;
}>({
    favorites: [],
    toggleFavorite: () => { },
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);
    const toggleFavorite = (id: string) => {
        setFavorites(favs =>
            favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]
        );
    };
    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}

export default FavoritesContext;