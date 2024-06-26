import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Text, StatusBar, StyleSheet, View, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { PingContext } from "../context/PingContext";
import {websites} from "../constants/Server";
import axios from "axios";

const DetailsScreen = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const { pingTimes, setPingTimes } = useContext(PingContext);

    const route = useRoute();
    const { website, refresh } = route.params;

    const deleteWebsite = async (site) => {
        try {
            await axios.delete(websites + '/' + site.id)
            setPingTimes((prevPingTimes) => {
                const updatedPingTimes = { ...prevPingTimes };
                delete updatedPingTimes[site.address];
                return updatedPingTimes;
            });

            refresh();
            navigation.goBack();
        } catch (error) {
            console.error("Failed to delete the website:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container(theme)}>
            <StatusBar backgroundColor={theme.primary} />
            <Header navigation={navigation} canGoBack={true} />
            <View style={styles.contentContainer}>
                <Text style={styles.websiteName(theme)}>{website.name}</Text>
                <Text style={styles.websiteAddress(theme)}>{website.address}</Text>
                <Text style={styles.websitePing(theme)}>{pingTimes[website.address] + " ms"}</Text>
                <TouchableOpacity
                    style={styles.deleteButton(theme)}
                    onPress={() => deleteWebsite(website)}
                >
                    <Text style={styles.deleteButtonText(theme)}>Supprimer</Text>
                </TouchableOpacity>
            </View>
            <Footer />
        </SafeAreaView>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    container: theme => ({
        flex: 1,
        backgroundColor: theme.background,
    }),
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    websiteName: theme => ({
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.onBackground,
        marginBottom: 10,
    }),
    websiteAddress: theme => ({
        fontSize: 18,
        color: theme.onBackground,
        textAlign: 'center',
    }),
    websitePing: theme => ({
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.onBackground,
        marginBottom: 10,
    }),
    deleteButton: theme => ({
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: theme.error,
        borderRadius: 5,
    }),
    deleteButtonText: theme => ({
        color: theme.onError,
        fontSize: 16,
        fontWeight: 'bold',
    }),
});
