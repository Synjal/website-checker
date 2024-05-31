import {FlatList, View, Text, StyleSheet} from "react-native";
import {Icon, SegmentedButtons} from "react-native-paper";
import {useContext, useState} from "react";
import {ThemeContext} from "../context/ThemeContext";

const WebsiteList = ({ data }) => {
    const { theme } = useContext(ThemeContext)

    const [value, setValue] = useState('list')

    return (
        <View style={styles.listContainer(theme)}>
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                    {
                        icon: 'view-list-outline',
                        label: 'Liste',
                        value: 'list',
                        checkedColor: theme.secondary,
                        uncheckedColor: theme.onBackground
                    },
                    {
                        icon: 'view-grid-outline',
                        label: 'Grille',
                        value: 'grid',
                        checkedColor: theme.secondary,
                        uncheckedColor: theme.onBackground
                    },
                ]}
                style={{marginBottom: 20}}
            />

            {value === 'list' &&
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer(theme)}>
                            <Text style={styles.websiteName(theme)}>{item.name}</Text>
                            <Icon
                                source={item.online === "on" ? "wifi" : "wifi-off"}
                                color={item.online === "on" ? theme.on : theme.off}
                                size={40}
                            />
                        </View>
                    )}
                />
            }

            {value === 'grid' &&
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainerGrid(theme)}>
                            <Text style={styles.websiteNameGrid(theme)}>{item.name}</Text>
                            <Icon
                                source={item.online === "on" ? "wifi" : "wifi-off"}
                                color={item.online === "on" ? theme.on : theme.off}
                                size={40}
                            />
                        </View>
                    )}
                    columnWrapperStyle={styles.row}
                />
            }
        </View>
    )
}

export default WebsiteList;

const styles = StyleSheet.create({
    row: {
        flex: 1,
        justifyContent: 'space-between',
    },
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
        borderBottomColor: theme.primary
    }),
    websiteName: theme => ({
        fontSize: 18,
        letterSpacing: 0.33,
        fontWeight: '400',
        textTransform: 'uppercase',
        color: theme.onBackground
    }),
    itemContainerGrid: theme => ({
        flex: 1,
        margin: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.surface, // Assuming you have an itemBackground property in your theme
        borderRadius: 10,
        height: 150, // Ensuring the item is a square
    }),
    websiteNameGrid: theme => ({
        fontSize: 18,
        color: theme.textColor,
        marginBottom: 10,
    }),
});
