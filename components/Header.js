import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton, Switch } from 'react-native-paper';
import { LightTheme } from '../constants/LightTheme';
import { DarkTheme } from '../constants/DarkTheme';
import { ThemeContext } from '../context/ThemeContext';

const Header = ({ navigation, canGoBack }) => {
    const { theme, updateTheme } = useContext(ThemeContext);

    const [isSwitchOn, setIsSwitchOn] = useState(theme === DarkTheme);

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        updateTheme(!isSwitchOn ? DarkTheme : LightTheme);
    };

    return (
        <View>
            <View style={styles.headerContainer(theme)}>
                {canGoBack ? (
                    <IconButton
                        icon="chevron-left"
                        iconColor={theme.onPrimary}
                        size={40}
                        onPress={() => navigation.navigate('Home')}
                        style={styles.iconButton}
                    />
                ) : (
                    <View style={styles.iconButtonPlaceholder} />
                )}
                <Text style={styles.headerText(theme)}>Website Checker</Text>
                {!canGoBack ? (
                    <Switch
                        value={isSwitchOn}
                        onValueChange={onToggleSwitch}
                        color={theme.secondary}
                        style={styles.switch}
                    />
                ) : (
                    <View style={styles.switchPlaceholder} />
                )}
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerContainer: theme => ({
        height: 70,
        backgroundColor: theme.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    }),
    headerText: theme => ({
        color: theme.onPrimary,
        fontSize: 20,
        letterSpacing: 0.33,
        fontWeight: '500',
        textTransform: 'uppercase',
    }),
    iconButton: {
        justifyContent: 'flex-start',
    },
    iconButtonPlaceholder: {
        width: 40,
        height: 40,
    },
    switch: {
        justifyContent: 'flex-end',
    },
    switchPlaceholder: {
        width: 50,
    },
});
