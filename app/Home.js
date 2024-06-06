import React, {useContext, useEffect, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from "../components/Header";
import Footer from "../components/Footer";
import WebsiteList from "../components/WebsiteList";
import {ThemeContext} from "../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
    const { theme } = useContext(ThemeContext)

    const [websitesData, setWebsitesData] = useState([]);

    useEffect(() => {
        const initList = async () => {
            try {
                const savedWebsites = await AsyncStorage.getItem("websites");
                if (savedWebsites !== null) {
                    setWebsitesData(JSON.parse(savedWebsites));
                } else {
                    setWebsitesData([]);
                }
            } catch (error) {
                console.error(error);
                setWebsitesData([]);
            }
        };

        initList();
    }, [websitesData]);

    return (
        <SafeAreaView style={styles.container(theme)}>
            <StatusBar backgroundColor={theme.primary} />
            <Header navigation={navigation} canGoBack={false}/>
            <WebsiteList navigation={navigation} data={websitesData} />
            <Footer />
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
