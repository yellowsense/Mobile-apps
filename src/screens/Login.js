import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {wpx, hpx} from '../Component/responsive';
import UserIdentity from '../Component/CustomHeader/UserIdentity';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeServiceProviderFCMToken = async (mobileNumber, fcmToken) => {
  try {
    const serviceProviderTokensRef = firestore().collection('service_tokens');
    await serviceProviderTokensRef.doc(mobileNumber).set({
      fcmToken: fcmToken,
    });
    console.log(
      'FCM token stored in Firestore for mobile number:',
      mobileNumber,
    );
  } catch (error) {
    console.error('Error storing FCM token in Firestore:', error);
  }
};

const Login = ({route}) => {
  const navigation = useNavigation();

  const LoginSchema = Yup.object().shape({
    number: Yup.string()
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .required('Please enter your mobile number.'),
    password: Yup.string().min(8).required('Please enter your password.'),
  });

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async values => {
    const userNumber = await AsyncStorage.getItem('user');

    if (userNumber) {
      // User is already logged in, navigate to 'Home Screen'
      navigation.navigate('BottomTabNavigator', {
        user_mobile_number: userNumber,
      });
    }
  };

  const checkUserData = async userPhoneNumber => {
    const apiUrl = `https://backendapiyellowsense.azurewebsites.net/get_service_provider?mobile_number=${userPhoneNumber}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return (
        data.serviceproviders !== null &&
        data.serviceproviders.Age !== null &&
        data.serviceproviders.Gender !== null &&
        data.serviceproviders.Services !== null
      );
    } catch (error) {
      console.error('Error checking user data:', error);
      return false;
    }
  };

  const handleLogin = async values => {
    try {
      const response = await axios.post(
        'https://yellowsensebackendapi.azurewebsites.net/login',
        {
          MobileNumber: values.number,
          Passwrd: values.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.data;

      if (response.status === 200 || response.status === 201) {
        if (data.message === 'Login successful') {
          // Show toast message for successful login
          Toast.show({
            type: 'success',
            text1: 'Login Successfully',
            text2: `Hi ${values.number}, You have Login successfully!`,
            visibilityTime: 2000,
            autoHide: true,
            onShow: () => {
              console.log('Success Toast Show');
            },
            onHide: () => {
              console.log('Success Toast Hide');
            },
          });

          // Get FCM token
          const fcmToken = await messaging().getToken();

          // Store the FCM token along with the mobile number
          await storeServiceProviderFCMToken(values.number, fcmToken);

          // Save the user's mobile number to AsyncStorage
          await AsyncStorage.setItem('user', values?.number);

          const userDataExists = await checkUserData(values.number);
          console.log('userData', userDataExists);
          if (userDataExists) {
            // Data exists for the user, navigate to 'Home Screen'
            navigation.navigate('BottomTabNavigator', {
              user_mobile_number: values.number,
            });
          } else {
            // Data doesn't exist for the user, navigate to 'PersonalDetailsScreen'
            navigation.navigate('PersonalDetails', {
              mobileNumber: values.number,
            });
          }
        } else {
          // Display an alert for other successful messages
          Alert.alert('Error', 'Unexpected login response. Please try again.');
        }
      } else {
        // Display an alert for invalid credentials
        Alert.alert(
          'Error',
          'Invalid credentials. Please check your mobile number and password.',
        );
      }
    } catch (error) {
      // console.error('API Error:', error);
      // Show error toast message
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Invalid credentials!',
        text2: 'Please check your mobile number and password.',
        visibilityTime: 3000,
        autoHide: true,
        onShow: () => {
          console.log('Error Toast Show');
        },
        onHide: () => {
          console.log('Error Toast Hide');
        },
      });
    }
  };

  return (
    <Formik
      initialValues={{
        password: '',
        number: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}>
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <View style={styles.container}>
          <UserIdentity navigation={navigation} title="Login To Your Account" />

          <View style={styles.mobileNumberTIView}>
            <TextInput
              placeholder="Mobile Number"
              value={values.number}
              onChangeText={handleChange('number')}
              style={styles.mobileNumberTIText}
              keyboardType="phone-pad"
              onBlur={() => setFieldTouched('number')}
              placeholderTextColor="gray"
            />
            {touched.number && errors.number && (
              <Text style={styles.errorTxt}>{errors.number}</Text>
            )}
          </View>

          <View style={styles.mobileNumberTIView}>
            <TextInput
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              style={styles.mobileNumberTIText}
              secureTextEntry
              onBlur={() => setFieldTouched('password')}
              placeholderTextColor="gray"
            />
            {touched.password && errors.password && (
              <Text style={styles.errorTxt}>{errors.password}</Text>
            )}
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            style={[
              styles.otpBtnView,
              {backgroundColor: isValid ? '#F89C29' : '#FBDC9F'},
            ]}
            disabled={!isValid}>
            <Text style={styles.otpBtnText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.dontSignUpView}>
            <View style={styles.dontView}>
              <Text style={styles.dontSignUpText}>Don't have an account?</Text>

              <TouchableOpacity
                style={styles.signUpView}
                onPress={() => navigation.navigate('SignUp')}>
                <Text style={[styles.dontSignUpText, {color: '#005FFF'}]}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add the Toast component at the end of your component */}
          <Toast ref={ref => Toast.setRef(ref)} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  loginView: {
    flexDirection: 'row',
    marginTop: hpx(50),
    marginLeft: wpx(20),
  },
  backImage: {
    width: wpx(32),
    height: hpx(32),
    // resizeMode:'contain'
  },
  mainIconView: {
    marginLeft: wpx(80),
  },
  mainIconImage: {
    width: wpx(133),
    height: hpx(133),
  },
  loginTextView: {
    marginLeft: wpx(20),
    marginTop: hpx(30),
  },
  loginText: {
    fontSize: 36,
    lineHeight: 54,
    fontWeight: '700',
    color: '#0D007F',
  },
  mobileNumberTIView: {
    marginHorizontal: wpx(30),
    marginTop: hpx(30),
  },
  mobileNumberTIText: {
    backgroundColor: '#ffffff',
    paddingLeft: wpx(20),
    borderRadius: 30,
    lineHeight: 25,
    color:'black'
    // borderWidth:0.5
  },
  errorTxt: {
    color: 'red',
    fontSize: 12,
  },
  otpBtnView: {
    marginHorizontal: wpx(30),
    // backgroundColor: '#F89C29',
    alignItems: 'center',
    marginTop: hpx(30),
    padding: 12,
    borderRadius: 10,
  },
  otpBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 25,
  },
  dontSignUpView: {
    alignItems: 'center',
    marginTop: hpx(30),
  },
  dontSignUpText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  dontView: {
    flexDirection: 'row',
  },
  signUpView: {
    marginLeft: wpx(10),
  },
  // alertOverlay: {
  //   ...StyleSheet.absoluteFillObject,
  //   backgroundColor: 'red',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  alertContainer: {
    backgroundColor: '#4F9A31',
    padding: 20,
    borderRadius: 10,
    color: 'white',
  },
  alertContainerText: {
    color: '#fff',
  },
});
export default Login;
