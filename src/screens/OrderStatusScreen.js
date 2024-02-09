import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';

const OrderStatusScreen = ({route}) => {
  const {message} = route.params;

  useEffect(() => {
    console.log('Message here ', message);
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <ScreenHeader title="Booking Status" />
      </View>
    </View>
  );
};

export default OrderStatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
});
