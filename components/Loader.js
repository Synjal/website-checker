import React, {useContext} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {ThemeContext} from "../context/ThemeContext";

const Loader = (props) => {
    const theme = useContext(ThemeContext);

    const {loading} = props;

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => {
                console.log('close modal');
            }}>
            <View style={styles.modalBackground(theme)}>
                <View style={styles.activityIndicatorWrapper(theme)}>
                    <ActivityIndicator
                        animating={true}
                        color={theme.primary}
                        size="large"
                        style={styles.activityIndicator}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default Loader;

const styles = StyleSheet.create({
    modalBackground: theme => ({
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: theme.background,
    }),
    activityIndicatorWrapper: theme => ({
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: theme.background,
    }),
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});
