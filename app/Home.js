import React, {useContext, useEffect, useState} from 'react';
import {StatusBar, StyleSheet } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from "../components/Header";
import Footer from "../components/Footer";
import WebsiteList from "../components/WebsiteList";
import {ThemeContext} from "../context/ThemeContext";
import axios from "axios";
import {websites} from "../constants/Server";
import * as Location from 'expo-location';

const Home = ({ navigation }) => {
    const { theme } = useContext(ThemeContext)

    const [ websitesData, setWebsitesData ] = useState([]);
    const [location, setLocation] = useState(null);

    const initList = async () => {
        try {
            const savedWebsites = await axios.get(websites)
            if (savedWebsites.data && savedWebsites.data['hydra:member']) {
                const websites = savedWebsites.data['hydra:member'].map(site => ({
                    id: site.id,
                    name: site.name,
                    address: site.url
                }));
                setWebsitesData(websites);
                console.log(websites)
                console.log(JSON.stringify(location))
            } else {
                setWebsitesData([]);
                console.log(savedWebsites.data)
            }
        } catch (error) {
            console.error(error);
            setWebsitesData([]);
        }
    };

    useEffect(() => {
        (async () => {
            setLocation(await Location.getCurrentPositionAsync({}));
        })();
        initList().then(() => console.log("websites loaded"));
    }, []);

    return (
        <SafeAreaView style={styles.container(theme)}>
            <StatusBar backgroundColor={theme.primary} />
            <Header navigation={navigation} canGoBack={false} />
            <WebsiteList navigation={navigation} data={websitesData} refresh={initList} />
            <Footer navigation={navigation} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: theme => ({
        flex: 1,
        backgroundColor: theme.background,
    }),
});

export default Home;
