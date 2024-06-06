import {View, Text, StyleSheet} from "react-native";
import {useContext} from "react";
import {ThemeContext} from "../context/ThemeContext";
import {IconButton} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Footer = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={styles.footerWrapper}>
            <View style={styles.FooterContainer(theme)}>
                <Text style={styles.FooterText(theme)}>Website Checker ver.0.0.1</Text>
                <IconButton
                    icon="web-refresh"
                    iconColor={theme.onPrimary}
                    size={20}
                    onPress={() => AsyncStorage.removeItem("websites")}
                    style={styles.iconButton}
                />
            </View>
        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    footerWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    FooterContainer: theme => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        backgroundColor: theme.primary,
        width: '100%',
    }),
    FooterText: theme => ({
        color: theme.onPrimary,
        fontSize: 14,
        letterSpacing: 0.33,
        fontWeight: '500',
        textTransform: 'uppercase',
        textAlign: 'center',
        flex: 1,
    }),
    iconButton: {
        position: 'absolute',
        right: 10,
    },
});
