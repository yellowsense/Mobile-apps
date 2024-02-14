import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const GoogleMapLocationScreen = () => {
  return (
    <View style={styles.googleContainer}>
      <Text>GoogleMapLocationScreen</Text>
    </View>
  );
};

export default GoogleMapLocationScreen;

const styles = StyleSheet.create({
  googleContainer: {
    flex: 1,
    backgroundColor: '#FFF0CC',
  },
});
