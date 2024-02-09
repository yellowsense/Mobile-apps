import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontSize: 32 }}>Welcome user</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.card}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>DASHBOARD</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'grey',
        height: 50,
        width: 150, // Adjust the width as needed
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;

