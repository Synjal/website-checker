import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { validate } from 'email-validator';
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import {Button, Icon, TextInput} from "react-native-paper";
import {ThemeContext} from "../../context/ThemeContext";
import {auth} from "../../constants/Server";
import Loader from "../../components/Loader";

const LoginScreen = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);

    const [userEmail, setUserEmail] = useState('test@hotmail.fr');
    const [userPassword, setUserPassword] = useState('Password');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState('');

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleValidation = () => {
        if (!userEmail) {
            setErrorText('Il manque votre email');
            return false;
        }
        if (!validate(userEmail)) {
            setErrorText('Email invalide');
            return false;
        }
        if (!userPassword) {
            setErrorText('Et votre mot de passe, alors ?');
            return false;
        }
        return true;
    };

    const handleSubmitPress = async () => {
        setErrorText('');
        if (!handleValidation()) {
            return;
        }
        setLoading(true);

        try {
            const response = await axios.post(auth, {
                email: userEmail,
                password: userPassword
            });
            SecureStore.setItem('jwtToken', JSON.stringify(response.data));
            setLoading(false)
            navigation.navigate('Home');
        } catch (error) {
            setLoading(false)
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    };

    return (
        <View style={styles.mainBody(theme)}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flex: 1, justifyContent: 'center', alignContent: 'center', }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <View style={styles.logoContainer}>
                            <Icon
                                source="web"
                                color={theme.primary}
                                size={120}
                            />
                        </View>
                        <TextInput
                            style={styles.inputStyle}
                            label="Email"
                            onChangeText={setUserEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            textColor={theme.onBackground}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            label="Mot de passe"
                            onChangeText={setUserPassword}
                            secureTextEntry={!showPassword}
                            textColor={theme.onBackground}
                            right={
                                <TextInput.Icon
                                    icon={showPassword ? 'eye' : 'eye-off'}
                                    onPress={toggleShowPassword}
                                    style={styles.eyeIcon(theme)}
                                />
                            }
                        />
                        {errorText !== '' && (
                            <Text style={styles.errorTextStyle(theme)}>{errorText}</Text>
                        )}
                        <Button
                            style={styles.buttonStyle(theme)}
                            mode="outlined"
                            labelStyle={styles.text(theme)}
                            onPress={handleSubmitPress}
                        >
                            Se connecter
                        </Button>
                        <Text
                            style={styles.registerTextStyle(theme)}
                            onPress={() => navigation.navigate('RegisterScreen')}>
                            Pas encore de compte ? C'est par ici !
                        </Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    mainBody: theme => ({
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: theme.background
    }),
    logoContainer:{
        alignItems: 'center',
        margin: 20,
        marginBottom: 100,
    },
    logoImage: {
        width: '50%',
        height: 100,
        resizeMode: 'contain',
        margin: 30,
    },
    buttonStyle: theme => ({
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 50,
        marginVertical: 80,
        marginBottom: 80,
        backgroundColor: theme.primary,
    }),
    text: theme => ({
        fontSize: 13,
        letterSpacing: 0.33,
        fontWeight: '500',
        textTransform: 'uppercase',
        color: theme.onPrimary,
    }),
    inputStyle:{
        marginHorizontal: 35,
        marginVertical: 10,
        backgroundColor: 'transparent',
        borderRadius: 30,
    },
    registerTextStyle: theme => ({
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.tertiary,
        color: theme.tertiary,
    }),
    errorTextStyle: theme => ({
        textAlign: 'center',
        fontSize: 14,
        color: theme.error,
    }),
    eyeIcon: (theme) => ({
        backgroundColor: theme.background,
    }),
});
