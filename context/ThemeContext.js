import {createContext, useState} from "react";
import {LightTheme} from "../constants/LightTheme";

export const ThemeContext = createContext('')

export const ThemeProvider = ({ children}) => {
    const [theme, setTheme] = useState(LightTheme)

    const updateTheme = (newTheme) => {
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{theme, updateTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
