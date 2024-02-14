import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {wpx, hpx, wp, hp} from '../Component/responsive';
import {useNavigation} from '@react-navigation/native';

const FirstScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={{color: 'black', fontSize: 24, fontWeight: 'bold'}}>
          YellowSense Services
        </Text>
      </View>

      <TouchableOpacity
        style={styles.serviceBookView}
        onPress={() => navigation.navigate('BottomTabNavigator')}>
        <Image
          source={require('../images/maid.png')}
          style={[styles.serviceBookImage]}
        />
        <Text style={styles.serviceBookText}>Book Maid</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.serviceBookView}
        onPress={() => navigation.navigate('BottomTabNavigator')}>
        <Image
          source={require('../images/CookImage.png')}
          style={[styles.serviceBookImage]}
        />
        <Text style={styles.serviceBookText}>Book Cook</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.serviceBookView}
        onPress={() => navigation.navigate('BottomTabNavigator')}>
        <Image
          source={require('../images/NannyImage.png')}
          style={[styles.serviceBookImage]}
        />
        <Text style={styles.serviceBookText}>Book Nanny</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDD312',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceBookView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2CD',
    marginHorizontal: wpx(20),
    marginTop: hpx(20),
    paddingHorizontal: wpx(20),
    borderRadius: 20,
    borderWidth: 0.3,
  },
  serviceBookImage: {
    width: wpx(124),
    height: hpx(132),
  },
  serviceBookText: {
    marginLeft: wpx(30),
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 28,
  },
});

export default FirstScreen;
