import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Modal} from 'react-native-paper';

const SendFeedForm = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [feedbackText, setFeedbackText] = useState('');
  const handleSubmitFeedback = async () => {
    setIsVisible(false);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <TouchableWithoutFeedback style={styles.modalContainer}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.skipText}>
              <Text style={styles.skipTextText}>Skip</Text>
            </View>
            <View style={styles.headerIcon}>
              <Text style={styles.feedbackText}>Feedback</Text>
            </View>

            <Text style={styles.paragraphText}>
              We are happy to provide you with the service. Please take a minute
              and provide your feedback.
            </Text>

            <View style={styles.colorLine} />

            <Text style={styles.textFeedback}>
              How much would you rate Asha Kumari?
            </Text>

            <View style={styles.vectorStars}>
              <Image
                source={require('../Assets/empty-start.png')}
                style={styles.starRatings}
              />
              <Image
                source={require('../Assets/empty-start.png')}
                style={styles.starRatings}
              />
              <Image
                source={require('../Assets/empty-start.png')}
                style={styles.starRatings}
              />
              <Image
                source={require('../Assets/empty-start.png')}
                style={styles.starRatings}
              />
              <Image
                source={require('../Assets/empty-start.png')}
                style={styles.starRatings}
              />
            </View>

            <View style={styles.colorLine} />

            <Text style={styles.textFeedback}>
              Please tell us about your feedback
            </Text>

            <View style={styles.textInputContainer}>
              <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={150}
                onChangeText={text => setFeedbackText(text)}
                value={feedbackText}
                placeholder="Type Here"
                style={{marginBottom: 20}}
                placeholderTextColor="#0000009E"
              />
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => setIsVisible(false)}
                style={styles.cancelButton}>
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmitFeedback}
                style={styles.submitButton1}>
                <Text style={styles.actionText1}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SendFeedForm;

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
  modalContent: {
    backgroundColor: 'white',
    padding: 40,
    width: 370,
    elevation: 5,
    height: 530,
    borderRadius: 15,
    bottom: 280,
  },
  headerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    marginTop: -30,
  },
  skipText: {
    top: -25,
    left: '95%',
  },
  skipTextText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F89C29',
  },
  paragraphText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    width: 320,
    alignSelf: 'center',
    marginTop: 10,
  },
  colorLine: {
    borderColor: '#F89C29',
    borderWidth: 1,
    marginTop: 25,
    width: 250,
    alignSelf: 'center',
  },
  textFeedback: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    marginTop: 15,
    fontWeight: '500',
  },
  vectorStars: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  starRatings: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  textInputContainer: {
    padding: 8,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 30,
    width: '110%',
    alignSelf: 'center',
    height: 120,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    gap: 10,
  },
  submitButton1: {
    padding: 8,
    backgroundColor: '#F89C29',
    borderRadius: 10,
    width: 170,
  },
  cancelButton: {
    padding: 8,
    borderColor: '#F89C29',
    borderRadius: 10,
    width: 170,
    borderWidth: 2,
  },
  actionText: {
    color: '#F89C29',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  actionText1: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
