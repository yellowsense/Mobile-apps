import {StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmationLoadingScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [serviceTpe, setServiceType] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [serviceTypeTexts, setServiceTypeTexts] = useState([]);

  useEffect(() => {
    const getServiceType = async () => {
      try {
        const servicetype5 = await AsyncStorage.getItem('serviceType');
        setServiceType(servicetype5);
        console.log(serviceTpe, 'Getting service type from asyncStorage');
      } catch (error) {
        console.log('Error Getting Service Type from AsyncStorage', error);
      }
    };

    getServiceType();
  });

  const serviceTypeLoadingText = {
    Maid: [
      'A clean home is a happy home.',
      'Clean home, happy heart.',
      'The heart of the home is the maid.',
      'A tidy house, a tidy mind.',
      "A maid's work is never done.",
      'Maid service with a smile.',
    ],
    Cook: [
      'Book, Cook, Savor, Repeat.',
      'Cook with a click.',
      'Flavor on your doorstep.',
      'Feast at your fingertips.',
      'Your recipe, delivered hot.',
      'Cooking is love made visible.',
    ],
    Nanny: [
      'Guiding light in childcare.',
      'Nurturing hearts, shaping futures.',
      "A nanny's love shapes a child's future.",
      'A happy child, a happy home.',
      "A nanny's heart, a child's safe haven.",
      "Nanny's love, family's blessing.",
    ],
  };

  useEffect(() => {
    if (serviceTpe && serviceTypeLoadingText[serviceTpe]) {
      setServiceTypeTexts(serviceTypeLoadingText[serviceTpe]);
    }
  }, [serviceTpe]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % serviceTypeTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, serviceTypeTexts]);

  return (
    <>
      <View style={styles.confirmContainer}>
        <View style={styles.firstContainer}>
          <Text style={styles.waitingText}>Awaiting Confirmation</Text>
          <LottieView
            style={styles.loadingImage}
            source={require('../Assets/findingpartner-loader.json')}
            autoPlay
            loop
          />
        </View>
      </View>
      <View style={styles.secondContainer}>
        <Text style={styles.quoteText}>{serviceTypeTexts[currentIndex]}</Text>
        <TouchableOpacity
          style={styles.actionContainer}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.actionButton}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are You Sure Want Cancel This Order?
            </Text>
            <View style={styles.actionButtons}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate('Home')}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button1, styles.buttonClose1]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle1}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ConfirmationLoadingScreen;

const styles = StyleSheet.create({
  confirmContainer: {
    backgroundColor: '#FFCF2F',
    height: 590,
  },
  firstContainer: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  waitingText: {
    fontSize: 25,
    color: '#000000',
    fontWeight: '700',
  },
  loadingImage: {
    width: 400,
    height: 400,
  },
  secondContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
  },
  quoteText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0D007F',
  },
  actionContainer: {
    backgroundColor: '#FFCF2F',
    padding: 10,
    borderRadius: 5,
    width: 350,
    marginTop: 70,
  },
  actionButton: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 120,
  },
  buttonOpen: {
    backgroundColor: '#F2CA05',
  },
  buttonClose: {
    backgroundColor: '#F2CA05',
  },
  button1: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 120,
  },
  buttonOpen1: {
    backgroundColor: 'white',
  },
  buttonClose1: {
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle1: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 18,
    textAlign: 'center',
    color: 'black',
    fontWeight: '500',
  },
  actionButtons: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
  },
});
