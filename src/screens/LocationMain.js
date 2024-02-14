import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import {useWindowDimensions} from 'react-native';
import {wpx, hpx} from '../Component/responsive';

const LocationMain = ({navigation}) => {
  const windowWidth = useWindowDimensions().width;

  const [latitude, setLatitude] = useState(28.57966); // Default latitude
  const [longitude, setLongitude] = useState(77.32111); // Default longitude

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(info => {
  //     console.log('location', info);
  //     setLatitude(info?.coords?.latitude || 28.57966);
  //     setLongitude(info?.coords?.longitude || 77.32111);
  //   });
  // }, []);

  // const location = [latitude,longitude]; for sending location or place as a prop

  const getLocation = () => {
    navigation.navigate('BottomTabNavigator');

    // for sending location or place as a prop
    // navigation.navigate('BottomTabNavigator', {
    //   screen: 'Home',
    //   params: { location: location },
    // });
  };

  return (
    <View style={styles.container}>
      {/* For MapView */}
      <View style={styles.MainContainer}>
        <MapView
          style={[styles.mapStyle, {width: windowWidth - wpx(40)}]}
          showsUserLocation={false}
          zoomEnabled={true}
          zoomControlEnabled={true}
          initialRegion={{
            longitude: 77.37,
            latitude: 28.62,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}>
          <Marker
            coordinate={{latitude: latitude, longitude: longitude}}
            // coordinate={{latitude: latitude || 28.579660, longitude: longitude || 77.321110}}
            // title={'JavaTpoint'}
            // description={"Java Training Institute"}
          />
        </MapView>
      </View>

      {/* For Two Buttons */}
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={[styles.locationBtn, {backgroundColor: 'orange'}]}
          onPress={() => {
            getLocation();
          }}>
          <Text style={[styles.locationText, {color: 'white'}]}>
            Use my Current Location
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.locationBtn,
            {backgroundColor: 'white', borderWidth: 1, borderColor: 'orange'},
          ]}
          onPress={() => navigation.replace('SearchLocation')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[styles.locationText, {color: 'orange'}]}>
              Enter Location Manually
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0CC',
  },
  MainContainer: {
    flex: 1,
    marginHorizontal: wpx(20),
    marginVertical: hpx(20),
    marginTop: hpx(40),
  },
  mapStyle: {
    flex: 1,
  },
  buttonView: {
    marginVertical: hpx(20),
  },
  locationBtn: {
    height: hpx(60),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hpx(20),
    width: '90%',
    alignSelf: 'center',
  },
  locationText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LocationMain;
