import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {wpx, hpx} from '../Component/responsive';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {user_mobile_number} = route.params;

  const [name, setName] = useState('');
  const [new_mobile_number, setNewNumber] = useState('');
  const [age, setAge] = useState('');
  const [services, setServices] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchMaidDetails = async () => {
      try {
        const response = await axios.get(
          `https://backendapiyellowsense.azurewebsites.net/get_service_provider?mobile_number=${user_mobile_number}`,
        );

        if (
          response.status === 200 &&
          response.data &&
          response.data.serviceproviders
        ) {
          const maidDetails = response.data.serviceproviders;
          setName(maidDetails.Username);
          setNewNumber(user_mobile_number);
          setAge(maidDetails.Age);
          setServices(maidDetails.Services);
          setEmail(maidDetails.Email);
        } else {
          console.error('Error fetching maid details');
        }
      } catch (error) {
        console.error('Error fetching maid details:', error.message);
      }
    };

    fetchMaidDetails();
  }, [user_mobile_number]);

  const handleUpdate = async () => {
    try {
      const updatedProfile = {
        user_mobile_number,
        new_mobile_number,
        name,
        age,
        services,
        email,
      };

      const response = await axios.put(
        'https://yellowsensebackendapi.azurewebsites.net/update_maid_by_mobile',
        updatedProfile,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // Check the response status
      if (response.status === 200) {
        console.log('Profile updated successfully');

        // Show a toast message
        Toast.show({
          type: 'success',
          text1: 'Profile Updated',
          position: 'top',
          visibilityTime: 2000,
          autoHide: true,
        });
      } else {
        console.error('Error updating profile');
        // Show a toast message for error
        Toast.show({
          type: 'error',
          text1: 'Error Updating Profile',
          position: 'top',
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
      // Show a toast message for error
      Toast.show({
        type: 'error',
        text1: 'Error Updating Profile',
        position: 'top',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <ScreenHeader title="Edit Profile" />
      </View>

      <View style={styles.editProfileInfoView}>
        <TextInput
          placeholder="Enter Name"
          value={name}
          onChangeText={txt => setName(txt)}
          style={styles.editProfileInfoText}
        />
      </View>

      <View style={styles.editProfileInfoView}>
        <TextInput
          placeholder="Enter Number"
          value={new_mobile_number}
          onChangeText={txt => setNewNumber(txt)}
          style={styles.editProfileInfoText}
        />
      </View>

      <View style={styles.editProfileInfoView}>
        <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={txt => setEmail(txt)}
          style={styles.editProfileInfoText}
        />
      </View>

      <View style={styles.editProfileInfoView}>
        <TextInput
          placeholder="Enter Age"
          value={age}
          onChangeText={txt => setAge(txt)}
          style={styles.editProfileInfoText}
        />
      </View>

      <View style={styles.editProfileInfoView}>
        <TextInput
          placeholder="Enter services"
          value={services}
          onChangeText={txt => setServices(txt)}
          style={styles.editProfileInfoText}
        />
      </View>

      <TouchableOpacity style={styles.updateBtnView} onPress={handleUpdate}>
        <Text style={styles.updateBtnText}>Update</Text>
      </TouchableOpacity>

      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  editProfileView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hpx(20),
    marginLeft: wpx(20),
  },
  backImage: {
    width: wpx(32),
    height: hpx(32),
    // resizeMode:'contain'
  },
  editProfileText: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 48,
    color: '#0D007F',
    marginLeft: wpx(100),
  },
  editProfileInfoView: {
    marginTop: hpx(20),
  },
  editProfileInfoText: {
    marginHorizontal: wpx(20),
    backgroundColor: '#ffffff',
    paddingLeft: wpx(10),
    borderRadius: 8,
  },
  updateBtnView: {
    backgroundColor: '#F89C29',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: hpx(40),
    marginHorizontal: wpx(20),
  },
  updateBtnText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 30,
    color: '#ffffff',
  },
});
