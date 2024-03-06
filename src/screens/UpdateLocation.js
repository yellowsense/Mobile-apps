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
import Toast from 'react-native-toast-message';

const UpdateLocation = ({route}) => {
  const navigation = useNavigation();
  const {userNumber} = route.params;
  const [societyname, setSocietynames] = useState([]);
  const [selectedSocieties, setSelectedSocieties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    apidata();
  }, []);

  //   useEffect(() => {
  //     const fetchMaidDetails = async () => {
  //       try {
  //         const response = await axios.get(
  //           `https://backendapiyellowsense.azurewebsites.net/get_service_provider?mobile_number=${userNumber}`,
  //         );

  //         if (
  //           response.status === 200 &&
  //           response.data &&
  //           response.data.serviceproviders
  //         ) {
  //           const maidDetails = response.data.serviceproviders;
  //           setSocietynames(maidDetails.Location);
  //         } else {
  //           console.error('Error fetching maid details');
  //         }
  //       } catch (error) {
  //         console.error('Error fetching maid details:', error.message);
  //       }
  //     };

  //     fetchMaidDetails();
  //   }, [userNumber]);

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
      const data = {
        user_mobile_number: userNumber,
        locations: selectedSocieties.join(','),
      };

      console.log('Data:', data);

      const response = await axios.put(
        'https://backendapiyellowsense.azurewebsites.net/update_maid_by_mobile',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        console.log('Location updated successfully');

        // Show a toast message
        Toast.show({
          type: 'success',
          text1: 'Location Updated',
          position: 'top',
          visibilityTime: 2000,
          autoHide: true,
          onHide: () => navigation.goBack(),
        });
      } else {
        console.error('Error updating Location');
        // Show a toast message for error
        Toast.show({
          type: 'error',
          text1: 'Error Updating Location',
          position: 'top',
        });
      }
    } catch (error) {
      console.error('Error updating Location:', error.message);
      // Show a toast message for error
      Toast.show({
        type: 'error',
        text1: 'Error Updating Location',
        position: 'top',
      });
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or failure
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
          placeholderTextColor="gray"
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
          <Text style={styles.nextText}>Update</Text>
        )}
      </TouchableOpacity>
      {/* )} */}
    </View>
  );
};

export default UpdateLocation;

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
    color: 'black'
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
