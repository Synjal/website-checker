import {createContext, useState} from "react";

export const PingContext = createContext('')

export const PingProvider = ({ children }) => {
    const [pingTimes, setPingTimes] = useState({})

    return (
        <PingContext.Provider value={{
            pingTimes,
            setPingTimes,
        }}>
            {children}
        </PingContext.Provider>
    )
}
