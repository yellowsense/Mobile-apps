import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import {wpx, hpx} from '../Component/responsive';
import UserIdentity from '../Component/CustomHeader/UserIdentity';
import auth from '@react-native-firebase/auth';
import {TextInput} from 'react-native';

const OtpScreen = ({route}) => {
  const navigation = useNavigation();
  const [confirm, setConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  useEffect(() => {
    let timer;
    if (otpSent && timerSeconds > 0) {
      timer = setInterval(() => {
        setTimerSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      // Timer has reached 0, reset the state
      setTimerSeconds(60);
      setOtpSent(false);
    }

    return () => {
      clearInterval(timer);
    };
  }, [otpSent, timerSeconds]);

  const signInWithPhoneNumber = async () => {
    try {
      setIsLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(`+91${number}`);
      setConfirm(confirmation);
      setOtpSent(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending OTP:', error);
      setIsLoading(false);
    }
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
      // Navigate to the next screen upon successful confirmation
      navigation.navigate('BookingDetail');
    } catch (error) {
      console.error('Invalid code.');
    }
  };

  // if (!confirm) {
  //   return (
  //     <View style={styles.mainContainer}>
  //       <UserIdentity navigation={navigation} title="Login To Your Account" />
  //       <View style={styles.mobileNumberTIView}>
  //         <TextInput
  //           placeholder="Mobile Number"
  //           value={number}
  //           onChangeText={number}
  //           style={styles.mobileNumberTIText}
  //           keyboardType="phone-pad"
  //           // onBlur={() => setFieldTouched('number')}
  //         />
  //       </View>

  //       <TouchableOpacity
  //         style={[styles.otpBtnView, {backgroundColor: '#F89C29'}]}
  //         onPress={() => signInWithPhoneNumber('+919606163548')}>
  //         <Text style={styles.otpBtnText}>Get OTP</Text>
  //       </TouchableOpacity>
  //       <View style={styles.dontSignUpView}>
  //         <View style={styles.dontView}>
  //           <Text style={styles.dontSignUpText}>Don't have an account?</Text>
  //           <TouchableOpacity
  //             style={styles.signUpView}
  //             onPress={() => navigation.navigate('Signin')}>
  //             <Text style={[styles.dontSignUpText, {color: '#005FFF'}]}>
  //               Sign up
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      {!otpSent ? (
        <View style={styles.mainContainer}>
          <UserIdentity navigation={navigation} title="Login To Your Account" />
          <View style={styles.mobileNumberTIView}>
            <TextInput
              placeholder="Mobile Number"
              value={number}
              onChangeText={text => setNumber(text)}
              style={styles.mobileNumberTIText}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity
            style={[styles.otpBtnView, {backgroundColor: '#F89C29'}]}
            onPress={() => signInWithPhoneNumber(`+91${number}`)}
            disabled={isLoading}>
            <Text style={styles.otpBtnText}>
              {isLoading ? 'Sending OTP...' : 'Get OTP'}
            </Text>
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
        </View>
      ) : (
        <View style={styles.container}>
          <UserIdentity navigation={navigation} title="Verify Mobile" />

          <View style={styles.otpSentNumberView}>
            <Text style={styles.otpSentNumberText}>OTP sent to {number}</Text>
          </View>

          <View style={styles.otpTextInputView}>
            <OTPTextInput
              secureTextEntry
              inputCount={6}
              tintColor="#33C1F6"
              offTintColor="#70707033"
              handleTextChange={e => setCode(e)}
              textInputStyle={styles.otptextInputStyle}
              containerStyle={styles.otpContainerStyle}
            />
          </View>

          <View style={styles.timeResendView}>
            <View>
              <Text style={styles.timeText}>timer Seconds</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.verifyBtnView} onPress={confirmCode}>
            <Text style={styles.verifyBtnText}>Verify & Proceed</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  container: {
    flex: 1,
    // backgroundColor: '#FFF2CD',
  },
  backImageView: {
    flexDirection: 'row',
    marginTop: hpx(50),
    marginLeft: wpx(20),
  },
  backImage: {
    width: wpx(32),
    height: hpx(32),
    // resizeMode:'contain'
  },
  verifyMobileView: {
    alignItems: 'center',
    // marginTop:30
  },
  verifyMobileText: {
    fontSize: 36,
    lineHeight: 54,
    fontWeight: '700',
    color: '#0D007F',
  },
  otpSentNumberView: {
    marginTop: hpx(20),
    alignItems: 'center',
  },
  otpSentNumberText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 21,
  },
  otpTextInputView: {paddingHorizontal: wpx(20)},
  otptextInputStyle: {
    borderWidth: 2,
    borderRadius: 10,
    width: wpx(50),
    backgroundColor: 'white',
  },
  otpContainerStyle: {
    marginTop: hpx(36),
  },
  timeResendView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wpx(30),
    marginTop: hpx(30),
  },
  timeText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
  },
  resendText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: '#005FFF',
  },
  verifyBtnView: {
    marginHorizontal: wpx(30),
    backgroundColor: '#F89C29',
    alignItems: 'center',
    marginTop: hpx(30),
    padding: 12,
    borderRadius: 30,
  },
  verifyBtnText: {
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
  mobileNumberTIView: {
    marginHorizontal: wpx(30),
    marginTop: hpx(30),
  },
  mobileNumberTIText: {
    backgroundColor: '#ffffff',
    paddingLeft: wpx(20),
    borderRadius: 30,
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
});
export default OtpScreen;
