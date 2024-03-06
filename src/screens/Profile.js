import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {wpx, hpx} from '../Component/responsive';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {user_mobile_number} = route.params;
  const [maidDetails, setMaidDetails] = useState(null);

  const updateButtonText = newText => {
    navigation.navigate('EditProfile', {
      user_mobile_number,
    });
    console.log(user_mobile_number, 'Hello World');
  };

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
          setMaidDetails(response.data.serviceproviders);
        } else {
          console.error('Error fetching maid details');
        }
      } catch (error) {
        console.error('Error fetching maid details:', error.message);
      }
    };

    fetchMaidDetails();

    const intervalId = setInterval(fetchMaidDetails, 2000);

    return () => clearInterval(intervalId);
  }, [user_mobile_number]);

  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('Login');
      console.log('Removed');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <ScreenHeader title="My Profile" />
        </View>

        <View style={styles.profileInfoView}>
          <Image source={require('../Assets/ProfileIcon/uploadphoto.png')} />
        </View>

        <View style={styles.fullInfoContainer}>
          {maidDetails ? (
            <>
              {renderDetail('Name', maidDetails.Username)}
              {renderDetail('Number', maidDetails.MobileNumber)}
              {renderDetail('Age', maidDetails.Age)}
              {renderDetail('Gender', maidDetails.Gender)}
              {maidDetails.Languages &&
                renderDetail('Languages', maidDetails.Languages)}
              {maidDetails.Services &&
                renderDetail('Services', maidDetails.Services)}
              <View style={styles.updateLocation}>
                {maidDetails.Location &&
                  renderDetail('Locations', maidDetails.Location)}
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() =>
                    navigation.navigate('UpdateLocation', {
                      userNumber: user_mobile_number,
                    })
                  }>
                  <Image
                    source={require('../Assets/pencil_edit.png')}
                    style={styles.profile4BtnImage}
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.activityIndicatiorStyling}>
              <ActivityIndicator size="large" color="#F89C29" />
            </View>
          )}
        </View>

        {/* Edit Profiles button */}
        <TouchableOpacity
          style={styles.profiles4BtnView}
          onPress={() => {
            updateButtonText();
          }}>
          <Image
            source={require('../Assets/pencil_edit.png')}
            style={styles.profile4BtnImage}
          />
          <Text style={styles.profile4BtnText}>Edit Profiles</Text>
        </TouchableOpacity>

        {/* Log Out button */}
        <TouchableOpacity style={styles.logOutBtnView} onPress={removeUser}>
          <Text style={styles.logOutBtnText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const renderDetail = (label, value) => (
  <View style={styles.fullInfoTextView} key={label}>
    <Text style={[styles.fullInfoText, {fontWeight: '500', width: 120}]}>
      {label}:
    </Text>
    <Text style={[styles.fullInfoText, {fontWeight: '400'}]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
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
  fullInfoContainer: {
    marginVertical: wpx(20),
    marginHorizontal: hpx(30),
  },
  fullInfoTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wpx(250),
    marginTop: hpx(8),
  },
  fullInfoText: {
    fontSize: 18,
    lineHeight: 27,
    color: '#000000',
  },
  profiles4BtnView: {
    backgroundColor: '#F9A73E',
    flexDirection: 'row',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wpx(100),
    marginTop: hpx(20),
  },
  profile4BtnImage: {
    width: wpx(24),
    height: hpx(24),
  },
  profile4BtnText: {
    marginLeft: wpx(40),
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 18,
    color: '#fff',
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
  updateLocation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  updateButton: {
    backgroundColor: '#F9A73E',
    padding: 2,
    borderRadius: 5,
  },
});

export default Profile;
