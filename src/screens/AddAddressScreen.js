import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const AddAddressScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      style={styles.addressContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.addressHeading}>
        <View style={styles.headingTop}>
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="left" color="black" size={24} />
          </Pressable>
          <Text style={styles.addressHeadingTitle}>Your Addresses</Text>
        </View>

        <Pressable
          style={styles.addNewAddress}
          onPress={() => navigation.navigate('NewAddress')}>
          <Text style={styles.addressText}>Add New Address</Text>
          <AntDesign name="arrowright" color="black" size={24} />
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  addressContainer: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  addressHeading: {
    padding: 10,
  },
  headingTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 20,
  },
  addressHeadingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    // marginTop: 30,
  },
  addNewAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    borderColor: '#d0d0d0',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  addressText: {
    color: 'black',
    fontWeight: '600',
  },
});
