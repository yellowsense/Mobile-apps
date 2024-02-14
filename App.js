import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import Login from './src/screens/Login';
import OtpScreen from './src/screens/OtpScreen';
import Signin from './src/screens/Signin';
import LanguageScreen from './src/screens/LanguageScreen';
import MaidForm from './src/screens/MaidForm';
import CockForm from './src/screens/CockForm';
import NannyForm from './src/screens/NannyForm';
import EditProfile from './src/screens/EditProfile';
// import HelperDetail from './src/screens/HelperDetail';
// import BookingDetail from './src/screens/BookingDetail';
import BottomTabNavigator from './src/screens/BottomTabNavigator';
import LocationMain from './src/screens/LocationMain';
import SelectLocation from './src/screens/SelectLocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import SearchLocation from './src/screens/SearchLocation';
import FirstScreen from './src/screens/FirstScreen';
import LoginOTPScreen from './src/screens/LoginOTPScreen';

import messaging from '@react-native-firebase/messaging';

import {
  getToken,
  notificationListener,
  requestUserPermission,
} from './src/utils/notification';
import ConfirmationLoadingScreen from './src/screens/ConfirmationLoadingScreen';
import Home from './src/screens/Home';
import AssigningNewScreen from './src/screens/AssigningNewScreen';
import AddAddressScreen from './src/screens/AddAddressScreen';
import AddNewAddressScreen from './src/screens/AddNewAddressScreen';
import GoogleMapLocationScreen from './src/screens/GoogleMapLocationScreen';

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
      // Hide splash screen after a delay (e.g., 2000 milliseconds)
      setTimeout(() => {
        setIsSplashVisible(false);
      }, 3000);
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount
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
        <Stack.Screen name="LoginOTP" component={LoginOTPScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="MaidForm" component={MaidForm} />
        <Stack.Screen name="CockForm" component={CockForm} />
        <Stack.Screen name="NannyForm" component={NannyForm} />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        {/* <Stack.Screen name="HelperDetail" component={HelperDetail} /> */}
        {/* <Stack.Screen name="BookingDetail" component={BookingDetail} /> */}
        <Stack.Screen name="LocationMain" component={LocationMain} />
        <Stack.Screen name="SelectLocation" component={SelectLocation} />
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen
          name="ConfirmationLoading"
          component={ConfirmationLoadingScreen}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AssignNew" component={AssigningNewScreen} />
        <Stack.Screen name="AddAddress" component={AddAddressScreen} />
        <Stack.Screen name="NewAddress" component={AddNewAddressScreen} />
        <Stack.Screen name="GoogleMap" component={GoogleMapLocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
