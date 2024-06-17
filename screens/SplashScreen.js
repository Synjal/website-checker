import React, {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../context/ThemeContext";
import * as SecureStore from 'expo-secure-store';
import {View, StyleSheet, ActivityIndicator} from "react-native";
import {Icon} from "react-native-paper";

const SplashScreen = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);

    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            SecureStore.getItemAsync('jwtToken').then((value) =>
                navigation.replace(value === null ? 'Auth' : 'Home'),
            );
        }, 4000);
    }, []);

    return (
        <View style={styles.container(theme)}>
            <Icon source="web" color={theme.primary} size={240}/>
            <ActivityIndicator animating={animating} color={theme.primary} size="large" style={styles.activityIndicator}/>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: theme => ({
        backgroundColor: theme.background,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }),
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});
