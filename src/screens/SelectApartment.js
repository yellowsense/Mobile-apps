import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {wpx, hpx} from '../Component/responsive';
import axios from 'axios';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';
import moment from 'moment';

const SelectApartment = ({route}) => {
  const navigation = useNavigation();
  const {
    mobileNumber,
    personalDetails,
    knownLanguage,
    govermentIdentity,
    slots,
  } = route.params;
  console.log(
    mobileNumber,
    personalDetails,
    knownLanguage,
    govermentIdentity,
    slots,
  );
  const [societyname, setSocietynames] = useState([]);
  const [selectedSocieties, setSelectedSocieties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    apidata();
  }, []);

  const apidata = () => {
    axios
      .get('https://yellowsensebackendapi.azurewebsites.net/society_names')
      .then(response => {
        console.log('123==>', response?.data);
        setSocietynames(Object.values(response?.data));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const toggleSelect = societyName => {
    const isSelected = selectedSocieties.includes(societyName);

    if (isSelected) {
      setSelectedSocieties(prevSelected =>
        prevSelected.filter(name => name !== societyName),
      );
    } else {
      setSelectedSocieties(prevSelected => [...prevSelected, societyName]);
    }
  };

  const filteredSocieties = societyname.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectApartment = async () => {
    setIsLoading(true);

    try {
      const formattedSlots = slots.map(slot => ({
        fromTime: moment(slot.fromTime, 'hh:mm A').format('hh:mm A'),
        toTime: moment(slot.toTime, 'hh:mm A').format('hh:mm A'),
      }));

      const data = {
        user_mobile_number: mobileNumber,
        ...personalDetails,
        ...knownLanguage,
        ...govermentIdentity,
        locations: selectedSocieties.join(','),
        timings: formattedSlots
          .map(slot => `${slot.fromTime} - ${slot.toTime}`)
          .join(', '),
      };

      console.log('Data:', data);

      // Make the POST request
      const response = await axios.post(
        'https://yellowsensebackendapi.azurewebsites.net/profile_details',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('API Response:', response);

      // Handle the response as needed
      if (response.status === 200 || response.status === 201) {
        if (
          response.data.message ===
          'User profile updated or created successfully'
        ) {
          Alert.alert('Success', 'Profile updated or created successfully');
          navigation.navigate('BottomTabNavigator', {
            user_mobile_number: data.user_mobile_number,
          });
        } else {
          Alert.alert('Error', 'Unexpected response from the server.');
        }
      } else {
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({item}) => {
    const isSelected = selectedSocieties.includes(item.name);

    return (
      <TouchableOpacity
        style={[styles.itemStyle, isSelected && styles.selectedItem]}
        onPress={() => {
          toggleSelect(item.name);
        }}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item?.name}</Text>
          {isSelected && (
            <Image
              source={require('../Assets/tick_circle.png')}
              style={styles.tickIcon}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const handleSearchSubmit = () => {
    if (filteredSocieties.length === 0) {
      Alert.alert(
        'Services Not Available',
        'At this time on these locations, services are not available.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <ScreenHeader title="Select Apartment" />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Apartment..."
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
          onSubmitEditing={handleSearchSubmit}
        />
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={handleSearchSubmit}>
          <Image source={require('../Assets/search_icon.png')} />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.flatListStyle}
        data={filteredSocieties}
        renderItem={renderItem}
      />

      {/* {selectedSocieties.length > 0 && ( */}
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={handleSelectApartment}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.nextText}>Next</Text>
        )}
      </TouchableOpacity>
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: wpx(10),
    paddingLeft: 10,
    // marginTop: hpx(20),
  },
  searchInput: {
    flex: 1,
    height: hpx(50),
  },
  searchIcon: {
    padding: 10,
  },
  flatListStyle: {
    // flex:1,
    marginTop: hpx(20),
    marginBottom: hpx(20),
    marginHorizontal: wpx(10),
  },
  itemStyle: {
    backgroundColor: '#F5F5F5',
    marginTop: hpx(16),
    padding: 10,
    borderRadius: 10,
    borderWidth: wpx(1),
    paddingLeft: wpx(24),
    elevation: 3,
    borderColor: 'black',
  },
  itemText: {
    flex: 1,
    color: '#000000',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    textAlign: 'center',
  },
  selectedItem: {
    backgroundColor: '#FDD312',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickIcon: {
    marginHorizontal: wpx(10),
  },
  nextBtn: {
    height: hpx(60),
    marginHorizontal: wpx(30),
    backgroundColor: '#F89C29',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    // marginTop: hpx(150),
    bottom: hpx(10),
  },
  nextText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    color: '#ffffff',
  },
});

export default SelectApartment;
