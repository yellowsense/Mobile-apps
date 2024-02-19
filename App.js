import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LanguageScreen from './src/screens/LanguageScreen';
import Login from './src/screens/Login';
import OtpScreen from './src/screens/OtpScreen';
import SignUp from './src/screens/SignUp';
import PersonalDetails from './src/screens/PersonalDetails';
import KnownLanguage from './src/screens/KnownLanguage';
import GovermentIdentity from './src/screens/GovermentIdentity';
import UploadPhoto from './src/screens/UploadPhoto';
import SelectApartment from './src/screens/SelectApartment';
import BottomTabNavigator from './src/screens/BottomTabNavigator';
import OngoingRequest from './src/screens/OngoingRequest';
import CompletedRequest from './src/screens/CompletedRequest';
import CancelledRequest from './src/screens/CancelledRequest';
import Availability from './src/screens/Availability';
import Notifcation from './src/screens/Notifcation';
import messaging from '@react-native-firebase/messaging';
import {
  getToken,
  notificationListener,
  requestUserPermission,
} from './src/utils/notification';
import EditProfileScreen from './src/screens/EditProfileScreen';
import OrderStatusScreen from './src/screens/OrderStatusScreen';
import AcceptedRequest from './src/screens/AcceptedRequest';
import UpdateTimings from './src/screens/UpdateTimings';
import UpdateLocation from './src/screens/UpdateLocation';

const Stack = createStackNavigator();

const App = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
      if (appData == null) {
        setIsAppFirstLaunched(true);
        await AsyncStorage.setItem('isAppFirstLaunched', 'false');
      } else {
        setIsAppFirstLaunched(false);
      }
      // Hide splash screen after a delay (e.g., 3000 milliseconds)
      setTimeout(() => {
        setIsSplashVisible(false);
      }, 3000);
    };

    fetchData();
  }, []);

  const [displayMessage, setDisplayMessage] = useState(null);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setDisplayMessage(remoteMessage);
      console.log('Foreground Notification:', remoteMessage);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    requestUserPermission();
    notificationListener();
    getToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isSplashVisible && (
          <Stack.Screen name="Splash" component={SplashScreen} />
        )}
        {isAppFirstLaunched && (
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        )}
        <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
        <Stack.Screen name="KnownLanguage" component={KnownLanguage} />
        <Stack.Screen name="GovermentIdentity" component={GovermentIdentity} />
        <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
        <Stack.Screen name="SelectApartment" component={SelectApartment} />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
        <Stack.Screen name="OngoingRequest" component={OngoingRequest} />
        <Stack.Screen name="CompletedRequest" component={CompletedRequest} />
        <Stack.Screen name="AcceptedRequest" component={AcceptedRequest} />
        <Stack.Screen name="CancelledRequest" component={CancelledRequest} />
        <Stack.Screen name="Availability" component={Availability} />
        <Stack.Screen name="Notifcation" component={Notifcation} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="OderStatus" component={OrderStatusScreen} />
        <Stack.Screen name="UpdateTimings" component={UpdateTimings} />
        <Stack.Screen name="UpdateLocation" component={UpdateLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
// const [isSplashVisible, setIsSplashVisible] = useState(true);
// const [isLanguageScreenShowed, setIsLanguageScreenShowed] = useState(null);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const appData = await AsyncStorage.getItem('isAppFirstLaunched');
//       const languageData = await AsyncStorage.getItem(
//         'isLanguageScreenShowed',
//       );

//       console.log('App Data:', appData);
//       console.log('Language Data:', languageData);

//       if (appData == null && languageData == null) {
//         setIsAppFirstLaunched(true);
//         setIsLanguageScreenShowed(true);
//         await AsyncStorage.setItem('isAppFirstLaunched', 'false');
//         await AsyncStorage.setItem('isLanguageScreenShowed', 'false'); // Initialize as false
//       } else {
//         setIsAppFirstLaunched(false);
//         setIsLanguageScreenShowed(false);
//       }

//       setTimeout(() => {
//         setIsSplashVisible(false);
//       }, 3000);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   fetchData();
// }, []);
