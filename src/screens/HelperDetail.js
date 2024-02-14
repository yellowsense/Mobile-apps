import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import {wpx, hpx} from '../Component/responsive';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
// import {sendNotificationToServiceProvider} from '../utils/notification';

const HelperDetail = ({props, route}) => {
  const navigation = useNavigation();
  const [helperData, setHelperData] = useState(null);
  const [helpdata, setHelpData] = useState(null);
  const [phone, setphone] = useState('');
  const [data, setdata] = useState('');

  const [displayMessage, setDisplayMessage] = useState(null);
  useEffect(() => {
    console.log('Component mounted');

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setDisplayMessage(remoteMessage);
      console.log('Foreground Notification:', remoteMessage);
    });

    return () => {
      console.log('Component will unmount');
      unsubscribe();
    };
  }, []);

  const id = route?.params?.item?.ID;
  // console.log("18===>",route?.params?.item?.ID)
  const selectedServiceImage = route?.params?.selectedServiceImage;

  useEffect(() => {
    // Fetch data when the component mounts
    getdata(id);
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem('user'));
      setdata(userData);
      console.log('userdata', userData);
    } catch (error) {
      console.log(error);
    }
  };

  const getdata = async id => {
    axios
      .get(
        `https://yellowsensebackendapi.azurewebsites.net/get_maid_details/${id}`,
      )
      .then(res => {
        AsyncStorage.setItem('data', res?.data?.PhoneNumber);
        setHelpData(res?.data);
        setphone(res?.data?.PhoneNumber);
        console.log('27====>', res?.data?.PhoneNumber);
      })
      .catch(error => {
        console.log('30===>', error);
      });
  };
  const fetchData = async id => {
    try {
      console.log('Fetching data from the API...');

      // Make a GET request to the API
      const response = await fetch(
        'https://yellowsensebackendapi.azurewebsites.net/get_all_maid_details',
      );
      console.log('API response status:', response.status);

      const data = await response.json();
      //console.log('API response data:', data);

      // Assuming the API response contains an array of helpers
      if (data && data.maid_details && data.maid_details.length > 0) {
        // Find the helper with ID 1
        const selectedHelper = data.maid_details.find(
          helper => helper.ID === id,
        );

        if (selectedHelper) {
          console.log('Data received:', selectedHelper);
          // Update the state with the selected helper's data
          setHelperData(selectedHelper);
        } else {
          console.log('Helper with ID', id, 'not found.');
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ScreenHeader title="Helper Profile" />

        <View style={styles.helperDetailInfoView}>
          <Image
            source={selectedServiceImage || require('../images/CookImage.png')}
            style={styles.helperDetailInfoImage}
          />
          <View style={styles.helperDetailNameText}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, {fontWeight: 'bold'}]}>
                {/* {`${helperData.Name}`} */}
                {helpdata?.Name}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Gender:</Text>
              <Text style={styles.infoValue}>{helpdata?.Gender}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Mobile:</Text>
              <Text style={styles.infoValue}>{helpdata?.PhoneNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Rating:</Text>
              {/* <Text style={styles.infoValue}>5</Text> */}
              <Image
                source={require('../Assets/star_ratings.png')}
                style={{marginLeft: wpx(15)}}
              />
            </View>
          </View>
        </View>

        <View style={styles.informationView}>
          <Text style={styles.informationText}>Information</Text>
        </View>

        <View style={styles.fullInfoContainer}>
          <View style={styles.fullInfoTextView}>
            <Text
              style={[
                styles.fullInfoText,
                {fontWeight: '500', width: wpx(150)},
              ]}>
              Language :
            </Text>
            <Text style={[styles.fullInfoText, {fontWeight: '400'}]}>
              Hindi
            </Text>
          </View>

          <View style={[styles.fullInfoTextView, {alignItems: ''}]}>
            <Text
              style={[
                styles.fullInfoText,
                {fontWeight: '500', width: wpx(150)},
              ]}>
              Timings :
            </Text>
            <View style={{flex: 1}}>
              <Text
                style={[
                  styles.fullInfoText,
                  {fontWeight: '400', width: wpx(180)},
                ]}
                numberOfLines={4}>
                {helpdata?.Timings.join(', ')}
              </Text>
            </View>
          </View>
          <View style={[styles.fullInfoTextView, {alignItems: ''}]}>
            <Text
              style={[
                styles.fullInfoText,
                {fontWeight: '500', width: wpx(150)},
              ]}>
              Locations :
            </Text>
            <View style={{flex: 1}}>
              <Text
                style={[
                  styles.fullInfoText,
                  {fontWeight: '400', width: wpx(180)},
                ]}
                numberOfLines={8}>
                {helpdata?.Locations.join(', ')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.feedBackView}>
          <Text style={styles.feedBackText}>Feedback From Customers</Text>
        </View>

        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackCardContent}>
            "Thank you for your hard work and dedication in keeping our home
            clean and organized. Your efforts are greatly appreciated, and we're
            happy with your service."
          </Text>
          <View style={styles.ratingRow}>
            <Image
              source={require('../Assets/star_ratings.png')}
              style={{marginRight: wpx(10)}}
            />
            <Text style={styles.poojaText}>{'-'} Pooja</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.bookNowBtnView}
          onPress={() => {
            console.log('dataata', data);
            if (data) {
              navigation.navigate('BookingDetail');
            } else {
              navigation.navigate('Login');
            }
          }}>
          <TouchableOpacity>
            <Text style={styles.bookNowBtnText}>Book Now</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>
      {/* <CustomMessageDisplay message={displayMessage} onClose={onCloseMessage} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  helperDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wpx(20),
    marginTop: hpx(20),
    justifyContent: 'space-between',
  },
  helperDetailView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backImage: {
    width: wpx(32),
    height: hpx(32),
    // resizeMode:'contain'
  },
  helperDetailText: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 48,
    color: '#0D007F',
    marginLeft: wpx(50),
  },
  helperDetailInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wpx(20),
    marginTop: hpx(20),
  },
  helperDetailInfoImage: {
    width: wpx(150),
    height: hpx(150),
    borderRadius: 16,
    borderWidth: 1,
  },
  helperDetailNameText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    color: '#000000',
    marginLeft: wpx(10),
    marginBottom: hpx(5),
  },
  helperDetailNameInfoTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helperDetailNameInfoText: {
    fontSize: 18,
    lineHeight: 24,
    color: '#000000',
  },
  informationView: {
    alignItems: 'center',
    marginTop: hpx(20),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hpx(5), // Adjust the spacing as needed
    //justifyContent:'space-between'
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginLeft: wpx(15), // Adjust the spacing between label and value
  },
  informationText: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 42,
    color: '#000000',
  },
  feedBackView: {
    alignItems: 'center',
    marginTop: hpx(20),
  },
  feedBackText: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    color: '#000000',
  },
  bookNowBtnView: {
    backgroundColor: '#F89C29',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: wpx(20),
    marginVertical: 10,
    marginBottom: 10,
  },
  bookNowBtnText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: '#ffffff',
  },
  fullInfoContainer: {
    marginTop: hpx(10),
    alignItems: 'center',
    // width:250
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
  feedbackCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F89C29',
    borderRadius: 5,
    padding: wpx(20),
    margin: wpx(20),
  },
  feedbackCardContent: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 14,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hpx(10),
    marginHorizontal: 24,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
  },
  poojaText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
    marginLeft: 'auto', // Pushes it to the right side
  },
});
export default HelperDetail;

/* <View style={styles.fullInfoTextView}>
            <Text
              style={[styles.fullInfoText, {fontWeight: '500', width: 120}]}>
              Marital Status
            </Text>
            <Text style={[styles.fullInfoText, {fontWeight: '400'}]}>
              {':  '} Married
            </Text>
          </View> */

/* <View style={styles.fullInfoTextView}>
            <Text
              style={[styles.fullInfoText, {fontWeight: '500', width: wpx(150)}]}>
              Religion :
            </Text>
            <Text style={[styles.fullInfoText, {fontWeight: '400'}]}>
               Hindu
            </Text>
          </View> */

/* <View style={styles.fullInfoTextView}>
            <Text
              style={[styles.fullInfoText, {fontWeight: '500', width: 120}]}>
              Experience:
            </Text>
            <Text style={[styles.fullInfoText, {fontWeight: '400'}]}>
              {':  '} 8 yrs
            </Text>
          </View> */

//           <View style={[styles.fullInfoTextView, {alignItems: 'flex-start'}]}>
//             <Text
//               style={[styles.fullInfoText, {fontWeight: '500', width: 120}]}>
//               Skills:
//             </Text>
//             <Text
//               style={[styles.fullInfoText, {fontWeight: '400', width: '80%'}]}>
//               {':  '} Baby Massage, Bathing New Born
//             </Text>
//           </View> */

// const storeUser = async (value) => {
//   try {
//     await AsyncStorage.setItem("user", JSON.stringify(phone));
//   } catch (error) {
//     console.log(error);
//   }
// };
