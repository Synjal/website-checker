import {View, Text, StyleSheet} from "react-native";
import {useContext} from "react";
import {ThemeContext} from "../context/ThemeContext";

const Footer = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <View>
            <View style={styles.FooterContainer(theme)}>
                <Text style={styles.FooterText(theme)}>Website Checker ver.0.0.1</Text>
            </View>
        </View>
    )
}

export default Footer;

const styles = StyleSheet.create({
    FooterContainer: theme => ({
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        backgroundColor: theme.primary
    }),
    FooterText: theme => ({
        color: theme.onPrimary,
        fontSize: 14,
        letterSpacing: 0.33,
        fontWeight: '500',
        textTransform: 'uppercase',
    }),
})
