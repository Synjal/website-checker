import React, {useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import Header from "../components/Header";
import Footer from "../components/Footer";
import WebsiteList from "../components/WebsiteList";
import {websites} from "../constants/Websites";

const Home = () => {
    const [websitesData, setWebsitesData] = useState(websites);

    useEffect(() => {
        const interval = setInterval(() => {
            const newWebsites = websitesData.map(website => ({
                ...website,
                online: Math.random() < 0.5 ? "on" : "off"
            }));
            setWebsitesData(newWebsites);
        }, 500);

        return () => clearInterval(interval);
    }, [websitesData]);

    return (
        <View style={styles.container}>
            <Header />
            <WebsiteList data={websitesData} />
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Home;
