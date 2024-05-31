import {FlatList, View, Text, StyleSheet} from "react-native";
import {Icon} from "react-native-paper";

const WebsiteList = ({ data }) => {
    return (
        <View style={styles.listContainer}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.websiteName}>{item.name}</Text>
                        <Icon
                            source= {item.online === "on" ? "rss" : "rss-off" }
                            color={ item.online === "on" ? "#47c22b" : "#be1212"}
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
    listContainer: {
        flex: 1,
        margin: 20,
    },
    itemContainer: {
        marginBottom: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        borderBottomWidth: 0.5,
    },
    websiteName: {
        fontSize: 18,
        letterSpacing: 0.33,
        fontWeight: '400',
        textTransform: 'uppercase',
    },
});
