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
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';

const EditProfile = () => {
  const navigation = useNavigation();
  const [new_name, setName] = useState('');
  const route = useRoute();
  const {user_mobile_number} = route.params;
  const [new_mobile_number, setNewNumber] = useState('');
  const [new_email, setEmialid] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(
          `https://yellowsensebackendapi.azurewebsites.net/get_customer/${user_mobile_number}`,
        );

        if (response.status === 200 && response.data) {
          const maidDetails = response.data;
          setName(maidDetails.Username);
          setNewNumber(user_mobile_number);
          setEmialid(maidDetails.Email);
        } else {
          console.error('Error fetching maid details');
        }
      } catch (error) {
        console.error('Error fetching maid details:', error.message);
      }
    };

    fetchCustomerDetails();
  }, [user_mobile_number]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedProfile = {
        user_mobile_number,
        new_mobile_number,
        new_name,
        new_email,
      };

      const response = await axios.put(
        'https://yellowsensebackendapi.azurewebsites.net/edit_user',
        updatedProfile,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Updating profile with:', updatedProfile);

      if (response.status === 200) {
        console.log('Profile updated successfully');

        Toast.show({
          type: 'success',
          text1: 'Profile Updated',
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,
          onHide: () => navigation.goBack(),
        });
      } else {
        console.error('Error updating profile');

        Toast.show({
          type: 'error',
          text1: 'Error Updating Profile',
          position: 'top',
        });
      }
    } catch (error) {
      setLoading(false);

      console.error('Error updating profile:', error.message);

      // Show an error toast message
      Toast.show({
        type: 'error',
        text1: 'Error Updating Profile',
        position: 'top',
      });
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
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
          value={new_name}
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
          editable={false}
        />
      </View>

      <View style={styles.editProfileInfoView}>
        <TextInput
          placeholder="Enter Email id"
          value={new_email}
          onChangeText={txt => setEmialid(txt)}
          style={styles.editProfileInfoText}
        />
      </View>

      <TouchableOpacity
        style={styles.updateBtnView}
        onPress={handleUpdate}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" size={24} />
        ) : (
          <Text style={styles.updateBtnText}>Update</Text>
        )}
      </TouchableOpacity>

      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

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
export default EditProfile;
