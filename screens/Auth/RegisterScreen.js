import {View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, StyleSheet} from "react-native";
import React, {createRef, useContext, useState} from "react";
import {ThemeContext} from "../../context/ThemeContext";
import {validate} from "email-validator";
import axios from "axios";
import {register} from "../../constants/Server";
import {HelperText, Icon, TextInput} from "react-native-paper";
import Loader from "../../components/Loader";

const RegisterScreen = () => {
    const { theme } = useContext(ThemeContext);

    const [userEmail, setUserEmail] = useState('');
    const emailInputRef = createRef();
    const [emailError, setEmailError] = useState(false);

    const [userPassword, setUserPassword] = useState('');
    const passwordInputRef = createRef();
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [loading, setLoading] = useState(false);

    const handleSubmitButton = async () => {
        if (!emailError && !passwordError && validate(userEmail)) {
            setLoading(true);
            try {
                const response = await axios.post(register, {
                    email: userEmail,
                    roles: ['USER'],
                    password: userPassword,
                }, {
                    headers: {
                        'Content-Type': 'application/ld+json',
                        'Accept': 'application/ld+json'
                    },
                    withCredentials: false
                });

                if (response.status === 201) {
                    console.log("Account created")
                    return (
                        <SafeAreaView style={styles.SuccessWindow(theme)}>

                            <Text style={styles.successTextStyle(theme)}>
                                Inscription réussie
                            </Text>
                            <TouchableOpacity
                                style={styles.buttonStyle(theme)}
                                activeOpacity={0.5}
                                onPress={() => props.navigation.navigate('LoginScreen')}>
                                <Text style={styles.buttonTextStyle(theme)}>Se connecter</Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    );
                }
            } catch (error) {
                console.log(error)
                alert('Une erreur est survenue. Merci de réessayer plus tard.')
            } finally {
                setLoading(false)
            }
        } else console.log("Erreur de validation des champs")
    }

    return (
        <SafeAreaView style={styles.MainBody(theme)}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{justifyContent: 'center', alignContent: 'center',}}>
                <View style={styles.logoContainer}>
                    <Icon
                        source="web"
                        color={theme.primary}
                        size={120}
                    />
                </View>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputStyle(theme)}
                                onChangeText={(UserEmail) => {
                                    setUserEmail(UserEmail)
                                    setEmailError(UserEmail === '' || !validate(UserEmail))
                                }}
                                label="Email"
                                keyboardType="email-address"
                                ref={emailInputRef}
                                returnKeyType="next"
                                onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                                blurOnSubmit={false}
                                error={emailError}
                                textColor={theme.onBackground}
                            />
                            <HelperText type="error" visible={emailError} style={styles.errorTextStyle(theme)}>
                                {userEmail === '' ? "Vous avez oublié votre mail !" : "Votre mail n'est pas au bon format."}
                            </HelperText>
                        </View>
                    </View>
                    <View style={styles.SectionStyle}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputStyle(theme)}
                                onChangeText={(UserPassword) => {
                                    setUserPassword(UserPassword)
                                    setPasswordError(UserPassword === '')
                                }}
                                label="Mot de passe"
                                ref={passwordInputRef}
                                returnKeyType="next"
                                secureTextEntry={!showPassword}
                                blurOnSubmit={false}
                                error={passwordError}
                                textColor={theme.onBackground}
                                right={
                                    <TextInput.Icon
                                        icon={showPassword ? 'eye' : 'eye-off'}
                                        onPress={toggleShowPassword}
                                        style={styles.eyeIcon(theme)}
                                    />
                                }
                            />
                            <HelperText type="error" visible={passwordError} style={styles.errorTextStyle(theme)}>
                                {userPassword === ''
                                    ? "Vous avez oublié le mot de passe !"
                                    : "Votre mot de passe doit contenir au moins 1 chiffre, une lettre minuscule, " +
                                    "une lettre majuscule, un caractère spécial et faire au moins 8 caractères. !"}
                            </HelperText>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonStyle(theme)} onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle(theme)}>Je m'inscris !</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
};
export default RegisterScreen;

const styles = StyleSheet.create({
    MainBody: theme => ({
        flex: 1,
        backgroundColor: theme.background,
    }),
    logoContainer: {
        alignItems: 'center',
        margin: 20,
        marginTop: 60,
        marginBottom: 100,
    },
    logoImage: {
        width: '50%',
        height: 100,
        resizeMode: 'contain',
        margin: 30,
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 35,
        marginRight: 35,
    },
    inputContainer: {
        flex: 1,
    },
    inputStyle: theme => ({
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: theme.background,
    }),
    buttonStyle: theme => ({
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 50,
        marginVertical: 20,
        backgroundColor: theme.primary,
    }),
    buttonTextStyle: theme => ({
        fontSize: 13,
        letterSpacing: 0.33,
        fontWeight: '500',
        textTransform: 'uppercase',
        color: theme.onPrimary,
    }),
    errorTextStyle: theme => ({
        textAlign: "left",
        fontSize: 12,
        marginBottom: 10,
        color: theme.error,
    }),
    successTextStyle: theme => ({
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
        color: theme.onBackground,
    }),
    SuccessWindow: theme => ({
        flex: 1,
        justifyContent: 'center',
        backgroundColor: theme.background,
    }),
    SuccessImage: {
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    eyeIcon: (theme) => ({
        backgroundColor: theme.background,
    }),
});
