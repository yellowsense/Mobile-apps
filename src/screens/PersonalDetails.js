import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {wpx, hpx} from '../Component/responsive';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';
import axios from 'axios';

const PersonalDetails = ({route}) => {
  const navigation = useNavigation();
  const {mobileNumber} = route.params;
  //console.log('MobileNumber:', mobileNumber);

  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [age, setAge] = useState('');
  const [selectedTimings, setSelectedTimings] = useState([]);

  const handleGenderSelect = gender => {
    setSelectedGender(gender);
  };

  const handleServiceSelect = service => {
    const isSelected = selectedServices.includes(service);

    if (isSelected) {
      // If the service is already selected, remove it
      setSelectedServices(prevSelectedServices =>
        prevSelectedServices.filter(s => s !== service),
      );
    } else {
      // If the service is not selected, add it
      setSelectedServices(prevSelectedServices => [
        ...prevSelectedServices,
        service,
      ]);
    }
  };

  const handleNext = async () => {
    const data = {
      user_mobile_number: mobileNumber,
      services: selectedServices.join(','),
      age: parseInt(age),
      gender: selectedGender,
    };
    navigation.navigate('KnownLanguage', {
      ...route.params,
      personalDetails: data,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ScreenHeader title="Personal Details" />
        <Text
          style={{
            textAlign: 'center',
            marginVertical: hpx(20),
            color: 'black',
            fontWeight: 'bold',
            fontSize: 14,
          }}>
          Enter Your personal details to search for this jobs
        </Text>

        {/* <View style={styles.personalInfo}>
          <Text style={styles.personalInfoText}>Name:</Text>
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor={'grey'}
            style={{
              backgroundColor: 'white',
              paddingLeft: wpx(10),
              borderRadius: 8,
              marginTop: hpx(10),
            }}
            //onChangeText={txt => setchildren(txt)}
          />
        </View> */}

        <View style={styles.personalInfo}>
          <Text style={styles.personalInfoText}>Age:</Text>
          <TextInput
            placeholder="Enter your age"
            placeholderTextColor={'grey'}
            inputMode="numeric"
            style={{
              backgroundColor: 'white',
              paddingLeft: wpx(10),
              borderRadius: 8,
              marginTop: hpx(10),
              color: 'gray'
            }}
            value={age}
            onChangeText={text => setAge(text)}
          />
        </View>

        <View style={styles.personalInfo}>
          <Text style={styles.personalInfoText}>Gender:</Text>
        </View>

        <View style={styles.personalInfo}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: wpx(32),
              marginTop: hpx(10),
            }}>
            <TouchableOpacity
              onPress={() => handleGenderSelect('male')}
              style={[styles.genderContainer, selectedGender === 'male']}>
              <View style={selectedGender === 'male' && styles.selectedGender}>
                <Image
                  source={require('../Assets/male.png')}
                  style={[styles.genderImage]}
                />
              </View>
              {selectedGender === 'male' && (
                <Image
                  source={require('../Assets/select_tick.png')}
                  style={styles.tickMark}
                />
              )}
              <Text style={[styles.genderText]}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleGenderSelect('female')}
              style={[styles.genderContainer, selectedGender === 'female']}>
              <View
                style={selectedGender === 'female' && styles.selectedGender}>
                <Image
                  source={require('../Assets/female.png')}
                  style={[styles.genderImage]}
                />
              </View>
              {selectedGender === 'female' && (
                <Image
                  source={require('../Assets/select_tick.png')}
                  style={styles.tickMark}
                />
              )}
              <Text style={[styles.genderText]}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.serviceInfo}>
          <Text style={styles.serviceInfoText}>Select Service Type:</Text>
        </View>

        <View style={styles.serviceCardContainer}>
          <TouchableOpacity
            onPress={() => handleServiceSelect('Maid')}
            style={[
              styles.serviceCard,
              selectedServices.includes('Maid') && styles.selectedServiceCard,
            ]}>
            <Image
              source={require('../Assets/house_maid.png')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Maid</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleServiceSelect('Cook')}
            style={[
              styles.serviceCard,
              selectedServices.includes('Cook') && styles.selectedServiceCard,
            ]}>
            <Image
              source={require('../Assets/house_cook.png')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Cook</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.singleServiceCardContainer}>
          <TouchableOpacity
            onPress={() => handleServiceSelect('Nanny')}
            style={[
              styles.serviceCard,
              selectedServices.includes('Nanny') && styles.selectedServiceCard,
            ]}>
            <Image
              source={require('../Assets/house_nanny.png')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Nanny</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
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
  personalDetailsView: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-between',
    marginTop: hpx(20),
    marginHorizontal: wpx(20),
  },
  personalDetails: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 48,
    color: '#0D007F',
    alignItems: 'center',
    marginHorizontal: wpx(50),
  },
  backImage: {
    width: wpx(32),
    height: hpx(32),
    // resizeMode:'contain'
  },
  genderContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genderImage: {
    width: wpx(100),
    height: hpx(100),
  },
  genderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: hpx(40),
  },
  personalInfo: {
    marginHorizontal: wpx(30),
    marginTop: hpx(20),
  },
  personalInfoText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 27,
  },
  serviceInfo: {
    marginHorizontal: wpx(30),
    marginTop: hpx(30),
  },
  serviceInfoText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 27,
  },
  selectedGender: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'orange',
    padding: 10,
  },
  tickMark: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: wpx(20),
    height: hpx(20),
    resizeMode: 'contain',
  },
  nextBtn: {
    // position: 'absolute',
    // left: wpx(30),
    // right: wpx(30),
    top: hpx(20),
    marginVertical: hpx(50),
    marginHorizontal: wpx(30),
    height: hpx(50),
    backgroundColor: '#F89C29',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  nextText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    color: '#ffffff',
  },
  serviceCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wpx(30),
    marginTop: hpx(30),
  },

  singleServiceCardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hpx(10),
  },

  serviceCard: {
    flex: 1,
    backgroundColor: '#FDD312',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: wpx(5),
  },

  cardImage: {
    width: wpx(150),
    height: hpx(120),
    resizeMode: 'contain',
  },

  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: hpx(10),
  },
  selectedServiceCard: {
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'green',
  },
  selectTimingsText: {
    marginLeft: 30,
    marginTop: 20,
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 27,
  },
});
export default PersonalDetails;
