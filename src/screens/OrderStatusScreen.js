import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  sendNotificationToCustomerAboutLocation,
  statusUpdationAboutFeedback,
  statusUpdationAboutWork,
} from '../utils/notification';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const OrderStatusScreen = () => {
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState(null);
  const [forceRender, setForceRender] = useState(false);
  const navigation = useNavigation();
  const [isLoadingLocationReached, setIsLoadingLocationReached] =
    useState(false);
  const [isLoadingCompletedService, setIsLoadingCompletedService] =
    useState(false);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

  useEffect(() => {
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
          setCustomerPhoneNumber(phoneNumber);
          // console.log(customerPhoneNumber, 'This is number');
          setForceRender(prevState => !prevState);
        }
      } catch (error) {
        console.log('Error retrieving stored message:', error);
      }
    };

    retrieveStoredMessage();
  }, [forceRender]);

  const sendNotificationToBackend = async () => {
    setIsLoadingLocationReached(true);
    try {
      if (!customerPhoneNumber) {
        console.error('Customer phone number not available');
        return;
      }

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

        // Send notification to the backend server
        await sendNotificationToCustomerAboutLocation(customerPhoneNumber);

        // Handle success (e.g., show a success message to the user)
        console.log(
          'Notification sent to the backend server about reaching the location!',
        );
      } else {
        console.error('Customer FCM token not found in Firestore');
      }
    } catch (error) {
      console.error('Error sending notification to backend:', error);
    } finally {
      setIsLoadingLocationReached(false);
    }
  };

  const sendNotificationToBackendAboutTask = async () => {
    setIsLoadingCompletedService(true);
    try {
      if (!customerPhoneNumber) {
        console.error('Customer phone number not available');
        return;
      }

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

        // Send notification to the backend server
        await statusUpdationAboutWork(customerPhoneNumber);

        // Handle success (e.g., show a success message to the user)
        console.log(
          'Notification sent to the backend server about reaching the location!',
        );
      } else {
        console.error('Customer FCM token not found in Firestore');
      }
    } catch (error) {
      console.error('Error sending notification to backend:', error);
    } finally {
      setIsLoadingCompletedService(false);
    }
  };

  const sendNotificationToBackendAboutFeedback = async () => {
    setIsLoadingFeedback(true);
    try {
      if (!customerPhoneNumber) {
        console.error('Customer phone number not available');
        return;
      }

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

        // Send notification to the backend server
        await statusUpdationAboutFeedback(customerPhoneNumber);

        console.log('Notification sent to the backend server about Feedback!');
      } else {
        console.error('Customer FCM token not found in Firestore');
      }
    } catch (error) {
      console.log(
        error,
        'Error while sending notification to customer about Feedback',
      );
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <ScreenHeader title="Booking Status" />
      </View>

      <View style={styles.mainContainer}>
        <Text style={styles.headingText}>
          Please Give Your update to Customer
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonLR}
            onPress={sendNotificationToBackend}>
            {isLoadingLocationReached ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.textStatus}>Location Reached</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonCS}
            onPress={sendNotificationToBackendAboutTask}>
            {isLoadingCompletedService ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.textStatus}>Completed Service</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonFB}
            onPress={sendNotificationToBackendAboutFeedback}>
            {isLoadingFeedback ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.textStatus}>Get FeedBack from Customer</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.buttonGoToHomeScreen}
          onPress={() => navigation.navigate('BottomTabNavigator')}>
          <Text style={styles.textStatus}>Go To Home Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderStatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  mainContainer: {
    padding: 30,
  },
  headingText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 80,
    alignItems: 'center',
  },
  buttonLR: {
    padding: 15,
    marginTo: 100,
    margin: 20,
    backgroundColor: '#F2CA05',
    elevation: 5,
    borderRadius: 10,
    width: 300,
  },
  buttonCS: {
    padding: 15,
    marginTo: 100,
    margin: 20,
    backgroundColor: '#74E291',
    elevation: 5,
    borderRadius: 10,
    width: 300,
  },
  textStatus: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonGoToHomeScreen: {
    padding: 15,
    marginTo: 100,
    margin: 20,
    backgroundColor: '#FF8911',
    elevation: 5,
    borderRadius: 10,
    width: 300,
  },
  buttonFB: {
    padding: 15,
    marginTo: 100,
    margin: 20,
    backgroundColor: '#F2CA05',
    elevation: 5,
    borderRadius: 10,
    width: 300,
  },
});
