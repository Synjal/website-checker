import {View, Text, StyleSheet} from "react-native";
import {Switch} from "react-native-paper";
import {useContext, useEffect, useState} from "react";
import {LightTheme} from "../constants/LightTheme";
import {DarkTheme} from "../constants/DarkTheme";
import {ThemeContext} from "../context/ThemeContext";

const Header = () => {
    const { theme, updateTheme } = useContext(ThemeContext)

    const [isSwitchOn, setIsSwitchOn] = useState(theme === DarkTheme)

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn)
        updateTheme(!isSwitchOn? DarkTheme : LightTheme)
    }

    return (
        <View>
            <View style={styles.HeaderContainer(theme)}>
                <Text style={styles.HeaderText(theme)}>Website Checker</Text>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={theme.secondary} style={{marginRight: 20}}/>
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    HeaderContainer: theme => ({
        height: 70,
        backgroundColor: theme.primary,
        alignItems: 'center',
        justifyContent:'flex-end',
        flexDirection: 'row',
    }),
    HeaderText: theme => ({
        color: theme.onPrimary,
        fontSize: 20,
        letterSpacing: 0.33,
        fontWeight: '500',
        textTransform: 'uppercase',
        marginRight: '10%',
    }),
})
