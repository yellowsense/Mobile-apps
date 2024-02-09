import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {wpx, hpx} from '../Component/responsive';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';

const {width, height} = Dimensions.get('window');

const GovermentIdentity = ({route}) => {
  const navigation = useNavigation();
  //const {mobileNumber, personalDetails, knownLanguage} = route.params;
  //console.log(mobileNumber, personalDetails, knownLanguage);
  const [aadharNumber, setAadharNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');

  // const onNextPress = () => {
  //   if (aadharNumber && panNumber) {
  //     navigation.navigate('SelectApartment');
  //   } else {
  //     Alert.alert('Required!', 'Please provide both Aadhar and PAN numbers.');
  //   }
  // };

  const onSkipPress = () => {
    navigation.navigate('Availability', {
      ...route.params,
    });
  };

  const handleNext = () => {
    const data = {
      aadhar_number: aadharNumber,
      pan_card: panNumber,
    };
    if (aadharNumber && panNumber) {
      navigation.navigate('Availability', {
        ...route.params,
        govermentIdentity: data,
      });
    } else {
      Alert.alert('Required!', 'Please provide both Aadhar and PAN numbers.');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <ScreenHeader title="Goverment Identity" />

        <View style={{marginTop: hpx(30)}}>
          <View style={styles.govermentIdentityInfo}>
            <Text style={styles.govermentIdentityInfoText}>
              Aadhar Card Number:
            </Text>
            <TextInput
              placeholder="eg: XXXXXXXXXXX"
              inputMode="numeric"
              placeholderTextColor={'grey'}
              style={{
                backgroundColor: 'white',
                paddingLeft: wpx(10),
                borderRadius: 8,
                marginTop: hpx(10),
              }}
              value={aadharNumber}
              onChangeText={text => setAadharNumber(text)}
            />
          </View>
        </View>

        <View style={styles.govermentIdentityInfo}>
          <Text style={styles.govermentIdentityInfoText}>Pan Card Number:</Text>
          <TextInput
            placeholder="eg: ABCVP89765"
            placeholderTextColor={'grey'}
            style={{
              backgroundColor: 'white',
              paddingLeft: wpx(10),
              borderRadius: 8,
              marginTop: hpx(10),
            }}
            value={panNumber}
            onChangeText={text => setPanNumber(text)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.skipBtn} onPress={onSkipPress}>
            <Text style={styles.skipbuttonText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextbuttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  govermentIdentityView: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-between',
    marginTop: hpx(20),
    marginHorizontal: wpx(20),
  },
  backImage: {
    width: wpx(32),
    height: hpx(32),
    // resizeMode:'contain'
  },
  govermentIdentityInfo: {
    marginHorizontal: wpx(30),
    marginTop: hpx(30),
  },
  govermentIdentityInfoText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 27,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'absolute',
    // bottom: hpx(50),
    top: hpx(200),
    marginVertical: hpx(200),
    marginHorizontal: wpx(30),
  },
  skipBtn: {
    flex: 1,
    height: hpx(50),
    justifyContent: 'center',
  },
  nextBtn: {
    flex: 1,
    height: hpx(50),
    backgroundColor: '#F9A73E',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wpx(10),
    borderRadius: 8,
  },
  nextbuttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 27,
    color: 'white',
  },
  skipbuttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 27,
    color: 'black',
  },
});
export default GovermentIdentity;
