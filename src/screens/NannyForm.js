import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {wpx, hpx} from '../Component/responsive';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const NannyForm = () => {
  const navigation = useNavigation();

  const [sweeping, setSweeping] = useState(false);
  const [mopping, setMopping] = useState(false);
  const [utensilsCleaning, setUtensilsCleaning] = useState(false);

  const [maleSelected, setMaleSelected] = useState(false);
  const [femaleSelected, setFemaleSelected] = useState(false);

  const [name, setname] = useState('Select name');
  const [input, setInput] = useState('');
  const [houseCategory, setHouseCategory] = useState('');
  const [time, setTime] = useState('');
  const [requirements, setRequirements] = useState('');

  const [ageData, setageData] = useState('');
  const [cookingOption, setcookingOption] = useState('');
  const [SpecialityType, setSpecialityType] = useState('');
  const [Services, setServices] = useState(false);
  const [maletype, setMaletype] = useState(false);
  const [children, setchildren] = useState('');
  const [extraPreference, setextraPreference] = useState('');

  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);
  const [showFromTime, setShowFromTime] = useState(false);
  const [showToTime, setShowToTime] = useState(false);
  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [selectedToDate, setSelectedToDate] = useState(new Date());
  const [selectedFromTime, setSelectedFromTime] = useState(new Date());
  const [selectedToTime, setSelectedToTime] = useState(new Date());

  {
    const ageDataList = [
      {key: '1', value: '11'},
      {key: '2', value: '12'},
      {key: '3', value: '13'},
      {key: '4', value: '14'},
      {key: '5', value: '15'},
    ];

    const Requirements = [
      {key: '1', value: '24hrs'},
      {key: '2', value: '3months'},
      {key: '3', value: '1month'},
      {key: '4', value: '1 year'},
    ];

    const showDateTimePicker = type => {
      setShowFromDate(type === 'fromDate');
      setShowToDate(type === 'toDate');
      setShowFromTime(type === 'fromTime');
      setShowToTime(type === 'toTime');
    };

    const onDateTimeChange = (event, selectedDate) => {
      if (showFromDate) {
        setSelectedFromDate(selectedDate || selectedFromDate);
        setShowFromDate(false);
      } else if (showToDate) {
        setSelectedToDate(selectedDate || selectedToDate);
        setShowToDate(false);
      } else if (showFromTime) {
        setSelectedFromTime(selectedDate || selectedFromTime);
        setShowFromTime(false);
      } else if (showToTime) {
        setSelectedToTime(selectedDate || selectedToTime);
        setShowToTime(false);
      }
    };

    const renderItem = item => {
      return (
        <View style={[styles.DropElementParentContainer]}>
          <Text style={[styles.DropElementParentTxt]}>{item?.value}</Text>
        </View>
      );
    };
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.bookView}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={require('../Assets/Arrow.png')}
                style={styles.goBack}
              />
            </TouchableOpacity>
            <Text style={styles.bookText}>Book a Nanny</Text>
          </View>

          <View style={styles.services}>
            <Text style={styles.servicesText}>Number of Children</Text>
            <TextInput
              placeholder="Enter no of Children"
              style={{
                backgroundColor: 'white',
                paddingLeft: 10,
                borderRadius: 8,
                marginTop: 10,
              }}
              onChangeText={txt => setchildren(txt)}
            />
          </View>

          <View style={styles.services}>
            <Text style={styles.servicesText}>Age of Children</Text>
          </View>

          <View style={[styles.TxtInptContainer]}>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={ageDataList}
              maxHeight={300}
              labelField="value"
              valueField="key"
              placeholder={ageData ? ageData : 'Select---'}
              searchPlaceholder="Search Here..."
              value={ageData}
              //   search
              onChange={item => {
                console.log('90===', item.value);
                setageData(item.value);
              }}
              renderItem={renderItem}
            />
          </View>

          <View style={styles.services}>
            <Text style={styles.servicesText}>Preferred Gender:</Text>

            <View
              style={[
                styles.serviceItemView,
                {justifyContent: 'space-evenly', marginHorizontal: wpx(30)},
              ]}>
              <TouchableOpacity
                onPress={() => {
                  setMaleSelected(false);
                  setFemaleSelected(true);
                }}
                style={[styles.serviceItemView, {marginTop: hpx(10)}]}>
                <Image
                  source={
                    femaleSelected
                      ? require('../Assets/MaidFormimage/195060-200.png')
                      : require('../Assets/MaidFormimage/radio-button-unchecked-icon-512x512-k1fkebfk.png')
                  }
                  style={styles.radioBtn}
                />
                <Text style={styles.genderText}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setMaleSelected(true);
                  setFemaleSelected(false);
                }}
                style={[styles.serviceItemView, {marginTop: hpx(10)}]}>
                <Image
                  source={
                    maleSelected
                      ? require('../Assets/MaidFormimage/195060-200.png')
                      : require('../Assets/MaidFormimage/radio-button-unchecked-icon-512x512-k1fkebfk.png')
                  }
                  style={styles.radioBtn}
                />
                <Text style={styles.genderText}>Male</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.services}>
          <Text style={styles.servicesText}>Select Date</Text>

          <View style={styles.fromToTextView}>
            <View>
              <Text style={styles.fromToText}>From</Text>
              <TouchableOpacity
                style={[styles.selDateView, {paddingHorizontal: wpx(22)}]}
                onPress={() => showDateTimePicker('fromDate')}>
                <Text style={[styles.timeDateTextStyle]}>
                  {selectedFromDate
                    ? moment(selectedFromDate, 'YYYY-MM-DD HH:mm:ss.S').format(
                        'DD/MM/YYYY',
                      )
                    : 'Select Date'}
                  {console.log(
                    '269===>',
                    moment(selectedFromDate, 'YYYY-MM-DD HH:mm:ss.S').format(
                      'DD/MM/YYYY',
                    ),
                  )}
                  {/* {selectedFromDate.toDateString()} */}
                </Text>
                <Image
                  source={require('../Assets/MaidFormimage/Vector.png')}
                  style={styles.calCloImg}
                />
                {showFromDate && (
                  <DateTimePicker
                    value={selectedFromDate}
                    mode="date"
                    display="calendar"
                    onChange={onDateTimeChange}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.fromToText}>To</Text>
              <TouchableOpacity
                style={[styles.selDateView, {paddingHorizontal: wpx(22)}]}
                onPress={() => showDateTimePicker('toDate')}>
                <Text style={[styles.timeDateTextStyle]}>
                  {selectedToDate
                    ? moment(selectedToDate, 'YYYY-MM-DD HH:mm:ss.S').format(
                        'DD/MM/YYYY',
                      )
                    : 'Select Date'}
                  {/* {selectedToDate.toDateString()} */}
                </Text>
                <Image
                  source={require('../Assets/MaidFormimage/Vector.png')}
                  style={styles.calCloImg}
                />
                {showToDate && (
                  <DateTimePicker
                    value={selectedToDate}
                    mode="date"
                    display="calendar"
                    onChange={onDateTimeChange}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.services}>
          <Text style={styles.fromToText}>Time Slot Preference</Text>
          <View style={styles.fromToTextView}>
            <View>
              <Text style={styles.fromToText}>From</Text>
              <TouchableOpacity
                onPress={() => showDateTimePicker('fromTime')}
                style={[styles.selDateView, {paddingHorizontal: wpx(30)}]}>
                <Text style={[styles.timeDateTextStyle]}>
                  {selectedFromTime
                    ? selectedFromTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Select Date'}
                </Text>
                <Image
                  source={require('../Assets/MaidFormimage/clock.png')}
                  style={styles.calCloImg}
                />
              </TouchableOpacity>
              {showFromTime && (
                <DateTimePicker
                  value={selectedFromTime}
                  mode="time"
                  display="clock"
                  onChange={onDateTimeChange}
                />
              )}
            </View>

            <View>
              <Text style={styles.fromToText}>To</Text>
              <TouchableOpacity
                onPress={() => showDateTimePicker('toTime')}
                style={[styles.selDateView, {paddingHorizontal: wpx(30)}]}>
                <Text style={[styles.timeDateTextStyle]}>
                  {selectedToTime
                    ? selectedToTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Select Date'}
                </Text>
                <Image
                  source={require('../Assets/MaidFormimage/clock.png')}
                  style={styles.calCloImg}
                />
              </TouchableOpacity>
              {showToTime && (
                <DateTimePicker
                  value={selectedToTime}
                  mode="time"
                  display="clock"
                  onChange={onDateTimeChange}
                />
              )}
            </View>
          </View>
        </View>

          <View
            style={{
              // marginHorizontal:20,
              marginTop: hpx(20),
            }}>
            <Text style={[styles.servicesText, {marginLeft: wpx(20)}]}>
              Requirement
            </Text>

            <View style={[styles.TxtInptContainer]}>
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={Requirements}
                maxHeight={300}
                labelField="value"
                valueField="key"
                placeholder={requirements ? requirements : 'Select---'}
                searchPlaceholder="Search Here..."
                //   value={house}
                search
                onChange={item => {
                  console.log('90===', item.value);
                  setRequirements(item.value);
                }}
                renderItem={renderItem}
                // {...props}
              />
            </View>
          </View>

          <View style={styles.services}>
            <Text style={styles.servicesText}>Any Specific Preference</Text>
            <TextInput
              style={styles.spePrefTextInput}
              placeholder="Enter Specific Preference"
              onChangeText={txt => setextraPreference(txt)}
            />
          </View>

          <TouchableOpacity
            style={styles.viewHelperBtn}
            onPress={() => {
              navigation.navigate('ViewHelper');
            }}>
            <Text style={styles.viewHelperText}>View Helpers</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
};
export default NannyForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  bookView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hpx(20),
    marginHorizontal: wpx(20),
  },
  goBack: {
    width: wpx(32),
    height: hpx(32),
    //resizeMode: 'contain',
  },
  bookText: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 48,
    color: '#0D007F',
    marginLeft: wpx(40),
  },
  services: {
    marginHorizontal: wpx(20),
    marginTop: hpx(20),
  },
  servicesText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    lineHeight: 27,
  },
  serviceItemView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioBtn: {
    height: hpx(16),
    width: wpx(16),
    marginEnd: wpx(15),
    resizeMode: 'contain',
  },
  genderText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#170F49',
    lineHeight: 20,
  },
  fromToTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal:30,
    marginTop: hpx(20),
  },
  fromToText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: '#000000',
  },
  selDateView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    paddingHorizontal: wpx(10),
    marginTop: hpx(10),
  },
  calCloImg: {
    width: wpx(16),
    height: hpx(16),
    marginLeft: wpx(20),
    resizeMode: 'contain',
  },
  viewHelperBtn: {
    marginHorizontal: wpx(20),
    height: hpx(50),
    backgroundColor: '#F89C29',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hpx(100),
    borderRadius: 8,
  },
  viewHelperText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    color: '#ffffff',
  },
  spePrefTextInput: {
    backgroundColor: '#ffffff',
    paddingLeft: wpx(20),
    marginVertical: hpx(20),
    height: hpx(80),
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#f89c29',
    top: 5,
    right: 40,
    borderRadius: 10,
    margin: 30,
    padding: 10,
    width: 100,
  },
  dropdown: {
    height: hpx(50),
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'gray',
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: hpx(8),
  },
  TxtInptContainer: {
    height: hpx(50),
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginLeft: wpx(20),
  },
  placeholderStyle: {
    color: 'gray',
    // fontFamily: "SofiaPro",
    fontSize: 16,
  },
  selectedTextStyle: {
    color: 'gray',
    fontFamily: 'SofiaPro',
    // padding: SIZE_MARGIN.MARGIN_TEN,
    fontSize: 16,
  },
  inputSearchStyle: {
    height: hpx(40),
    fontSize: 16,
  },
  iconStyle: {
    width: wpx(20),
    height: hpx(20),
  },
  DropElementParentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // justifyContent: ,
    borderBottomWidth: 0.2,
  },
  DropElementParentTxt: {
    fontSize: 16,
    flex: 1,
  },
});
