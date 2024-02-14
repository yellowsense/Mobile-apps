import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {wpx, hpx} from '../Component/responsive';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import {Modal} from 'react-native-paper';

const StatusUpdationNotification = ({message}) => {
  if (!message || !message.notification) {
    return null;
  }

  const {title, body} = message.notification;

  const handleMessage = () => {};

  return (
    <Modal visible={!message} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={handleMessage}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{width: 300}}>
              <Text style={styles.actionText5}>{title}</Text>
              <Text style={{fontSize: 16}}>{body}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const Home = ({route}) => {
  const {width: screenWidth} = Dimensions.get('window');

  const navigation = useNavigation();

  const [maidSelected, setMaidSelected] = useState(false);
  const [cookSelected, setCookSelected] = useState(false);
  const [nannySelected, setNannySelected] = useState(false);

  const [SpecialityType, setSpecialityType] = useState('');
  const [societyname, setSocietynames] = useState([]);

  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [showFromDate, setShowFromDate] = useState(false);
  const [selectedFromTime, setSelectedFromTime] = useState(new Date());
  const [showFromTime, setShowFromTime] = useState(false);

  const [selectLocation, setSelectedLocation] = useState('');
  const [date, setdate] = useState('');
  const [time, setTime] = useState('');
  const [data, setData] = useState('');

  const [customerData, setCustomerData] = useState(null);
  const [displayMessage, setDisplayMessage] = useState(null);

  const getUserNumber = async () => {
    try {
      const userMobileNumber = await AsyncStorage.getItem('user');
      if (userMobileNumber) {
        fetchData(userMobileNumber);
      } else {
        console.log('User mobile number not found in AsyncStorage');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const fetchData = async userMobileNumber => {
    if (!userMobileNumber) {
      console.log('User mobile number is not available');
      return;
    }

    try {
      const response = await axios.get(
        `https://yellowsensebackendapi.azurewebsites.net/get_customer/${userMobileNumber}`,
      );

      if (response.status === 200) {
        setCustomerData(response.data);
        console.log('data', response.data);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  const storeData = async () => {
    try {
      // Use your existing state variables
      const apartment = selectLocation;
      const starttime = moment(selectedFromTime).format('h:mm A'); // Format time
      const startDate = moment(selectedFromDate).format('YYYY-MM-DD'); // Format date
      const serviceType = maidSelected
        ? 'Maid'
        : cookSelected
        ? 'Cook'
        : nannySelected
        ? 'Nanny'
        : null;

      await AsyncStorage.removeItem('apartment');
      await AsyncStorage.removeItem('starttime');
      await AsyncStorage.removeItem('startDate');
      await AsyncStorage.removeItem('serviceType');

      // Store the values in AsyncStorage
      await AsyncStorage.setItem('apartment', apartment);
      await AsyncStorage.setItem('starttime', starttime);
      await AsyncStorage.setItem('startDate', startDate);
      await AsyncStorage.setItem('serviceType', serviceType);

      console.log('Data stored successfully!');
    } catch (error) {
      console.log('Error storing data:', error);
    }
  };

  const apidata = () => {
    axios
      .get('https://yellowsensebackendapi.azurewebsites.net/society_names')
      .then(response => {
        console.log('123==>', response?.data);
        setSocietynames(Object.values(response?.data));
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    apidata();
    storeData();
    getUserNumber();
    fetchData();
  }, [selectLocation, selectedFromDate, selectedFromTime]);

  const renderItem = (item, selected) => {
    return (
      <View style={[styles.DropElementParentContainer]}>
        <Text style={[styles.DropElementParentTxt, {color: 'black'}]}>
          {item?.name}
        </Text>
      </View>
    );
  };

  const showDateTimePicker = type => {
    setShowFromDate(type === 'fromDate');
    setShowFromTime(type === 'fromTime');
  };

  const onDateTimeChange = (event, selectedDate) => {
    if (showFromDate) {
      setShowFromDate(false);
      const formattedDate = selectedDate
        ? moment(selectedDate).format('YYYY/MM/DD')
        : '';
      setdate(formattedDate);
      setSelectedFromDate(selectedDate || selectedFromDate);
      console.log(
        'selectedFromDate changed:',
        selectedDate || selectedFromDate,
      );
    } else if (showFromTime) {
      setShowFromTime(false);
      const formattedTime = selectedDate
        ? moment(selectedDate).format('HH:mm')
        : '';
      setTime(formattedTime);
      setSelectedFromTime(selectedDate || selectedFromTime);
      console.log(
        'selectedFromTime changed:',
        selectedDate || selectedFromTime,
      );
    }
  };

  const postApi = () => {
    let payload = {
      Locations: selectLocation,
      Services: maidSelected
        ? 'Maid'
        : cookSelected
        ? 'Cook'
        : nannySelected
        ? 'Nanny'
        : null,
      date: date,
      start_time: time,
    };
    axios
      .get(
        `https://yellowsensebackendapi.azurewebsites.net/get_matching_service_providers?Locations=${payload.Locations}&Services=${payload.Services}&date=${payload.date}&start_time=${payload.start_time}`,
      )
      .then(res => {
        console.log('170===>er', res?.data?.providers);
        setData(res?.data?.providers);
        navigation.navigate('ViewHelper', {
          data: res?.data?.providers,
          selectedService: payload.Services,
        });
      })
      .catch(err => {
        console.log('174===>', err);
      });
  };

  const onCloseMessage = () => {
    setDisplayMessage(null);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.scrollView}>
            <View style={styles.userInformationView}>
              <Text style={styles.userHelloText}>
                {customerData?.Username
                  ? `Hello, ${customerData.Username}`
                  : 'Welcome'}
              </Text>
              <View style={styles.userLocationView}>
                <TouchableOpacity>
                  <Image
                    source={require('../Assets/notification.png')}
                    style={styles.userLocationImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Image
            source={require('../images/banner.png')}
            style={styles.bannerImage}
          />

          <TouchableOpacity style={styles.serviceBookView}>
            <Image
              source={require('../images/maid.png')}
              style={[styles.serviceBookImage]}
            />
            <Text style={styles.serviceBookText}>Book Now</Text>
          </TouchableOpacity>

          <View style={styles.services}>
            <View style={styles.servicesItem}>
              <TouchableOpacity
                onPress={() => {
                  setMaidSelected(true);
                  setCookSelected(false);
                  setNannySelected(false);
                }}
                style={styles.serviceItemView}>
                <Image
                  source={
                    maidSelected
                      ? require('../Assets/MaidFormimage/195060-200.png')
                      : require('../Assets/MaidFormimage/radio-button-unchecked-icon-512x512-k1fkebfk.png')
                  }
                  style={styles.radioBtn}
                />
                <Text style={styles.servicesText}>Maid</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setMaidSelected(false);
                  setCookSelected(true);
                  setNannySelected(false);
                }}
                style={styles.serviceItemView}>
                <Image
                  source={
                    cookSelected
                      ? require('../Assets/MaidFormimage/195060-200.png')
                      : require('../Assets/MaidFormimage/radio-button-unchecked-icon-512x512-k1fkebfk.png')
                  }
                  style={styles.radioBtn}
                />
                <Text style={styles.servicesText}>Cook</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setMaidSelected(false);
                  setCookSelected(false);
                  setNannySelected(true);
                }}
                style={styles.serviceItemView}>
                <Image
                  source={
                    nannySelected
                      ? require('../Assets/MaidFormimage/195060-200.png')
                      : require('../Assets/MaidFormimage/radio-button-unchecked-icon-512x512-k1fkebfk.png')
                  }
                  style={styles.radioBtn}
                />
                <Text style={styles.servicesText}>Nanny</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.selectInfoView}>
            <Text style={styles.selectInfoText}>Select Apartment</Text>
            <View style={[styles.TxtInptContainer]}>
              <Dropdown
                style={[styles.dropdown]}
                search
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={societyname}
                maxHeight={300}
                labelField="name"
                valueField="id"
                placeholder={
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 16}}>
                      {SpecialityType ? SpecialityType : 'Search Apartment'}
                    </Text>
                  </View>
                }
                searchPlaceholder="Search Here..."
                value={SpecialityType}
                onChange={item => {
                  setSelectedLocation(item.name);
                }}
                renderItem={renderItem}
              />
            </View>

            <Text style={styles.selectInfoText}>Select Date</Text>
            <TouchableOpacity
              style={styles.selDateView}
              onPress={() => showDateTimePicker('fromDate')}>
              <Text style={[styles.timeDateTextStyle]}>
                {selectedFromDate
                  ? moment(selectedFromDate, 'YYYY-MM-DD HH:mm:ss.S').format(
                      'DD/MM/YYYY',
                    )
                  : 'Select Date'}

                {/* {selectedFromDate.toDateString()} */}
              </Text>
              <Image
                source={require('../Assets/MaidFormimage/Vector.png')}
                style={styles.calCloImg}
              />
              {showFromDate && (
                <DateTimePicker
                  value={selectedFromDate}
                  mode="date"
                  display="calendar"
                  onChange={onDateTimeChange}
                />
              )}
            </TouchableOpacity>

            <Text style={styles.selectInfoText}>Select Time</Text>
            <TouchableOpacity
              onPress={() => showDateTimePicker('fromTime')}
              style={styles.selDateView}>
              <Text style={[styles.timeDateTextStyle]}>
                {selectedFromTime
                  ? moment(selectedFromTime, 'YYYY-MM-DD HH:mm:ss.S').format(
                      'HH:mm A',
                    )
                  : 'Select time'}
              </Text>
              <Image
                source={require('../Assets/MaidFormimage/clock.png')}
                style={styles.calCloImg}
              />

              {showFromTime && (
                <DateTimePicker
                  value={selectedFromTime}
                  mode="time"
                  display="clock"
                  onChange={onDateTimeChange}
                />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.submitButton]}
            onPress={postApi}
            //</ScrollView>onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          <View
            style={{
              margin: 16,
              padding: 16,
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
              What our customers say ?
            </Text>
          </View>
          <StatusUpdationNotification message={displayMessage} />
          <View style={styles.cardContainer}>
            <View style={styles.cardContent}>
              <Text style={styles.doctorText}>Dr. Swati</Text>

              <Text style={styles.locationText}>Basavangudi</Text>

              <Image
                source={require('../Assets/star_ratings.png')} // Update the path
                style={styles.ratingIcon}
              />

              <Text style={styles.testimonialText}>
                "We are very happy with your services. {'\n'}
                Nagma is a very efficient nanny. My baby is in good hands.{' '}
                {'\n'}
                Thank You!"
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    backgroundColor: '#FFF2CD',
    width: '100%',
    height: hpx(100),
  },
  carouselImage: {
    width: '100%',
    height: hpx(190),
    marginTop: hpx(16),
  },
  userInformationView: {
    marginHorizontal: wpx(20),
    marginTop: hpx(32),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userHelloText: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 33,
    color: '#000000',
  },
  userLocationView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  selectLocationText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
  },
  userLocationText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 18,
  },
  userLocationImage: {
    width: wpx(20),
    height: hpx(20),
  },
  bannerImage: {
    width: '100%',
    height: hpx(190),
    marginTop: hpx(16),
  },
  serviceBookView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2CD',
    marginHorizontal: wpx(20),
    marginTop: hpx(20),
    paddingHorizontal: wpx(20),
    borderRadius: 20,
    borderWidth: 0.3,
  },
  selectInfoView: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFF2CD',
    marginHorizontal: wpx(20),
    marginVertical: hpx(30),
    paddingHorizontal: wpx(20),
    borderRadius: 20,
    borderWidth: 0.3,
    paddingVertical: hpx(40),
  },
  serviceBookImage: {
    width: wpx(124),
    height: hpx(132),
  },
  serviceBookText: {
    marginLeft: wpx(30),
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 28,
  },
  selectInfoText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 28,
  },
  selDateView: {
    backgroundColor: 'white',
    //padding: 8,
    // paddingHorizontal: wpx(50),
    height: 40,
    marginVertical: hpx(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    padding: 12,
  },

  timeDateTextStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  calCloImg: {
    width: wpx(16),
    height: hpx(16),
    marginLeft: wpx(20),
    resizeMode: 'contain',
  },
  services: {
    marginVertical: hpx(20),
  },
  serviceItem: {
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hpx(20),
  },
  radioBtn: {
    height: hpx(24),
    width: wpx(20),
    marginEnd: wpx(5),
    resizeMode: 'contain',
  },
  radioText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#000000',
    width: wpx(150),
  },
  servicesItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: wpx(30),
  },
  servicesText: {
    fontSize: 22,
    lineHeight: 24,
    color: '#170F49',
  },
  submitButton: {
    backgroundColor: '#F89C29',
    paddingVertical: hpx(16),
    paddingHorizontal: wpx(80),
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: hpx(10),
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  cardContainer: {
    backgroundColor: '#FFF0CC',
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 50,
    padding: 16,
    alignItems: 'center',
  },
  cardContent: {
    alignItems: 'center',
  },
  doctorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 10,
    color: '#333',
    marginBottom: 8,
  },
  ratingIcon: {
    width: 100,
    marginBottom: 8,
  },
  testimonialText: {
    fontSize: 10,
    color: '#555',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  DropElementParentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // justifyContent: ,
    borderBottomWidth: 0,
    backgroundColor: '#FDD312',
  },
  DropElementParentTxt: {
    fontSize: 16,
    flex: 1,
    color: 'black',
  },
  TxtInptContainer: {
    height: 50,
    marginVertical: hpx(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  dropdown: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
  },
  placeholderStyle: {
    color: 'gray',
    fontSize: 16,
  },
  selectedTextStyle: {
    color: 'gray',
    fontFamily: 'SofiaPro',
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default Home;
