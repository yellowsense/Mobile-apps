import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';
import axios from 'axios';
// import axios from 'axios';

const Notification = ({route}) => {
  const [latestDetails, setLatestDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user_mobile_number} = route.params;
  const apiUrl = `https://yellowsensebackendapi.azurewebsites.net/get_latest_details?mobile_number=${user_mobile_number}`;

  const fetchData = () => {
    axios
      .get(apiUrl)
      .then(response => {
        setLatestDetails(response.data.latest_details);
      })
      .catch(error => {
        // console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [user_mobile_number]);

  return (
    <View style={styles.container}>
      <View>
        <ScreenHeader title="Notification" />
      </View>
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="#FDD312" />
        </View>
      ) : latestDetails.length > 0 ? (
        <FlatList
          data={latestDetails}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.notificationContainer}>
              {item.status === 'accept' ? (
                <Text style={styles.notificationText} numberOfLines={3}>
                  {`${item.user_name} has requested a ${item.service_type} service at ${item.start_time} on ${item.StartDate} in ${item.apartment}. Please Complete this Service.`}
                </Text>
              ) : (
                <Text style={styles.notificationText} numberOfLines={3}>
                  {`New Ongoing Request: - ${item.service_type} service at ${item.start_time} on ${item.StartDate} in ${item.apartment}. Accept or view details?`}
                </Text>
              )}
            </View>
          )}
        />
      ) : (
        <View style={styles.noRejectedRequest}>
          {/* <Text style={styles.noRequestsText}>Sorry...!</Text> */}
          <Text style={styles.noRequestsText}>
            You don't have any Notifications.
          </Text>
        </View>
      )}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  notificationContainer: {
    flexDirection: 'column',
    backgroundColor: '#FDD312',
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderRadius: 12,
    height: 100,
    elevation: 5,
  },
  notificationText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
    marginTop: 5,
  },
  notificationTime: {
    textAlign: 'right',
    color: '#000',
    fontSize: 12,
  },
  noRejectedRequest: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 180,
  },
  noRequestsText: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 5,
    color:'black'
  },
});
