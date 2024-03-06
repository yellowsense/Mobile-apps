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

const OtpScreen = ({route}) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30); // Initial time in seconds
  const navigation = useNavigation();
  const timerRef = useRef();

  const [otpVerified, setOtpVerified] = useState(false); // State to track OTP verification
  const [timeExpired, setTimeExpired] = useState(false); // New state to track time expiration

  const phoneNumber = route.params?.phoneNumber;

  const handleProceed = () => {
    if (otpVerified) {
      // If the OTP is verified, navigate to the 'BookingDetail' screen
      navigation.navigate('PersonalDetails');
    } else {
      // If the timer has expired, show the alert to log in with the mobile number
      if (timer === 0) {
        Alert.alert(
          'Time Expired',
          'Please log in again with your mobile number.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Login');
              },
            },
          ],
        );
      } else {
        verifyOTP(otp);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(prevTimer => prevTimer - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      if (timer === 0 && !otpVerified && otp === '') {
        Alert.alert(
          'Time Expired',
          'Please log in again with your mobile number.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Login');
              },
            },
          ],
        );
      }
    };
  }, [timer, otpVerified, otp, navigation]);

  const verifyOTP = enteredOTP => {
    // Assuming there's an expectedOTP that needs to be verified
    const expectedOTP = '123456'; // Replace with your actual expected OTP

    if (enteredOTP === expectedOTP) {
      setOtpVerified(true); // Set OTP verification to true
    } else {
      // If the timer is still running, alert the user to verify the OTP
      Alert.alert('Error', 'Invalid OTP. Please enter the correct OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <UserIdentity navigation={navigation} title="Verify Mobile" />

      <View style={styles.otpSentNumberView}>
        <Text style={styles.otpSentNumberText}>OTP sent to {phoneNumber}</Text>
      </View>

      <View style={styles.otpTextInputView}>
        <OTPTextInput
          secureTextEntry
          inputCount={6} // Define the input count for 6-digit OTP
          tintColor="#33C1F6"
          offTintColor="#70707033"
          handleTextChange={e => {
            setOtp(e);
          }}
          textInputStyle={styles.otptextInputStyle}
          containerStyle={styles.otpContainerStyle}
        />
      </View>

      <View style={styles.timeResendView}>
        <View>
          <Text style={styles.timeText}>{timer} Seconds</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.verifyBtnView}
        // onPress={() => {
        //   navigation.navigate('BookingDetail');
        // }}
        onPress={handleProceed}>
        <Text style={styles.verifyBtnText}>Verify & Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
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
    borderRadius: 8,
  },
  verifyBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 27,
  },
});
export default OtpScreen;
