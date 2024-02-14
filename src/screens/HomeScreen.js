import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {wpx, hpx, wp, hp} from '../Component/responsive';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome user</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('BottomTabNavigator');
          }}>
          <Text style={styles.cardText}>DASHBOARD</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hpx(10),
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 32,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'grey',
    height: hpx(50),
    width: wpx(150), // Adjust the width as needed
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default HomeScreen;
