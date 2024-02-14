import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';
import Toast from 'react-native-toast-message';

const AddNewAddressScreen = ({route}) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');

  const {customerNumber} = route.params;
  const [mobileNo, setMobileNo] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [area, setArea] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(customerNumber, 'Customer Number');

  const showToast = (type, text) => {
    Toast.show({
      type,
      position: 'top',
      text1: text,
      visibilityTime: 3000,
    });
  };

  const handleAddAddress = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://yellowsensebackendapi.azurewebsites.net/insertaddress',
        {
          houseno: houseNo,
          roadname: area,
          pincode: postalCode,
          Name: name,
          mobilenumber: mobileNo,
          registermobilenumber: customerNumber,
        },
      );

      console.log('Response:', response.data);
      showToast('success', 'Address saved successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding address:', error);
      showToast('error', 'Error saving address');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.addNewAddressContainer}>
      <ScrollView style={styles.ScrollViewContainer}>
        <View style={styles.mainViewContainer}>
          <ScreenHeader title="Add New Address" />

          <View style={styles.textHeader}>
            <Icon name="location-pin" size={24} color="#F89C29" />
            <Text style={styles.addressName}>Address</Text>
          </View>

          <View style={styles.viewContainer}>
            <TextInput
              value={houseNo}
              onChangeText={text => setHouseNo(text)}
              placeholderTextColor={'#00000078'}
              style={styles.addressTextInput}
              placeholder="House no./Building Name"
            />
          </View>

          <View style={styles.viewContainer}>
            <TextInput
              value={area}
              onChangeText={text => setArea(text)}
              placeholderTextColor={'#00000078'}
              style={styles.addressTextInput}
              placeholder="Road Name/Area/Colony"
            />
          </View>

          <View style={styles.viewContainer}>
            <TextInput
              value={postalCode}
              onChangeText={text => setPostalCode(text)}
              placeholderTextColor={'#00000078'}
              style={styles.addressTextInput}
              placeholder="Enter Your Pincode"
            />
          </View>

          <View style={styles.textHeader1}>
            <MaterialIcon name="call" size={24} color="#F89C29" />
            <Text style={styles.addressName}>Contact</Text>
          </View>

          <View style={[styles.viewContainer, {marginTop: 15}]}>
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              placeholderTextColor={'#00000078'}
              style={styles.addressTextInput}
              placeholder="Enter Your Name"
            />
          </View>

          <View>
            <TextInput
              value={mobileNo}
              onChangeText={text => setMobileNo(text)}
              placeholderTextColor={'#00000078'}
              style={styles.addressTextInput}
              placeholder="Enter Mobile Number"
            />
          </View>

          <Pressable onPress={handleAddAddress} style={styles.addAddressButton}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.addAddressButtonText}>
                Save Address and Continue
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default AddNewAddressScreen;

const styles = StyleSheet.create({
  addNewAddressContainer: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  ScrollViewContainer: {
    marginTop: 40,
  },
  headerTopColor: {
    height: 50,
    backgroundColor: '#FDD312',
  },
  mainViewContainer: {
    padding: 10,
  },
  addressTextInput: {
    padding: 8,
    borderColor: '#000000',
    borderWidth: 0.5,
    marginTop: 10,
    borderRadius: 5,
  },
  textInput: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  textInputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  viewContainer: {
    marginVertical: 5,
  },
  addAddressButton: {
    backgroundColor: '#F89C29',
    padding: 15,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    elevation: 7,
  },
  addAddressButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  textHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textHeader1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  addressName: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
});
