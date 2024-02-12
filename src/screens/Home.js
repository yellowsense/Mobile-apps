import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import {wpx, hpx} from '../Component/responsive';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {sendNotificationToCustomer} from '../utils/notification';
import LottieView from 'lottie-react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomMessageDisplay = ({message, onAccept, onReject, onClose}) => {
  const navigation = useNavigation();

  const storeMessageInAsyncStorage = async () => {
    try {
      const existingMessage = await AsyncStorage.getItem('lastMessage');
      if (existingMessage) {
        // If there's an existing message, remove it
        await AsyncStorage.removeItem('lastMessage');
        console.log('old message removed');
      }
      // Store the new message
      await AsyncStorage.setItem('lastMessage', JSON.stringify(message));
      console.log('Message stored successfully:', message);
    } catch (error) {
      console.log('Error storing message:', error);
    }
  };

  useEffect(() => {
    // Store the message in AsyncStorage when a new message arrives
    if (message) {
      storeMessageInAsyncStorage(message);
    }
  }, [message]);

  const handleRejectAction = () => {
    onReject();
    onClose();
  };

  const handleAcceptAction = () => {
    onAccept();
    onClose();
    navigation.navigate('OderStatus', {message});
  };

  return (
    <Modal visible={message !== null} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={{backgroundColor: '#F2CA05', borderRadius: 50}}>
          <LottieView
            source={require('../Assets/timer-countdown.json')}
            style={{width: 100, height: 100, objectFit: 'cover'}}
            autoPlay
            loop
          />
        </View>
        <View style={styles.modalContent}>
          <View style={styles.headerIcon}>
            <Icon
              name="minus"
              size={30}
              color="gray"
              style={{textAlign: 'center', marginTop: -30}}
            />
          </View>

          {message && (
            <>
              <View style={{padding: 10}}>
                <Text style={styles.notificationText}>
                  {message.notification.title}
                </Text>
                {message.notification.body.split('\n').map((line, index) => (
                  <View key={index} style={styles.mainView}>
                    {line.includes('Apartment:') ? (
                      <>
                        <Icon name="location-pin" size={30} color="gray" />
                        <Text
                          style={{marginLeft: 5, fontSize: 18, marginTop: 5}}>
                          {line.replace('Apartment:', 'Job Location:\n')}
                        </Text>
                      </>
                    ) : !line.includes('Start Date:') &&
                      !line.includes('Customer_phone_number') ? (
                      line.includes('Service Type:') ? (
                        <>
                          <Text
                            style={{
                              marginLeft: 20,
                              fontSize: 18,
                            }}>
                            {line.replace('Service Type:', 'Service:')}
                          </Text>
                        </>
                      ) : line.includes('Start Time:') ? (
                        <>
                          <Text
                            style={{
                              marginLeft: 20,
                              fontSize: 18,
                            }}>
                            {line.replace('Start Time:', 'Time:')}
                          </Text>
                        </>
                      ) : (
                        <Text style={styles.notificationName}>
                          {line.replace('Name:', '')}
                        </Text>
                      )
                    ) : null}
                  </View>
                ))}
              </View>

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  onPress={handleRejectAction}
                  style={styles.rejectButton}>
                  <Text style={styles.actionText}>Reject</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleAcceptAction}
                  style={styles.acceptButton}>
                  <Text style={styles.actionText}>Accept</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const Home = () => {
  const {width: screenWidth} = Dimensions.get('window');
  const [data, setdata] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const navigation = useNavigation();
  const [maidDetails, setMaidDetails] = useState(null);
  const [numberOfLatestRequests, setNumberOfLatestRequests] = useState(0);
  const route = useRoute();
  const {user_mobile_number} = route.params;
  const [storedMessage, setStoredMessage] = useState(null);
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState(null);
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    // Retrieve the stored message from AsyncStorage when the component mounts
    const retrieveStoredMessage = async () => {
      try {
        const message = await AsyncStorage.getItem('lastMessage');
        if (message) {
          const parsedMessage = JSON.parse(message);
          const body = parsedMessage.notification.body;
          const phoneNumberIndex =
            body.indexOf('Customer_phone_number:') +
            'Customer_phone_number:'.length;
          const phoneNumber = body.substring(phoneNumberIndex).trim();
          console.log('Parsed customer phone number:', phoneNumber);
          setCustomerPhoneNumber(phoneNumber);
          // Update dummy state variable to force re-render
          setForceRender(prevState => !prevState);
        }
      } catch (error) {
        console.log('Error retrieving stored message:', error);
      }
    };

    retrieveStoredMessage();
  }, [forceRender]);

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
        console.log('res123====>', response.data.serviceproviders);
      } else {
        console.error('Error fetching maid details');
      }
    } catch (error) {
      console.error('Error fetching maid details:', error.message);
    }
  };

  function toggleSwitch() {
    setIsOn(isOn => !isOn);
  }

  useEffect(() => {
    fetchMaidDetails();
    getlist();
    console.log(user_mobile_number, 'Hello World');
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getlist();
    }, [data]),
  );

  const getlist = () => {
    axios
      .get(
        `https://yellowsensebackendapi.azurewebsites.net/serviceprovider/requests?provider_mobile=${user_mobile_number}`,
      )
      .then(res => {
        setdata(res?.data);
        // console.log('res====>', res?.data);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const apiUrl = `https://yellowsensebackendapi.azurewebsites.net/get_latest_details?mobile_number=${user_mobile_number}`;

  const fetchData = () => {
    axios
      .get(apiUrl)
      .then(response => {
        const latestDetails = response.data.latest_details;
        setNumberOfLatestRequests(latestDetails.length);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
    // console.log(user_mobile_number, 'user_mobile_number');
  }, [user_mobile_number]);

  const carouselItems = [
    {
      image: require('../Assets/Banners/loan_banner.png'),
      // You can add other properties like title, description, etc.
    },
    {
      image: require('../Assets/Banners/refer_banner.png'),
      // Other items...
    },
  ];

  const [displayMessage, setDisplayMessage] = useState(null);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setDisplayMessage(remoteMessage);
      console.log('Foreground Notification:', remoteMessage);
    });

    return () => unsubscribe();
  }, []);

  // ... (existing imports and code)

  const sendNotificationToBackend = async action => {
    try {
      if (!customerPhoneNumber) {
        console.error('Customer phone number not available');
        return;
      }
      console.log(customerPhoneNumber, 'Hii this customer Number');

      // Retrieve the FCM token for the customer from Firestore
      const customerDoc = await firestore()
        .collection('customer_tokens')
        .doc(customerPhoneNumber)
        .get();

      if (customerDoc.exists) {
        const customerData = customerDoc.data();
        console.log(
          'Retrieved Customer Data:',
          customerData,
          customerPhoneNumber,
        );

        await sendNotificationToCustomer(customerPhoneNumber, action);

        // Handle success (e.g., show a success message to the user)
        console.log('Notification sent to the customer!');
      } else {
        console.error('Customer FCM token not found in Firestore');
      }
    } catch (error) {
      console.error('Error sending notification to backend:', error);
    }
  };

  const handleAccept = () => {
    console.log('Accepted');
    sendNotificationToBackend('accept');
  };

  const handleReject = () => {
    console.log('Rejected');
    sendNotificationToBackend('reject');
  };

  const onCloseMessage = () => {
    setDisplayMessage(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.userInformationView}>
          {maidDetails ? (
            <Text style={styles.userHelloText}>
              Hello, {maidDetails.Username}{' '}
            </Text>
          ) : (
            <Text style={styles.userHelloText}>Loaiding...</Text>
          )}
          <View style={styles.userLocationView}>
            <TouchableOpacity
              style={[
                styles.outer,
                isOn
                  ? {justifyContent: 'flex-end', backgroundColor: 'black'}
                  : {justifyContent: 'flex-start', backgroundColor: 'black'},
              ]}
              activeOpacity={1}
              onPress={toggleSwitch}>
              {isOn ? (
                <>
                  <Text style={{color: 'white', marginRight: 7}}>ON</Text>
                  <View style={[styles.inner]} />
                </>
              ) : (
                <>
                  <View style={[styles.innerOff]} />
                  <Text style={{color: 'white', marginLeft: 5}}>OFF</Text>
                </>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Notifcation', {user_mobile_number})
              }>
              <Image
                source={require('../Assets/notification.png')}
                style={styles.userNotificationImage}
              />
              {numberOfLatestRequests > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {numberOfLatestRequests}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Image
          source={require('../Assets/Banners/loan_banner.png')}
          style={styles.bannerImage}
        />

        <View style={styles.serviceInfo}>
          <Text style={styles.serviceInfoText}>Service Overview</Text>
        </View>

        <View style={styles.singleServiceCardContainer}>
          <TouchableOpacity
            style={[styles.serviceCard]}
            onPress={() =>
              navigation.navigate('OngoingRequest', {
                ProviderNumber: user_mobile_number,
              })
            }>
            <Text style={[styles.numberText, {color: '#F89C29'}]}>
              {data?.total_requests}
            </Text>
            <Text style={[styles.requestText, {color: '#F89C29'}]}>
              Total Request
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.serviceCardContainer}>
          <TouchableOpacity
            style={[styles.serviceCard]}
            onPress={() =>
              navigation.navigate('CompletedRequest', {
                ProviderNumber: user_mobile_number,
              })
            }>
            <Text style={[styles.numberText, {color: '#1FAF38'}]}>
              {data?.accepted_requests}
            </Text>
            <Text style={[styles.requestText, {color: '#1FAF38'}]}>
              Accepted Request
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.serviceCard]}
            onPress={() =>
              navigation.navigate('CancelledRequest', {
                ProviderNumber: user_mobile_number,
              })
            }>
            <Text style={[styles.numberText, {color: '#EA001B'}]}>
              {data?.rejected_requests}
            </Text>
            <Text style={[styles.requestText, {color: '#EA001B'}]}>
              Rejected Request
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.availabilityView}>
          <Text style={styles.serviceInfoText}>Set Availability</Text>
        </View>

        <View style={styles.setAvailabilityCardContainer}>
          {/* // onPress={() => navigation.navigate('Availability')} */}
          <TouchableOpacity style={[styles.setAvailabilityCard]}>
            <Image
              source={require('../Assets/time_calendar.png')}
              style={styles.cardImage}
            />
            <Text style={[styles.cardText, {color: '#F89C29'}]}>
              Availability
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomMessageDisplay
        message={displayMessage}
        onAccept={handleAccept}
        onReject={handleReject}
        onClose={onCloseMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  userInformationView: {
    marginHorizontal: wpx(20),
    marginTop: hpx(10),
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
  outer: {
    width: 55,
    height: 25,
    backgroundColor: 'black',
    marginRight: 10,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 2,
  },
  inner: {
    width: 15,
    height: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 8,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.15,
    shadowRadius: '2',
  },
  innerOff: {
    width: 15,
    height: 15,
    backgroundColor: '#FFF0CC',
    borderRadius: 15,
    elevation: 8,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.15,
    shadowRadius: '2',
  },
  userNotificationImage: {
    width: wpx(30),
    height: hpx(30),
    resizeMode: 'contain',
  },
  notificationBadge: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 10,
    width: 16,
    height: 16,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 8,
  },
  bannerImage: {
    width: '95%',
    height: hpx(190),
    marginVertical: hpx(20),
    marginHorizontal: wpx(20),
  },
  carouselImage: {
    width: '90%',
    height: hpx(190),
    marginTop: hpx(16),
  },
  serviceInfo: {
    marginTop: hpx(30),
  },
  serviceInfoText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#0D007F',
    lineHeight: 27,
    textAlign: 'center',
  },
  availabilityView: {
    marginTop: hpx(50),
  },
  singleServiceCardContainer: {
    justifyContent: 'center',
    marginHorizontal: wpx(30),
    marginTop: hpx(30),
  },
  serviceCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wpx(30),
    marginTop: hpx(30),
  },
  serviceCard: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    marginHorizontal: wpx(5),
  },
  setAvailabilityCard: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: wpx(40),
    paddingVertical: hpx(10),
    borderRadius: 12,
    marginHorizontal: wpx(5),
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: hpx(10),
  },
  numberText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: hpx(30),
  },
  requestText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: hpx(20),
  },
  setAvailabilityCardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hpx(30),
    marginBottom: hpx(100),
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
    top: '43%',
    height: 390,
    marginTop: -340,
  },
  notificationText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: 'black',
  },
  notificationName: {
    fontSize: 22,
    textAlign: 'center',
    flex: 1,
    marginTop: 20,
    color: 'black',
    fontWeight: '600',
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
  },
  rejectButton: {
    paddingHorizontal: 65,
    padding: 10,
    backgroundColor: '#FF1B5FC7',
    borderRadius: 10,
  },
  acceptButton: {
    paddingHorizontal: 65,
    padding: 10,
    backgroundColor: '#5AC28E',
    borderRadius: 10,
  },
  actionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Home;
