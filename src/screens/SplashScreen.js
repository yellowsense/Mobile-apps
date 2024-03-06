import React from 'react';
import { View, Image, ImageBackground, StyleSheet, Text } from 'react-native';
import { wpx, hpx } from '../Component/responsive';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={require('../Assets/splash.png')}
        resizeMode="cover"
        style={styles.imageBackground}
      > */}
        <View style={styles.centeredContainer}>
          <Image
            source={require('../Assets/MainIcon.png')}
            resizeMode="contain"
            style={styles.mainIcon}
          />
          <Image
            source={require('../Assets/app_name.png')}
            resizeMode="contain"
            style={styles.appNameIcon}
          />
          <Text style={styles.welcomeText}>"Welcome to YellowSense Service Provider App!"</Text>
        </View>
        
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFF2CD'
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContainer: {
    width: '100%',
    alignItems: 'center',
  },
  mainIcon: {
    width: wpx(200),
    height: hpx(200),
  },
  appNameIcon:{
    marginVertical:hpx(40)
  },
  welcomeText:{
    color:'#A15942', 
    fontWeight:'bold',
  }
});

export default SplashScreen;
