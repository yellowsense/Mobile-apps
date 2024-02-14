import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {wpx, hpx} from '../Component/responsive';
import UserIdentity from '../Component/CustomHeader/UserIdentity';

// Function to store FCM token in Firestore
const storeCustomerFCMToken = async (mobileNumber, fcmToken) => {
  try {
    const customerTokensRef = firestore().collection('customer_tokens');
    await customerTokensRef.doc(mobileNumber).set({
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

const Login = props => {
  const navigation = useNavigation();
  const number = props?.route?.params?.item;
  // const {Username} = props.route.params;
  const [isLoading, setIsLoading] = useState(true);

  const LoginSchema = Yup.object().shape({
    number: Yup.string()
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .required('Please enter your mobile number.'),
    password: Yup.string().min(8).required('Please enter your password.'),
  });

  // const handleLogin = async values => {
  //   try {
  //     const response = await axios.post(
  //       'https://yellowsensebackendapi.azurewebsites.net/login',
  //       {
  //         MobileNumber: values.number,
  //         Passwrd: values.password,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );

  //     const data = await response.data;
  //     console.log('Response Data:', data);

  //     if (response.status === 200 || response.status === 201) {
  //       if (data.message === 'Login successful') {
  //         // Show toast message for successful login
  //         Toast.show({
  //           type: 'success',
  //           text1: 'Login Successfully',
  //           text2: `Hi ${values.number}, You have Login successfully!`,
  //           visibilityTime: 2000,
  //           autoHide: true,
  //           onShow: () => {
  //             console.log('Success Toast Show');
  //           },
  //           onHide: () => {
  //             console.log('Success Toast Hide');
  //           },
  //         });
  //         await AsyncStorage.setItem('user', values?.number);
  //         setTimeout(() => {
  //           navigation.navigate('BookingDetail');
  //         }, 500);
  //       } else {
  //         // Display an alert for other successful messages
  //         Alert.alert('Error', 'Unexpected login response. Please try again.');
  //       }
  //     } else {
  //       // Display an alert for invalid credentials
  //       Alert.alert(
  //         'Error',
  //         'Invalid credentials. Please check your mobile number and password.',
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Login Error:', error);

  //     Toast.show({
  //       type: 'error',
  //       position: 'top',
  //       text1: 'Invalid credentials!',
  //       text2: 'Please check your mobile number and password.',
  //       visibilityTime: 3000,
  //       autoHide: true,
  //       onShow: () => {
  //         console.log('Error Toast Show');
  //       },
  //       onHide: () => {
  //         console.log('Error Toast Hide');
  //       },
  //     });
  //   }
  // };

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
      console.log('Response Data:', data);
      console.log('props.route.params:', props.route.params);
      console.log(values.number, 'Laxman Bhajantri');
      // console.log(Username, 'User Name');

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
          await storeCustomerFCMToken(values.number, fcmToken);

          // Save the user's mobile number to AsyncStorage
          await AsyncStorage.setItem('user', values?.number);

          // Navigate to the desired screen or perform other actions
          setTimeout(() => {
            navigation.navigate('BookingDetail');
          }, 500);
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
      console.error('Login Error:', error);

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
                onPress={() => navigation.navigate('Signin')}>
                <Text style={[styles.dontSignUpText, {color: '#005FFF'}]}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
  mobileNumberTIView: {
    marginHorizontal: wpx(30),
    marginTop: hpx(30),
  },
  mobileNumberTIText: {
    backgroundColor: '#ffffff',
    paddingLeft: wpx(20),
    borderRadius: 30,
  },
  errorTxt: {
    color: 'red',
    fontSize: 12,
  },
  otpBtnView: {
    marginHorizontal: wpx(30),
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
});

export default Login;

// useEffect(() => {
//   const checkLoginStatus = async () => {
//     try {
//       const userNumber = await AsyncStorage.getItem('user');
//       if (userNumber) {
//         // User is already logged in, navigate to the desired screen
//         const userData = {usernumber: number, item: userNumber};
//         navigation.navigate('BookingDetail', {data: userData});
//       }
//     } catch (error) {
//       console.error('Error checking login status:', error);
//     } finally {
//       // Set loading to false once the check is complete
//       setIsLoading(false);
//     }
//   };

//   checkLoginStatus();
// }, [navigation, number]);
