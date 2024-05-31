import {FlatList, View, Text, StyleSheet} from "react-native";
import {Icon} from "react-native-paper";
import {useContext} from "react";
import {ThemeContext} from "../context/ThemeContext";

const WebsiteList = ({ data }) => {
    const { theme } = useContext(ThemeContext)

    return (
        <View style={styles.listContainer(theme)}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer(theme)}>
                        <Text style={styles.websiteName(theme)}>{item.name}</Text>
                        <Icon
                            source= {item.online === "on" ? "wifi" : "wifi-off" }
                            color={ item.online === "on" ? theme.on : theme.off}
                            size={40}
                        />
                    </View>
                )}
            />
        </View>
    )
}

export default WebsiteList;

const styles = StyleSheet.create({
    listContainer: theme => ({
        flex: 1,
        margin: 20,
        backgroundColor: theme.background,
    }),
    itemContainer: theme => ({
        marginBottom: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: theme.onBackground
    }),
    websiteName: theme => ({
        fontSize: 18,
        letterSpacing: 0.33,
        fontWeight: '400',
        textTransform: 'uppercase',
        color: theme.onBackground
    }),
});
