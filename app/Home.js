import React, {useContext, useEffect, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from "../components/Header";
import Footer from "../components/Footer";
import WebsiteList from "../components/WebsiteList";
import {websites} from "../constants/Websites";
import {ThemeContext} from "../context/ThemeContext";

const Home = () => {
    const { theme } = useContext(ThemeContext)
    const [websitesData, setWebsitesData] = useState(websites);

    useEffect(() => {
        const interval = setInterval(() => {
            const newWebsites = websitesData.map(website => ({
                ...website,
                online: Math.random() < 0.5 ? "on" : "off"
            }));
            setWebsitesData(newWebsites);
        }, 2000);

        return () => clearInterval(interval);
    }, [websitesData]);

    return (
        <SafeAreaView style={styles.container(theme)}>
            <StatusBar backgroundColor={theme.primary} />
            <Header />
            <WebsiteList data={websitesData} />
            <Footer />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: theme => ({
        flex: 1,
        backgroundColor: theme.background,
    }),
});

export default Home;
