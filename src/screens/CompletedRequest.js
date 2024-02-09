import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {wpx, hpx} from '../Component/responsive';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';
import axios from 'axios';

const CompletedRequest = ({route}) => {
  const navigation = useNavigation();
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const {ProviderNumber} = route.params;
  const [hasAcceptedRequests, setHasAcceptedRequests] = useState(false); // New state to track if there are accepted requests

  useEffect(() => {
    getlist();
    console.log('Provider Number', ProviderNumber);
  }, []);

  const getlist = () => {
    axios
      .get(
        `https://yellowsensebackendapi.azurewebsites.net/serviceprovider/requests_details?provider_mobile=${ProviderNumber}&request_status=accept`,
      )
      .then(res => {
        const acceptRequests = res?.data?.accept_requests || [];
        setdata(acceptRequests);
        setHasAcceptedRequests(acceptRequests.length > 0); // Update hasAcceptedRequests state based on the length of acceptRequests array
        console.log('res====>', res);
      })
      .catch(err => {
        console.log('err', err);
      })
      .finally(() => {
        setLoading(false);
        console.log('loading');
      });
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.helperInfoContainer}>
        <View style={styles.helperInfoView}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Image
              source={require('../Assets/profile.jpg')}
              style={styles.profileImage}
            />
          </View>

          <View style={styles.helperInfoText}>
            <Text style={styles.helperInfoName}>Name: {item?.user_name}</Text>
            <Text style={styles.helperInfoName}>
              Service Type: {item?.service_type}
            </Text>
            <Text style={styles.helperInfoName}>
              Job Location: {item?.apartment}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <ScreenHeader title="Accepted Request" />
      </View>
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="#FDD312" />
        </View>
      ) : hasAcceptedRequests ? ( // Conditionally render based on whether there are accepted requests or not
        <FlatList data={data} renderItem={renderItem} />
      ) : (
        <View style={styles.noRejectedRequest}>
          <Text style={styles.noRequestsText}>Sorry...!</Text>
          <Text style={styles.noRequestsText}>
            You don't have any Accepted request.
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
  profileImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  helperInfoContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: wpx(20),
    borderRadius: 16,
    paddingVertical: hpx(10),
    paddingHorizontal: wpx(20),
    marginBottom: 20,
    elevation: 5,
  },
  helperInfoView: {
    flexDirection: 'row',
    // marginTop: hpx(20),
  },
  helperInfoImage: {
    width: wpx(130),
    height: hpx(130),
    backgroundColor: 'red',
    borderRadius: 5,
  },
  helperName: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  helperInfoText: {
    marginLeft: wpx(16),
    width: 220,
  },
  helperInfoName: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 27,
    color: '#000000',
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
  },
});
export default CompletedRequest;
