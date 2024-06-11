import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './app/Home';
import {ThemeContext, ThemeProvider} from "./context/ThemeContext";
import DetailsScreen from "./screens/DetailsScreen";
import {PingProvider} from "./context/PingContext";
import LoginScreen from "./screens/Auth/LoginScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "./screens/SplashScreen";
const Stack = createStackNavigator();

const Auth = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{
                title: 'Inscription',
                headerStyle: {backgroundColor: theme.primary,},
                headerTintColor: theme.onPrimary,
                headerTitleStyle: {fontWeight: 'bold',},
            }}
            />
        </Stack.Navigator>
    );
};

const App = () => {
    return (
        <ThemeProvider>
            <PingProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={SplashScreen}>
                        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}}/>
                        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </PingProvider>
        </ThemeProvider>
    );
}

export default App;
