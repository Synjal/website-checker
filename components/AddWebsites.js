import React, {useContext, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';
import {ThemeContext} from "../context/ThemeContext";
import axios from "axios";
import {websites} from "../constants/Server";

const AddWebsites = ({ refresh }) => {
    const { theme } = useContext(ThemeContext);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [showForm, setShowForm] = useState(false);

    async function handleAddWebsite(name, address) {
        if (name && address) {
            try {
                await axios.post(websites, {
                    name: name,
                    url: address,
                }, {
                    headers: {
                        'Content-Type': 'application/ld+json',
                        'Accept': 'application/ld+json'
                    },
                    withCredentials: false
                });
                refresh()
            } catch (error) {
                console.error(error);
            }

            setName('');
            setAddress('');
            setShowForm(false);
        }
    }

    return (
        <View style={styles.container}>
            {!showForm && (
                <Button
                    icon="plus-circle-outline"
                    mode="text"
                    onPress={() => setShowForm(true)}
                    textColor={theme.primary}
                    compact
                >
                    Ajouter un site
                </Button>
            )}
            {showForm && (
                <View style={styles.inputContainer}>
                    <TextInput
                        label="Nom"
                        value={name}
                        onChangeText={name => setName(name)}
                        style={styles.input}
                        mode="outlined"
                    />
                    <TextInput
                        label="Adresse"
                        value={address}
                        onChangeText={address => setAddress(address)}
                        style={styles.input}
                        mode="outlined"
                    />
                    <IconButton
                        icon="web-plus"
                        mode="contained"
                        onPress={() => handleAddWebsite(name, `https://${address.toLowerCase()}`)}
                        style={styles.button}
                    />
                    <IconButton
                        icon="close"
                        mode="contained"
                        onPress={() => setShowForm(false)}
                        style={styles.cancelButton}
                    />
                </View>
            )}
        </View>
    );
};

export default AddWebsites;

const styles = StyleSheet.create({
    container: {
        marginTop: -15,
        marginBottom: 5,
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        marginRight: 10,
    },
    button: {
        alignSelf: 'flex-end',
    },
    cancelButton: {
        alignSelf: 'center',

    },
});
