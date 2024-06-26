import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import {auth, register} from "../constants/Server";

const token = () => {
    const jwt = SecureStore.getItem('jwtToken');
    return JSON.parse(jwt)?.token
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
