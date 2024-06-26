import React, { useContext, useEffect, useState } from 'react';
import { FlatList, LogBox, StyleSheet, Text, View } from 'react-native';
import { Icon, SegmentedButtons, TouchableRipple } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';
import AddWebsites from './AddWebsites';
import { PingContext } from "../context/PingContext";

const WebsiteItem = ({ item, theme, pingTimes, navigation, isGrid, refresh }) => (
    <TouchableRipple
        style={isGrid ? styles.itemContainerGrid(theme, pingTimes[item.address]) : styles.itemContainer(theme)}
        onPress={() => navigation.navigate("Details", { website: item, refresh: refresh })}
        rippleColor={theme.surface}
    >
        <View style={isGrid ? styles.itemContentGrid : styles.itemContent}>
            <View style={styles.textContainer}>
                <Text style={isGrid ? styles.websiteNameGrid(theme) : styles.websiteName(theme)}>{item.name}</Text>
                <Text style={isGrid ? styles.websiteAddressGrid(theme) : styles.websiteAddress(theme)}>
                    {item.address.slice(8)}
                </Text>
            </View>
            <View style={styles.iconContainer}>
                <Icon
                    source={pingTimes[item.address] === null ? 'wifi-strength-off'
                        : pingTimes[item.address] >= 400 ? 'wifi-strength-1-alert'
                            : pingTimes[item.address] >= 100 ? 'wifi-strength-2'
                                : 'wifi-strength-4'}
                    color={pingTimes[item.address] === null ? theme.off
                        : pingTimes[item.address] >= 400 ? theme.off
                            : pingTimes[item.address] >= 100 ? theme.slow : theme.on}
                    size={40}
                />
            </View>
        </View>
    </TouchableRipple>
);

const WebsiteList = ({ navigation, data, refresh }) => {
    const { theme } = useContext(ThemeContext);
    const { pingTimes, setPingTimes } = useContext(PingContext);

    const [value, setValue] = useState('list');

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    async function ping(address) {
        try {
            const startTime = Date.now();
            await fetch(address);
            const endTime = Date.now();

            return endTime - startTime;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            const newPingTimes = {};
            for (const item of data) {
                newPingTimes[item.address] = await ping(item.address);
            }
            setPingTimes(newPingTimes);
        }, 2000);

        return () => clearInterval(interval);
    }, [data]);

    const renderItem = ({ item }) => (
        <WebsiteItem
            item={item}
            theme={theme}
            pingTimes={pingTimes}
            navigation={navigation}
            isGrid={value === 'grid'}
            refresh={refresh}
        />
    );

    return (
        <View style={styles.listContainer(theme)}>
            <AddWebsites refresh={refresh} />
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                    {
                        icon: 'view-list-outline',
                        label: 'Liste',
                        value: 'list',
                        checkedColor: theme.onTertiary,
                        uncheckedColor: theme.onBackground,
                        style: value === 'list' ? styles.selectedButton(theme) : styles.unselectedButton(theme),
                    },
                    {
                        icon: 'view-grid-outline',
                        label: 'Grille',
                        value: 'grid',
                        checkedColor: theme.onTertiary,
                        uncheckedColor: theme.onBackground,
                        style: value === 'grid' ? styles.selectedButton(theme) : styles.unselectedButton(theme),
                    },
                ]}
                style={{ marginBottom: 20 }}
            />

            <FlatList
                data={data}
                key={value}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                numColumns={value === 'grid' ? 2 : 1}
                columnWrapperStyle={value === 'grid' ? styles.row : null}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default WebsiteList;

const styles = StyleSheet.create({
    row: {
        flex: 1,
        justifyContent: 'space-between',
    },
    listContainer: theme => ({
        flex: 1,
        marginTop: 20,
        marginBottom: 0,
        paddingHorizontal: 20,
        backgroundColor: theme.background,
    }),
    itemContainer: theme => ({
        borderBottomWidth: 0.5,
        borderBottomColor: theme.primary,
    }),
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'column',
    },
    websiteName: theme => ({
        fontSize: 18,
        letterSpacing: 0.33,
        fontWeight: '500',
        textTransform: 'uppercase',
        color: theme.onBackground,
    }),
    websiteAddress: theme => ({
        fontSize: 14,
        letterSpacing: 0.33,
        fontWeight: '300',
        textTransform: 'uppercase',
        color: theme.onBackground,
    }),
    itemContainerGrid: (theme, ping) => ({
        flex: 1,
        margin: 10,
        backgroundColor:
            ping === null ? theme.off
                : ping >= 400 ? theme.off
                    : ping >= 100 ? theme.slow
                        : theme.on,
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    }),
    itemContentGrid: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 150,
    },
    websiteNameGrid: theme => ({
        fontSize: 18,
        color: theme.textColor,
        marginBottom: 5,
        fontWeight: '600',
    }),
    websiteAddressGrid: theme => ({
        fontSize: 14,
        color: theme.textColor,
    }),
    selectedButton: theme => ({
        backgroundColor: theme.tertiary,
    }),
    unselectedButton: theme => ({
        backgroundColor: theme.background,
    }),
});
