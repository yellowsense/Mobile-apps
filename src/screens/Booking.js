import {useNavigation, useFocusEffect} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {wpx, hpx} from '../Component/responsive';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Booking = () => {
  const navigation = useNavigation();
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );

  const getData = async () => {
    setLoading(true);

    const userData = await AsyncStorage.getItem('user');
    console.log('25===>', userData);

    axios
      .get(
        `https://yellowsensebackendapi.azurewebsites.net/customer-booking-details/${userData}`,
      )
      .then(res => {
        setdata(res?.data?.provider_details);
        console.log('14==>', res);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderLoader = () => (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#FDD312" />
    </View>
  );

  const renderItem = ({item}) => {
    return (
      <View style={styles.bookingInfoView}>
        {item?.Services === 'Maid' && (
          <Image
            source={require('../Assets/service_image/maid.jpg')}
            style={styles.bookingInfoImage}
          />
        )}
        {item?.Services === 'Cook' && (
          <Image
            source={require('../Assets/service_image/cook.jpg')}
            style={styles.bookingInfoImage}
          />
        )}
        {item?.Services === 'Nanny' && (
          <Image
            source={require('../Assets/service_image/nanny.jpg')}
            style={styles.bookingInfoImage}
          />
        )}
        {item?.Services.includes('Maid') && item?.Services.includes('Cook') && (
          <Image
            source={require('../Assets/service_image/maid.jpg')}
            style={styles.bookingInfoImage}
          />
        )}
        {item?.Services.includes('Cook') &&
          item?.Services.includes('Nanny') && (
            <Image
              source={require('../Assets/service_image/cook.jpg')}
              style={styles.bookingInfoImage}
            />
          )}
        {item?.Services.includes('Maid') &&
          item?.Services.includes('Nanny') && (
            <Image
              source={require('../Assets/service_image/maid.jpg')}
              style={styles.bookingInfoImage}
            />
          )}
        {item?.Services === '' && (
          <Image
            source={require('../Assets/service_image/profile.jpg')}
            style={styles.bookingInfoImage}
          />
        )}
        {item?.Services === "'maid'" && (
          <Image
            source={require('../Assets/service_image/maid.jpg')}
            style={styles.bookingInfoImage}
          />
        )}
        <View>
          <View style={styles.bookingInfoTextView}>
            <Text style={[styles.bookingInfoText, {fontWeight: '500'}]}>
              {item?.Services}-
            </Text>
            <Text
              style={[
                styles.bookingInfoText,
                {fontWeight: '400', fontSize: 12},
              ]}>
              {' '}
              {item.Name}
            </Text>
          </View>
          <View style={styles.bookingInfoTextView}>
            <Text style={[styles.bookingInfoText, {fontWeight: '500'}]}>
              Gender-
            </Text>
            <Text
              style={[
                styles.bookingInfoText,
                {fontWeight: '400', fontSize: 12},
              ]}>
              {' '}
              {item?.Gender}
            </Text>
          </View>
          <View style={styles.bookingInfoTextView}>
            <Text style={[styles.bookingInfoText, {fontWeight: '500'}]}>
              Location-
            </Text>
            <View style={{flex: 1}}>
              <Text
                style={[
                  styles.bookingInfoText,
                  {fontWeight: '400', fontSize: 12, width: wpx(180)},
                ]}
                numberOfLines={1}>
                {' '}
                {item?.Locations}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <ScreenHeader title="Bookings" /> */}
      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: '700',
            color: '#0D007F',
          }}>
          Booking
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FDD312" />
      ) : data.length > 0 ? (
        <FlatList
          style={{
            marginTop: 20,
          }}
          data={data}
          renderItem={renderItem}
          // keyExtractor={(item, index) => index.toString()}
          // ListHeaderComponent={() => <View />} // Empty View as header
          // ListFooterComponent={() => <View />} // Empty View as footer
        />
      ) : (
        <View style={styles.noBookingContainer}>
          <Text style={styles.noBookingText}>
            You have not booked any services.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  bookingInfoView: {
    backgroundColor: '#ffffff',
    padding: [wpx(10), hpx(10)],
    marginHorizontal: wpx(20),
    marginTop: hpx(20),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    bottom: hpx(20),
  },
  bookingInfoImage: {
    width: wpx(100),
    height: hpx(100),
    marginHorizontal: wpx(10),
  },
  bookingInfoTextView: {
    flexDirection: 'row',
  },
  bookingInfoText: {
    lineHeight: 30,
    color: '#000000',
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
  },
  noBookingContainer: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBookingText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
  },
});

export default Booking;
