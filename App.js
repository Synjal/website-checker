import React, {useContext, useEffect} from 'react';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './app/Home';
import {ThemeProvider} from "./context/ThemeContext";
import DetailsScreen from "./screens/DetailsScreen";
import {PingProvider} from "./context/PingContext";

const Stack = createStackNavigator();

const app = () => {

    return (
        <ThemeProvider>
            <PingProvider>
                <NavigationContainer>
                        <Stack.Navigator initialRouteName="Home">
                            <Stack.Screen
                                name="Home"
                                component={Home}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Details"
                                component={DetailsScreen}
                                options={{ headerShown: false }}
                            />
                        </Stack.Navigator>
                </NavigationContainer>
            </PingProvider>
        </ThemeProvider>
    );
}

export default app;
