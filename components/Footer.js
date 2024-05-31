import {View, Text, StyleSheet} from "react-native";

const Footer = () => {
    return (
        <View>
            <View style={styles.FooterContainer}>
                <Text style={styles.FooterText}>Website Checker ver.0.0.1</Text>
            </View>
        </View>
    )
}

export default Footer;

const styles = StyleSheet.create({
    FooterContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
    },
    FooterText: {
        color: "#575757",
        fontSize: 14,
        letterSpacing: 0.33,
        fontWeight: '500',
        textTransform: 'uppercase',
    }
})
