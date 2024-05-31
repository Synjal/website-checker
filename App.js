import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './app/Home';
import {ThemeProvider} from "./context/ThemeContext";

const Stack = createStackNavigator();

const app = () => {
    return (
        <ThemeProvider>
            <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}

export default app;
