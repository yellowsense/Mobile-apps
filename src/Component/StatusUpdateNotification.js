import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {Modal} from 'react-native-paper';

const StatusUpdateNotification = message => {
  return (
    <Modal visible={true} animationType="slide" transparent>
      <TouchableWithoutFeedback style={styles.modalContainer}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.headerIcon}>
              <LottieView
                source={require('../Assets/confirmBooking-loader.json')}
                autoPlay
                loop
                style={styles.loaderImage}
              />
            </View>

            {message && (
              <>
                <View style={{width: 300}}>
                  <Text style={styles.actionText5}>
                    {message?.notification?.title}
                  </Text>
                  <Text style={{fontSize: 16}}>
                    {message?.notification?.body}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default StatusUpdateNotification;

const styles = StyleSheet.create({});
