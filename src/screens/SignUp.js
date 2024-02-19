//SignUp

import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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

const Signin = () => {
  const navigation = useNavigation();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your full name.'),
    email: Yup.string().email('Invalid email'),
    password: Yup.string().min(8).required('Please enter your password.'),
    number: Yup.string()
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .required('Please enter your mobile number.'),
  });

  const handleRegister = async values => {
    try {
      const response = await axios.post(
        'https://yellowsensebackendapi.azurewebsites.net/signin',
        {
          Username: values.name,
          Email: values.email,
          MobileNumber: values.number,
          Passwrd: values.password.toString(),
          Role: 'Servicer',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await response.data;

      if (response.status === 200 || response.status === 201) {
        if (data.message === 'User registration successful') {
          // Show Success toast message
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Registration Successful',
            text2: `Hi ${values.name}, You have registered successfully!`,
            visibilityTime: 2000,
            autoHide: true,
          });
          setTimeout(() => {
            navigation.navigate('Login', {
              userNumber: values.name,
            });
          }, 500);
        } else if (response.status === 500) {
          if (data.message === 'Invalid credentials') {
            Alert.alert(
              'Error',
              'Invalid credentials, please check your mobile number and password',
            );
          }
        } else {
          Alert.alert(
            'Error',
            'Unexpected registration response. Please try again.',
          );
        }
      } else {
        Alert.alert(
          'Error',
          data.message || 'Registration failed. Please try again.',
        );
      }
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Error', 'Registration failed. Please try again later.');
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        number: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={handleRegister}>
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
          <UserIdentity navigation={navigation} title="Sign Up" />

          <View style={styles.nameNumberView}>
            <Text style={styles.nameNumberText}>
              Please enter your name and number
            </Text>
          </View>

          <View style={[styles.textInputView, {marginTop: hpx(50)}]}>
            <TextInput
              placeholder="Your name"
              value={values.name}
              onChangeText={handleChange('name')}
              style={styles.textInputText}
              onBlur={() => setFieldTouched('name')}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorTxt}>{errors.name}</Text>
            )}
          </View>

          <View style={styles.textInputView}>
            <TextInput
              placeholder="Your Email Address"
              value={values.email}
              onChangeText={handleChange('email')}
              style={styles.textInputText}
              keyboardType="email-address"
              onBlur={() => setFieldTouched('email')}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorTxt}>{errors.email}</Text>
            )}
          </View>

          <View style={styles.textInputView}>
            <TextInput
              placeholder="Mobile number"
              value={values.number}
              onChangeText={handleChange('number')}
              style={styles.textInputText}
              keyboardType="phone-pad"
              onBlur={() => setFieldTouched('number')}
            />
            {touched.number && errors.number && (
              <Text style={styles.errorTxt}>{errors.number}</Text>
            )}
          </View>

          <View style={styles.textInputView}>
            <TextInput
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              style={styles.textInputText}
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
              styles.getRegsiterBtnView,
              {backgroundColor: isValid ? '#F89C29' : '#FBDC9F'},
            ]}
            disabled={!isValid}>
            <Text style={styles.getRegsiterBtnText}>Register</Text>
          </TouchableOpacity>

          <View style={styles.dontSignUpView}>
            <View style={styles.dontView}>
              <Text style={styles.dontSignUpText}>
                Already have an account?
              </Text>

              <TouchableOpacity
                style={styles.signUpView}
                onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.dontSignUpText, {color: '#005FFF'}]}>
                  Login
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
  signUpView: {
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
    width: wpx(150),
    height: 133,
  },
  signUpTextView: {
    alignItems: 'center',
    marginTop: hpx(30),
  },
  signUpText: {
    fontSize: 36,
    lineHeight: 54,
    fontWeight: '700',
    color: '#0D007F',
  },
  nameNumberView: {
    marginTop: hpx(20),
    alignItems: 'center',
  },
  nameNumberText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 21,
  },
  textInputView: {
    marginHorizontal: wpx(30),
    marginTop: hpx(20),
  },
  textInputText: {
    backgroundColor: '#ffffff',
    paddingLeft: wpx(20),
    borderRadius: 8,
    height: hpx(60),
    // borderWidth:0.5
  },
  errorTxt: {
    color: 'red',
    fontSize: 12,
  },
  getRegsiterBtnView: {
    marginHorizontal: wpx(30),
    alignItems: 'center',
    marginTop: hpx(50),
    padding: 12,
    borderRadius: 8,
  },
  getRegsiterBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 27,
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
  alertOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
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

export default Signin;
