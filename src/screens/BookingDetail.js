import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';
import {wpx, hpx, wp} from '../Component/responsive';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sendNotificationToServiceProvider} from '../utils/notification';
import LottieView from 'lottie-react-native';
import Sound from 'react-native-sound';

const CustomMessageDisplay = ({message, onAccept, onReject, onClose}) => {
  const navigation = useNavigation();
  const [assignNewShown, setAssignNewShown] = useState(false);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [alarmSound, setAlarmSound] = useState(null);

  useEffect(() => {
    if (message) {
      startAlarm();
    }
  }, [message]);

  const startAlarm = () => {
    setIsAlarmActive(true);
    // Initialize the sound object
    const sound = new Sound('sound', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Sound loading failed:', error);
      } else {
        console.log('Sound loaded successfully');
        sound.play(success => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Sound playback failed');
          }
        });
        setAlarmSound(sound);
      }
    });
  };

  const stopAlarm = () => {
    setIsAlarmActive(false);
    if (alarmSound) {
      alarmSound.stop();
    }
  };

  useEffect(() => {
    // Check if message exists and notification title includes "Service Provider Update"
    if (
      message &&
      message.notification.title.includes('Service Provider Update')
    ) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  if (message.notification.body.includes('rejected')) {
    if (!assignNewShown) {
      setAssignNewShown(true);
      navigation.navigate('AssignNew');
    }
    return null;
  } else {
    return (
      <Modal visible={true} animationType="slide" transparent>
        <TouchableWithoutFeedback
          onPress={onClose}
          style={styles.modalContainer}>
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modalContent,
                message.notification.title.includes(
                  'Service Provider Update',
                ) && styles.serviceProviderUpdateContent,
              ]}>
              {message &&
              message.notification.title ===
                'Service Provider Update' ? null : (
                <View style={styles.headerIcon}>
                  <LottieView
                    source={require('../Assets/confirmBooking-loader.json')}
                    autoPlay
                    loop
                    style={styles.loaderImage}
                  />
                </View>
              )}

              {message && (
                <>
                  <View style={{width: 300}}>
                    <Text style={styles.actionText5}>
                      {message?.notification?.title}
                    </Text>
                    <Text style={{fontSize: 16}}>
                      {message?.notification?.body}
                    </Text>
                  </View>
                  {!message.notification.title.includes(
                    'Service Provider Update',
                  ) && (
                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          onClose();
                          stopAlarm();
                          navigation.navigate('Booking');
                        }}
                        style={styles.rejectButton}>
                        <Text style={styles.actionText}>View Bookings</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          onClose();
                          stopAlarm();
                          navigation.navigate('HomeScreen');
                        }}
                        style={styles.acceptButton1}>
                        <Text style={styles.actionText1}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {message.notification.title.includes(
                    'Service Provider Update',
                  ) && (
                    <View style={styles.updatedButtons}>
                      <TouchableOpacity
                        onPress={() => {
                          onClose();
                          stopAlarm();
                          navigation.navigate('HomeScreen');
                        }}
                        style={styles.acceptButtonOk}>
                        <Text style={styles.actionTextOk}>OK</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          onClose();
                          stopAlarm();
                          navigation.navigate('Support');
                        }}
                        style={styles.actionTextNeedHelp}>
                        <Text style={styles.actionTexthelp}>Need Help</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
};

const BookingDetail = props => {
  const navigation = useNavigation();
  const [ModalVisible, setModalVisible] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const maidnumber = props?.route?.params?.data?.usernumber;
  const usernumber = props?.route?.params?.data?.item;
  const [maiddata, setMaidData] = useState(null);
  const [customerdetail, setCustomerDetail] = useState(null);
  const [confirmPressed, setConfirmPressed] = useState(false);
  const [custmernumber, setcustmernumber] = useState('');
  const [Providernumber, setProvidernumber] = useState();
  const [displayMessage, setDisplayMessage] = useState(null);
  const [apartment, setApartment] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [startTime, setStartTime] = useState('');
  const [startDate, setStartDate] = useState();

  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState('');
  const [isSelected, setIsSelected] = useState(false);

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

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('data');
      const userData1 = await AsyncStorage.getItem('user');
      const apartment1 = await AsyncStorage.getItem('apartment');
      const startTime = await AsyncStorage.getItem('starttime');
      const startDate = await AsyncStorage.getItem('startDate');
      const servicetype5 = await AsyncStorage.getItem('serviceType');

      setcustmernumber(userData1);
      setProvidernumber(userData);
      setApartment(apartment1);
      setServiceType(servicetype5);
      setStartTime(startTime);
      setStartDate(startDate);
      console.log('datahdhahhj', userData);
      console.log('sajkajs', userData1);
      console.log('apartment', apartment1);
      console.log('startTime', startTime);
      console.log('startDate', startDate);
      console.log('servicetype5', servicetype5);
      getBookingData(userData, userData1);
    } catch (error) {
      console.log('ljkhkjh', error);
    }
  };

  const getBookingData = (userData, userData1) => {
    console.log('64===>', userData1, userData1);
    const payload = {
      customer_mobile_number: userData1,
      provider_mobile_number: userData,
    };
    axios
      .get(
        'https://yellowsensebackendapi.azurewebsites.net/getcustomermaiddetails',
        {
          params: payload,
        },
      )
      .then(res => {
        console.log('API Response: Lok3gsg', res); // Log for debugging
        setMaidData(res?.data?.provider_details);
        setCustomerDetail(res?.data?.customer_details);
      })
      .catch(err => {
        console.log('Error: 4355x', err);
      });
  };

  const confirmBookingApi = status => {
    const bookingLocation =
      isSelected && selectedAddress
        ? `${selectedAddress.address.houseno}, ${selectedAddress.address.roadname}, ${selectedAddress.address.pincode}`
        : apartment;

    const payload = {
      customer_mobile_number: custmernumber,
      provider_mobile_number: Providernumber,
      status: status,
      apartment: bookingLocation,
      start_time: startTime,
      service_type: serviceType,
      start_date: startDate,
    };

    axios
      .post('https://yellowsensebackendapi.azurewebsites.net/booking', payload)
      .then(res => {
        console.log('Booking confirmed:', res);
      })
      .catch(err => {
        console.log('Error confirming booking:', err);
      });
  };

  function successCallback(data) {
    console.log(data);
  }

  function failureCallback(data) {
    console.log(data);
  }

  useEffect(() => {
    getBookingData();
    if (confirmPressed) {
      setShowConfirmationModal(true);
      setConfirmPressed(false);
    }
  }, [confirmPressed]);

  const confirmationBooking = () => {
    getBookingData(); // Fetch data using GET request
    setShowConfirmationModal(true);
  };

  const handleConfirmationAction = action => {
    setShowConfirmationModal(false);
    if (action === 'confirm') {
      confirmBookingApi('confirm');
      navigation.navigate('Booking');
    } else if (action === 'cancel') {
      confirmBookingApi('cancel');
      navigation.navigate('HomeScreen');
    }
  };

  const handleBookingConfirmation = async () => {
    // Get the FCM token for the selected service provider
    const serviceProviderMobileNumber = Providernumber;
    const serviceProviderFCMToken = await getServiceProviderFCMToken(
      serviceProviderMobileNumber,
    );

    if (serviceProviderFCMToken) {
      // Send the notification to the service provider
      await sendNotificationToServiceProvider(
        serviceProviderMobileNumber,
        'Booking Confirmation Message',
      );
      navigation.navigate('ConfirmationLoading', {
        service_type: serviceType,
      });
    } else {
      console.error('Service provider FCM token not found.');
    }
  };

  const getServiceProviderFCMToken = async mobileNumber => {
    try {
      const serviceProviderTokensRef = firestore().collection('service_tokens');
      const serviceProviderSnapshot = await serviceProviderTokensRef
        .doc(mobileNumber)
        .get();

      if (serviceProviderSnapshot.exists) {
        const data = serviceProviderSnapshot.data();
        return data.fcmToken;
      } else {
        console.error(
          'Service provider FCM token not found for mobile number:',
          mobileNumber,
        );
        return null;
      }
    } catch (error) {
      console.error('Error retrieving service provider FCM token:', error);
      return null;
    }
  };

  const onCloseMessage = () => {
    setDisplayMessage(null);
  };

  const fetchAddressList = async () => {
    try {
      const response = await axios.get(
        `https://yellowsensebackendapi.azurewebsites.net/address_details?registermobilenumber=${custmernumber}`,
      );

      const fetchedAddressList = response.data;
      setAddressList(fetchedAddressList);
      // console.log(addressList);

      // console.log('Customer Number', custmernumber);
    } catch (error) {
      console.error('Error fetching address list:', error);

      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    }
  };

  useEffect(() => {
    fetchAddressList();

    const intervalId = setInterval(fetchAddressList, 3000);

    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [custmernumber]);

  const handleAddressSelect = address => {
    if (address) {
      setSelectedAddress(address);
      setSelectedNumber(address.mobilenumber ?? '');
      setSelectedName(address.name);
    } else {
      // If address is null, select the static address
      setSelectedAddress(null);
      setSelectedNumber(customerdetail?.MobileNumber ?? '');
      setSelectedName(customerdetail?.Username ?? '');
      setIsSelected(false);
    }
    setModalVisible(false);
    setIsSelected(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <ScreenHeader title="Booking Details" />
        </View>

        <View style={styles.bookingDetailsInfoView}>
          <Image
            source={require('../Assets/service_image/maid.jpg')}
            style={styles.bookingDetailsInfoImage}
          />
          <View style={styles.bookingDetailsInfoTextContainer}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, {fontWeight: 'bold'}]}>
                {maiddata?.Name}
              </Text>
            </View>

            <View style={[styles.infoRow1, {width: 100}]}>
              <Text style={styles.infoLabel}>Area:</Text>
              <Text style={[styles.infoValue]} numberOfLines={10}>
                {maiddata?.Locations}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Rating:</Text>
              <Image
                source={require('../Assets/star_ratings.png')}
                style={{marginLeft: wpx(15)}}
              />
            </View>
          </View>
        </View>

        <View style={styles.addressandChargeContainer}>
          <Text
            style={[
              styles.addressandChargeText,
              {fontSize: 20, marginBottom: hpx(10)},
            ]}>
            Service Location
          </Text>

          <View style={styles.addressandChargeView}>
            <View style={styles.selectAddView}>
              <Text
                style={[
                  styles.addressandChargeText,
                  {fontSize: 16, alignSelf: 'center'},
                ]}>
                Select Address
              </Text>
            </View>

            <View style={styles.addressInfoNameText}>
              <Text
                style={[
                  styles.addressandChargeText,
                  {fontSize: 16, marginTop: hpx(5)},
                ]}>
                {isSelected ? selectedName : customerdetail?.Username}
              </Text>

              <TouchableOpacity
                style={styles.changeBtnView}
                onPress={() => setModalVisible(!ModalVisible)}>
                <Text style={styles.changeBtnText}>change</Text>
              </TouchableOpacity>
            </View>

            <Text
              style={[
                styles.addressandChargeText,
                {fontSize: 16, marginLeft: wpx(20)},
              ]}>
              {isSelected
                ? selectedNumber || customerdetail?.MobileNumber
                : customerdetail?.MobileNumber}
            </Text>

            <Text
              style={[
                styles.addressandChargeText,
                {fontSize: 16, marginLeft: wpx(20)},
              ]}>
              Address
            </Text>

            {isSelected && selectedAddress ? (
              <Text style={styles.addressInfoText}>
                {`${selectedAddress.address.houseno}, ${selectedAddress.address.roadname}, ${selectedAddress.address.pincode}`}
              </Text>
            ) : (
              <Text style={styles.addressInfoText}>{apartment}</Text>
            )}
          </View>

          <Text
            style={[
              styles.addressandChargeText,
              {fontSize: 20, marginTop: hpx(10)},
            ]}>
            Charges
          </Text>

          <View
            style={[
              styles.addressandChargeView,
              {padding: 20, marginTop: hpx(20)},
            ]}>
            <View style={styles.bookingCostView}>
              <Text
                style={[
                  styles.addressandChargeText,
                  {fontSize: 16, marginTop: hpx(5)},
                ]}>
                Booking Cost
              </Text>
              <Text
                style={[
                  styles.addressandChargeText,
                  {fontSize: 16, marginTop: hpx(5)},
                ]}>
                {'\u20A8'} {' 10'}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.noteStyleView]}>
          <View style={[styles.noteStyle]}>
            <Text style={[styles.addressandChargeText, {fontSize: 16}]}>
              Note:-
            </Text>
            <Text style={[styles.noteTextStyle]}>
              The payment of Rs.10/- is charged only once per day basis. Once
              paid you can book multiple maid, cook or nanny!
            </Text>
          </View>
        </View>

        <View style={{backgroundColor: 'white'}}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.btnView, {backgroundColor: '#FF1B5FC7'}]}
              onPress={() => {
                navigation.navigate('BottomTabNavigator');
              }}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnView, {backgroundColor: '#6244C4'}]}
              onPress={confirmationBooking}>
              <Text style={styles.btnText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal for Confirmation */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showConfirmationModal}>
          <TouchableWithoutFeedback>
            <View style={styles.confirmationModal}>
              <View style={styles.centeredView}>
                <View style={styles.confirmationModalContainer}>
                  <Text style={styles.confirmationModalText}>
                    Are you want to confirm this booking?
                  </Text>
                  <View style={styles.confirmationModalButtons}>
                    <TouchableOpacity
                      style={styles.confirmationModalButton2}
                      onPress={() => handleConfirmationAction('cancel')}>
                      <Text style={styles.confirmationModalButtonText2}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.confirmationModalButton}
                      onPress={() => {
                        handleConfirmationAction('confirm');
                        handleBookingConfirmation();
                        // After handling booking confirmation, navigate to confirmationLoadingScreen
                        navigation.navigate('ConfirmationLoading');
                      }}>
                      <Text style={styles.confirmationModalButtonText}>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <CustomMessageDisplay
          message={displayMessage}
          onClose={onCloseMessage}
        />
        {/* <StatusUpdateNotification /> */}
        <View>
          <Modal animationType="fade" transparent={true} visible={ModalVisible}>
            <TouchableWithoutFeedback>
              <View style={styles.filterModal}>
                <View style={styles.filterModalContainer}>
                  <View style={styles.filterModalFilter}>
                    <Text style={styles.filterModalFilterText}>
                      Change Address
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                      }}>
                      <Image
                        source={require('../Assets/filtericon/crossicon.png')}
                        style={styles.filterModalCloseBtn}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.line]} />
                  <TouchableOpacity
                    style={[
                      styles.bookingDetailsView,
                      {marginHorizontal: wpx(20)},
                    ]}>
                    <Image
                      source={require('../Assets/filtericon/pushicon.png')}
                      style={styles.filterModalCloseBtn}
                    />
                    <Pressable
                      onPress={() =>
                        navigation.navigate('NewAddress', {
                          customerNumber: customerdetail?.MobileNumber,
                        })
                      }>
                      <Text style={styles.filterModalFilterText}>
                        Add New Address
                      </Text>
                    </Pressable>
                  </TouchableOpacity>
                  <View style={[styles.line]} />
                  <ScrollView showsVerticalScrollIndicator={true}>
                    <Pressable onPress={() => handleAddressSelect(null)}>
                      <View style={styles.filterModalFilter}>
                        <Text style={styles.filterModalFilterText}>
                          {customerdetail?.Username}
                        </Text>
                        {isSelected && selectedAddress === null && (
                          <Image
                            source={require('../Assets/tick_circle.png')}
                            style={styles.tickIcon}
                          />
                        )}
                      </View>
                      <Text
                        style={[
                          styles.filterModalFilterText,
                          {marginLeft: wpx(30)},
                        ]}>
                        {customerdetail?.MobileNumber}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '300',
                          color: '#000000',
                          marginHorizontal: wpx(30),
                          width: wpx(250),
                        }}>
                        {apartment}
                      </Text>
                    </Pressable>

                    {addressList.map((address, index) => (
                      <Pressable
                        key={index}
                        onPress={() => handleAddressSelect(address)}>
                        <View>
                          <View style={[styles.line]} />
                          <View style={styles.filterModalFilter}>
                            <Text style={styles.filterModalFilterText}>
                              {address.name}
                            </Text>
                            {isSelected &&
                              selectedAddress?.id === address.id && (
                                <Image
                                  source={require('../Assets/tick_circle.png')}
                                  style={styles.tickIcon}
                                />
                              )}
                          </View>
                          <Text
                            style={[
                              styles.filterModalFilterText,
                              {marginLeft: wpx(30)},
                            ]}>
                            {address.mobilenumber}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '300',
                              color: '#000000',
                              marginHorizontal: wpx(30),
                              width: wpx(250),
                            }}>
                            {`${address.address.houseno}, ${address.address.roadname}, ${address.address.pincode}`}
                          </Text>
                        </View>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0CC',
  },
  bookingDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wpx(20),
    marginTop: hpx(20),
    justifyContent: 'space-between',
  },
  bookingDetailsView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backImage: {
    width: wpx(32),
    height: hpx(32),
    //resizeMode:'contain'
  },
  tickIcon: {
    marginHorizontal: wpx(10),
  },
  bookingDetailsText: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 48,
    color: '#0D007F',
    marginLeft: wpx(50),
  },
  bookingDetailsInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wpx(20),
    marginTop: hpx(20),
  },
  bookingDetailsInfoImage: {
    width: wpx(182),
    height: hpx(158),
    resizeMode: 'contain',
    borderRadius: 16,
    borderWidth: 1,
  },
  bookingDetailsInfoTextContainer: {
    marginLeft: wpx(16),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hpx(5), // Adjust the spacing as needed
    //justifyContent:'space-between'
  },
  infoRow1: {
    flexDirection: 'row',
    // alignItems: 'center',
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
  bookingDetailsInfoTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingDetailsInfoText: {
    fontSize: 18,
    lineHeight: 24,
    color: '#000000',
  },
  addressandChargeContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: wpx(20),
    marginTop: hpx(16),
    paddingVertical: hpx(24),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  addressandChargeView: {
    borderWidth: 1,
    borderColor: '#FDD312',
  },
  noteStyleView: {
    backgroundColor: '#ffffff',
  },
  noteTextStyle: {
    marginLeft: hpx(10),
    width: 232,
    color: '#000000',
    fontSize: 12,
  },
  noteStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    // width:350,
    paddingHorizontal: wpx(24),
    marginHorizontal: wpx(20),
    marginBottom: hpx(20),
    paddingVertical: hpx(10),
    backgroundColor: '#FFF0CC',
    borderRadius: 12,
  },
  selectAddView: {
    backgroundColor: '#FDD312',
    paddingVertical: hpx(4),
  },
  addressandChargeText: {
    fontWeight: '600',
    color: '#000000',
    lineHeight: 24,
  },
  addressInfoText: {
    marginHorizontal: wpx(20),
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginBottom: hpx(10),
  },
  addressInfoNameText: {
    flexDirection: 'row',
    marginHorizontal: wpx(20),
    justifyContent: 'space-between',
  },
  changeBtnView: {
    borderWidth: 1,
    padding: [wpx(2), hpx(2)],
    borderColor: '#FDD312',
    marginTop: hpx(10),
    borderRadius: 4,
    paddingHorizontal: wpx(8),
  },
  changeBtnText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 24,
    color: '#FDD312',
  },
  bookingCostView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 10,
    marginTop: hpx(10),
    borderRadius: 8,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hpx(24),
    justifyContent: 'space-between',
    marginHorizontal: wpx(30),
    marginBottom: hpx(24),
  },
  btnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    lineHeight: 24,
  },
  btnView: {
    paddingHorizontal: wpx(40),
    paddingVertical: hpx(10),
    borderRadius: 8,
  },
  filterModal: {
    backgroundColor: '#000000aa',
    flex: 1,
    justifyContent: 'flex-end',
    width: Dimensions.get('window').width,
  },
  filterModalContainer: {
    backgroundColor: '#ffffff',
    height: 500,
    paddingVertical: hpx(20),
    borderTopEndRadius: 16,
    borderTopLeftRadius: 16,
  },
  filterModalFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wpx(20),
  },
  filterModalFilterText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 28,
    color: '#000000',
    marginLeft: wpx(10),
  },
  filterModalFilterTextEdit: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 28,
    color: '#F89C29',
    marginLeft: wpx(10),
  },
  filterModalCloseBtn: {
    width: wpx(24),
    height: hpx(24),
  },
  line: {
    width: wp(100),
    backgroundColor: '#FDD312',
    height: 1,
    marginVertical: hpx(10),
  },
  confirmationModal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationModalContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    elevation: 5, // for Android shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  confirmationModalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    alignItems: 'center',
    color: 'black',
    textAlign: 'center',
  },
  confirmationModalText2: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  confirmationModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmationModalButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F2CA05',
    flex: 0.48,
    alignItems: 'center',
  },
  confirmationModalButton2: {
    padding: 10,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
    borderColor: '#F2CA05',
    borderWidth: 2,
  },
  confirmationModalButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  confirmationModalButtonText2: {
    color: '#F2CA05',
    fontWeight: 'bold',
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
  rejectedImage: {
    width: 150,
    height: 150,
  },
  loaderImage: {
    width: 200,
    height: 200,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 40,
    width: 370,
    elevation: 5,
    borderRadius: 15,
  },
  actionText5: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    color: 'black',
    marginBottom: 10,
  },
  headerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    gap: 10,
  },
  rejectButton: {
    padding: 13,
    backgroundColor: '#F2CA05',
    borderRadius: 10,
    width: 170,
  },
  acceptButton: {
    padding: 13,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 170,
  },
  acceptButton1: {
    padding: 13,
    borderColor: '#F2CA05',
    borderRadius: 10,
    width: 170,
    borderWidth: 1,
  },
  actionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  actionText1: {
    color: '#F2CA05',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  acceptButtonOk: {
    padding: 8,
    backgroundColor: '#F2CA05',
    borderRadius: 10,
    width: 120,
    alignSelf: 'center',
    marginTop: 15,
  },
  actionTextOk: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  actionTextNeedHelp: {
    padding: 8,
    borderColor: '#F2CA05',
    borderRadius: 10,
    width: 120,
    alignSelf: 'center',
    marginTop: 15,
    borderWidth: 1,
  },
  updatedButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    flexDirection: 'row',
  },
  actionTexthelp: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  serviceProviderUpdateContent: {
    backgroundColor: 'white',
    padding: 20,
    width: 380,
    bottom: 310,
    height: 170,
  },
});
export default BookingDetail;
export {CustomMessageDisplay};
