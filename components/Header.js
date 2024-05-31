import {View, Text, StyleSheet} from "react-native";

const Header = () => {
    return (
        <View>
            <View style={styles.HeaderContainer}>
                <Text style={styles.HeaderText}>Website Checker</Text>
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    HeaderContainer: {
        height: 70,
        backgroundColor: '#cb8347',
        alignItems: 'center',
        justifyContent: 'center',
    },
    HeaderText: {
        color: '#ffffff',
        fontSize: 20,
        letterSpacing: 0.33,
        fontWeight: '500',
        textTransform: 'uppercase',
    }
})
