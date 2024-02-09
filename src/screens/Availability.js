import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {wpx, hpx} from '../Component/responsive';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const Availability = ({route}) => {
  const navigation = useNavigation();

  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [showFromDate, setShowFromDate] = useState(false);

  const [showFromTime, setShowFromTime] = useState(false);
  const [showToTime, setShowToTime] = useState(false);
  const [selectedFromTime, setSelectedFromTime] = useState(new Date());
  const [selectedToTime, setSelectedToTime] = useState(new Date());

  const [date, setdate] = useState('');
  const [time, setTime] = useState('');

  const [slots, setSlots] = useState([]);

  const showDateTimePicker = type => {
    setShowFromDate(type === 'fromDate');
    setShowFromTime(type === 'fromTime');
    setShowToTime(type === 'toTime');
  };

  const onDateTimeChange = (event, selectedDate) => {
    if (showFromDate) {
      setShowFromDate(false);
      setdate(
        moment(selectedDate, 'YYYY-MM-DD HH:mm:ss.S').format('YYYY/MM/DD'),
      );
      setSelectedFromDate(selectedDate || selectedFromDate);
    } else if (showFromTime) {
      setShowFromTime(false);
      setTime(moment(selectedDate, 'YYYY-MM-DD HH:mm:ss.S').format('HH:mm'));
      setSelectedFromTime(selectedDate || selectedFromTime);
    } else if (showToTime) {
      setShowToTime(false);
      setTime(moment(selectedDate, 'YYYY-MM-DD HH:mm:ss.S').format('HH:mm'));
      setSelectedToTime(selectedDate || selectedToTime);
    }
  };

  const addSlot = () => {
    // Check if the slot being added already exists
    const alreadyExists = slots.some(
      slot =>
        slot.fromTime === moment(selectedFromTime).format('HH:mm A') &&
        slot.toTime === moment(selectedToTime).format('HH:mm A'),
    );

    if (alreadyExists) {
      Alert.alert(
        'Warning',
        'This time slot is already added.\n Please change the timings in the above.',
      );
      return;
    }

    // If the slot is not a duplicate, add it to the list of slots
    const newSlot = {
      fromTime: moment(selectedFromTime).format('HH:mm A'),
      toTime: moment(selectedToTime).format('HH:mm A'),
    };
    setSlots([...slots, newSlot]);
  };

  const deleteSlot = index => {
    setSlots(prevSlots => {
      const updatedSlots = [...prevSlots];
      updatedSlots.splice(index, 1);
      return updatedSlots;
    });
  };

  const handleNext = () => {
    if (selectedFromTime && selectedToTime) {
      navigation.navigate('SelectApartment', {
        ...route.params,
        slots: slots.map(slot => ({
          fromTime: slot.fromTime,
          toTime: slot.toTime,
        })),
      });
    } else {
      Alert.alert('Required!', 'Please select both From and To times.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ScreenHeader title="Availability" />

        <Text
          style={{
            textAlign: 'center',
            marginVertical: hpx(20),
            color: '#0D007F',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Set Your Work Schedule
        </Text>

        <View style={styles.personalInfo}>
          <Text style={styles.personalInfoText}>Select Time Slot</Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#000'}}>
                From
              </Text>
              <TouchableOpacity
                style={styles.selDateView}
                onPress={() => showDateTimePicker('fromTime')}>
                <Text style={styles.timeDateTextStyle}>
                  {selectedFromTime
                    ? moment(selectedFromTime, 'YYYY-MM-DD HH:mm:ss.S').format(
                        'HH:mm A',
                      )
                    : 'Select time'}
                </Text>
                <Image
                  source={require('../Assets/clock.png')}
                  style={styles.calCloImg}
                />
                {showFromTime && (
                  <DateTimePicker
                    value={selectedFromTime}
                    mode="time"
                    display="clock"
                    onChange={onDateTimeChange}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#000'}}>
                To
              </Text>
              <TouchableOpacity
                style={styles.selDateView}
                onPress={() => showDateTimePicker('toTime')}>
                <Text style={styles.timeDateTextStyle}>
                  {selectedToTime
                    ? moment(selectedToTime, 'YYYY-MM-DD HH:mm:ss.S').format(
                        'HH:mm A',
                      )
                    : 'Select time'}
                </Text>
                <Image
                  source={require('../Assets/clock.png')}
                  style={styles.calCloImg}
                />
                {showToTime && (
                  <DateTimePicker
                    value={selectedToTime}
                    mode="time"
                    display="clock"
                    onChange={onDateTimeChange}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Display existing slots */}
        {slots.map((slot, index) => (
          <View key={index} style={styles.personalInfo}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#000'}}>
                From
              </Text>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#000'}}>
                To
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 16}}>{slot.fromTime}</Text>
              <Text style={{fontSize: 16}}>{slot.toTime}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteSlot(index)}>
              <Text style={{color: 'red', textAlign: 'right'}}>
                Delete Slot
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Centered and Spaced Buttons in a Column */}
        <View style={styles.centeredColumn}>
          <TouchableOpacity
            style={[styles.slotButton, styles.addSlotButton]}
            onPress={addSlot}>
            <View style={styles.buttonContent}>
              <Image
                source={require('../Assets/add.png')}
                style={styles.buttonImage}
              />
              <Text style={styles.slotButtonText}>Add Slot</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleNext} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  personalInfo: {
    marginHorizontal: wpx(30),
    marginTop: hpx(20),
    marginVertical: hpx(0),
  },
  personalInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    lineHeight: 27,
  },
  selDateView: {
    backgroundColor: 'white',
    height: 40,
    marginVertical: hpx(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    padding: 12,
  },
  timeDateTextStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  calCloImg: {
    width: wpx(16),
    height: hpx(16),
    marginLeft: wpx(20),
  },

  slotButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  centeredColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hpx(20),
  },
  slotButton: {
    padding: hpx(20),
    alignItems: 'center',
    justifyContent: 'center',
    height: hpx(40),
    borderRadius: 8,
    paddingVertical: hpx(8),
    paddingHorizontal: wpx(30),
    marginVertical: 10,
  },
  addSlotButton: {
    backgroundColor: 'green',
  },
  deleteSlotButton: {
    backgroundColor: 'red',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonImage: {
    width: wpx(24),
    height: hpx(24),
  },
  submitButton: {
    height: hpx(60),
    marginHorizontal: wpx(30),
    backgroundColor: '#F89C29',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    bottom: hpx(10),
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    color: '#ffffff',
  },
});
export default Availability;
