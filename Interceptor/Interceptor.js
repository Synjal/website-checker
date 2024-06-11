import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {auth, register} from "../constants/Server";

const token = async () => {
    const jwt = await AsyncStorage.getItem('jwtToken');
    return JSON.parse(jwt)?.token
}

const refreshToken = async () => {
    const jwt = await AsyncStorage.getItem('jwtToken');
    return JSON.parse(jwt)?.refresh_token
}

const setToken = async (newAccessToken) => {
    try {
        const jwt = await AsyncStorage.getItem('jwtToken');
        const parsedJwt = JSON.parse(jwt);
        parsedJwt.token = newAccessToken;
        await AsyncStorage.setItem('jwtToken', JSON.stringify(parsedJwt));
    } catch (error) {
        console.error('Error setting token:', error);
    }
}

axios.interceptors.request.use(
    async config => {
        config.headers['Content-Type'] = 'application/ld+json';
        config.headers["Accept"] = 'application/ld+json';

        if (config.url !== auth && config.url !== register) {
            if (await token()) {
                config.headers['Authorization'] = 'Bearer ' + await token()
            }
        }
        return config
    },
    error => { Promise.reject(error) }
)
