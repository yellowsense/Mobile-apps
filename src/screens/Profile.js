import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {wpx, hpx} from '../Component/responsive';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';

const Profile = () => {
  const navigation = useNavigation();
  const [user_mobile_number, setNumber] = useState('');
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://yellowsensebackendapi.azurewebsites.net/get_customer/${user_mobile_number}`,
        );

        if (response.status === 200) {
          setCustomerData(response.data);
          // console.log('data', response.data);
        } else {
          console.error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    const intervalId = setInterval(fetchData, 2000); // Fetch data every two seconds

    if (user_mobile_number) {
      fetchData(); // Fetch data initially when the component mounts
    }

    return () => clearInterval(intervalId);
  }, [user_mobile_number]);

  useEffect(() => {
    const getNumber = async () => {
      try {
        const userNumber = await AsyncStorage.getItem('user');
        console.log('number', userNumber);
        setNumber(userNumber);
      } catch (error) {
        console.log('ljkhkjh', error);
      }
    };

    getNumber();
  }, []);

  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  const refreshProfileData = async () => {
    try {
      const response = await axios.get(
        `https://yellowsensebackendapi.azurewebsites.net/get_customer/${user_mobile_number}`,
      );

      if (response.status === 200) {
        setCustomerData(response.data);
        console.log('Refreshed data', response.data);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    refreshProfileData();
  }, [user_mobile_number]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <ScreenHeader title="My Profile" />
        </View>

        {user_mobile_number ? (
          customerData ? (
            <View style={styles.profileInfoView}>
              <Image
                source={require('../Assets/ProfileIcon/uploadphoto.png')}
              />
              <Text style={styles.nameText}>{customerData.Username}</Text>
              <View style={styles.contactView}>
                <Image
                  source={require('../Assets/ProfileIcon/Callicon.png')}
                  style={styles.contactImage}
                />
                <Text style={styles.contactNumber}>
                  {customerData.MobileNumber}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.activityIndicatiorStyling}>
              <ActivityIndicator size="large" color="#F89C29" />
            </View>
          )
        ) : (
          <View style={styles.activityIndicatiorStyling}>
            <Text style={styles.notLoggedInText}>Not Logged In</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.profiles4BtnView}
          onPress={() => {
            navigation.navigate('EditProfile', {
              user_mobile_number,
            });
          }}>
          <Image
            source={require('../Assets/ProfileIcon/EditIcon.png')}
            style={styles.profile4BtnImage}
          />
          <Text style={styles.profile4BtnText}>Edit Profiles</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profiles4BtnView}>
          <Image
            source={require('../Assets/ProfileIcon/ic_outline-grid-view.png')}
            style={styles.profile4BtnImage}
          />
          <Text style={styles.profile4BtnText}>My Viewed Helpers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profiles4BtnView}>
          <Image
            source={require('../Assets/ProfileIcon/Share.png')}
            style={styles.profile4BtnImage}
          />
          <Text style={styles.profile4BtnText}>Share a Friend</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profiles4BtnView}>
          <Image
            source={require('../Assets/ProfileIcon/ShareIcon.png')}
            style={styles.profile4BtnImage}
          />
          <Text style={styles.profile4BtnText}>Rate Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logOutBtnView}
          onPress={() => {
            removeUser();
          }}>
          <Text style={styles.logOutBtnText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  // profileView: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginTop: hpx(20),
  // },
  backImage: {
    width: wpx(32),
    height: hpx(32),
    // resizeMode:'contain'
  },
  // myProfileText: {
  //   fontSize: 32,
  //   fontWeight: '600',
  //   lineHeight: 48,
  //   color: '#0D007F',
  //   marginLeft: wpx(80),
  // },

  profileInfoView: {
    alignItems: 'center',
    marginTop: hpx(20),
  },
  nameText: {
    marginTop: hpx(16),
    fontSize: 16,
    fontWeight: '600',
    color: '#F89C29',
  },
  contactView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hpx(10),
  },
  contactImage: {
    width: wpx(18),
    height: hpx(18),
  },
  contactNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 27,
    marginLeft: wpx(10),
  },
  profiles4BtnView: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    padding: 14,
    marginHorizontal: wpx(20),
    marginTop: hpx(20),
    borderRadius: 8,
  },
  profile4BtnImage: {
    width: wpx(24),
    height: hpx(24),
    // resizeMode:'cover'
  },
  profile4BtnText: {
    marginLeft: wpx(40),
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 18,
    color: '#000000',
  },
  logOutBtnView: {
    backgroundColor: '#FF1B5FC7',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: hpx(40),
    marginHorizontal: wpx(20),
  },
  logOutBtnText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: '#ffffff',
  },
  activityIndicatiorStyling: {
    alignSelf: 'center',
  },
});
export default Profile;
