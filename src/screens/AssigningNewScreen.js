import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const AssigningNewScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.assignContainer}>
      <Text style={styles.OopsText}>Oops!</Text>
      <Text style={styles.OopsText1}>Our Helper has cancelled</Text>
      <Text style={styles.plainText}>
        Our helper can’t come due to some reasons.
      </Text>
      <Text style={styles.assignText}>
        Should we arrange an alternative for you?
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('BottomTabNavigator')}
          style={styles.assignButton1}>
          <Text style={styles.buttonText}>Not Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ConfirmationLoading')}
          style={styles.assignButton2}>
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AssigningNewScreen;

const styles = StyleSheet.create({
  assignContainer: {
    flex: 1,
    backgroundColor: '#FFF0CC',
    paddingHorizontal: 50,
  },
  OopsText: {
    color: '#0D007F',
    marginTop: 160,
    fontSize: 22,
    fontWeight: '800',
  },
  OopsText1: {
    color: '#0D007F',
    marginTop: 8,
    fontSize: 22,
    fontWeight: '800',
  },
  plainText: {
    fontSize: 16,
    fontWeight: '600',
    width: 400,
    marginTop: 60,
    color: 'black',
  },
  assignText: {
    fontSize: 16,
    fontWeight: '800',
    width: 400,
    marginTop: 10,
    color: 'black',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 45,
  },
  assignButton1: {
    paddingVertical: 10,
    backgroundColor: '#F89C29',
    width: 140,
    borderRadius: 5,
  },
  assignButton2: {
    padding: 10,
    backgroundColor: '#F89C29',
    width: 140,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
