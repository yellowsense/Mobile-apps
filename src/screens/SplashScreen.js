import React from 'react';
import {View, Image, ImageBackground, StyleSheet} from 'react-native';
import {wpx, hpx} from '../Component/responsive';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../Assets/splash.png')}
        resizeMode="cover"
        style={styles.imageBackground}>
        <View style={styles.centeredContainer}>
          <Image
            source={require('../Assets/MainIcon.png')}
            resizeMode="contain"
            style={styles.mainIcon}
          />
          <Image
            source={require('../Assets/app_name.png')}
            resizeMode="contain"
            style={styles.mainIcon}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default SplashScreen;
