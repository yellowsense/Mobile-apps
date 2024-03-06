import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Modal,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Entypo';

const RemainderNotification = ({message}) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <TouchableWithoutFeedback style={styles.modalContainer}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.headerIcon}>
              <Text style={styles.feedbackText}>Reminder</Text>
              <LottieView
                source={require('../Assets/ring2.json')}
                style={styles.ringAnimation}
                autoPlay
                loop
              />
            </View>

            <View style={styles.colorLine} />

            <View style={styles.belowContainer}>
              <View style={styles.leftPart}>
                <Image
                  source={require('../Assets/profile.jpg')}
                  style={styles.profileImage}
                />
                <Text style={styles.name}>Pooja Patil</Text>
              </View>
              <View style={styles.rightPart}>
                <Text style={styles.date}>Date: 13-11-2023</Text>
                <Text style={styles.time}>Time: 4 PM</Text>
                <Text style={styles.service}>Service Type: Maid</Text>
                <View>
                  <View style={styles.locationView}>
                    <Icon name="location-pin" color="black" size={24} />
                    <Text style={styles.jobLocation}>Job Location : </Text>
                  </View>
                  <Text style={styles.addressText}>
                    FOYER Infinity, Pattandur Agrahara Main Rd, Whitefield,
                    Pattandur Agrahara, Benguluru, Karnataka 560066
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RemainderNotification;

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  profileImage: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 40,
    width: 370,
    elevation: 5,
    height: 420,
    borderRadius: 15,
  },
  headerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  feedbackText: {
    fontSize: 25,
    fontWeight: '600',
    color: '#0D007F',
    marginTop: -40,
  },
  ringAnimation: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    marginTop: 10,
  },
  colorLine: {
    borderColor: '#F89C29',
    borderWidth: 1,
    marginTop: 10,
    width: 250,
    alignSelf: 'center',
  },
  belowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 15,
  },
  leftPart: {
    alignItems: 'center',
    gap: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  locationView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    gap: 5,
    alignItems: 'center',
  },
  addressText: {
    width: 200,
    marginTop: 15,
    fontSize: 14,
  },
  date: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginTop: 5,
  },
  time: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginTop: 5,
  },
  service: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginTop: 5,
  },
  jobLocation: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginTop: 5,
  },
});
