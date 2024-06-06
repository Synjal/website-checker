import {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LightTheme} from "../constants/LightTheme";

export const ThemeContext = createContext('')

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(LightTheme)

    useEffect(() => {
        const initTheme = async () => {
            const storedTheme = await AsyncStorage.getItem("theme");
            if (storedTheme) {
                setTheme(JSON.parse(storedTheme));
            }
        }

        initTheme()
    }, [])

    const updateTheme = async (newTheme) => {
        setTheme(newTheme);
        await AsyncStorage.setItem("theme", JSON.stringify(newTheme))
    };

    return (
        <ThemeContext.Provider value={{
            theme,
            updateTheme,
        }}>
            {children}
        </ThemeContext.Provider>
    )
}
