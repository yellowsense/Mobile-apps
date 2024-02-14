import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LoginOTPScreen = () => {
  const navigation = useNavigation();
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  const signInWithPhoneNumber = async phoneNumber => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  if (!confirm) {
    return (
      <TouchableOpacity
        style={styles.signWithPhone}
        onPress={() => signInWithPhoneNumber('+919606163548')}>
        <Text>Sign with OTP</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={code}
        onChangeText={text => setCode(text)}
        style={styles.textInputfield}
      />
      <Button
        title="Confirm Code"
        onPress={() => {
          confirmCode();
          navigation.navigate('BookingDetail');
        }}
      />
    </View>
  );
};

export default LoginOTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signWithPhone: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    width: 150,
    alignSelf: 'center',
    marginTop: 180,
  },
  textInputfield: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 200,
  },
});
