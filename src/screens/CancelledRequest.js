import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {wpx, hpx} from '../Component/responsive';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';
import axios from 'axios';
const CancelledRequest = ({route}) => {
  const navigation = useNavigation();
  const [data, setdata] = useState([]);
  const {ProviderNumber} = route.params;
  const [loading, setLoading] = useState(true);
  const [hasCancelledRequests, setHasCancelledRequests] = useState(false); // New state to track if there are cancelled requests

  useEffect(() => {
    getlist();
    console.log('Provider Number', ProviderNumber);
  }, []);

  const getlist = () => {
    axios
      .get(
        `https://yellowsensebackendapi.azurewebsites.net/serviceprovider/requests_details?provider_mobile=${ProviderNumber}&request_status=reject`,
      )
      .then(res => {
        const rejectRequests = res?.data?.reject_requests || [];
        setdata(rejectRequests);
        setHasCancelledRequests(rejectRequests.length > 0); // Update hasCancelledRequests state based on the length of rejectRequests array
        console.log('res====>', res);
      })
      .catch(err => {
        console.log('err', err);
      })
      .finally(() => {
        setLoading(false);
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
        <ScreenHeader title="Rejected Request" />
      </View>
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="#FDD312" />
        </View>
      ) : hasCancelledRequests ? ( // Conditionally render based on whether there are cancelled requests or not
        <FlatList data={data} renderItem={renderItem} />
      ) : (
        <View style={styles.noRejectedRequest}>
          <Text style={styles.noRequestsText}>Great...!</Text>
          <Text style={styles.noRequestsText}>
            You don't have any Rejected request.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#FFF2CD',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainIcon: {
    width: wpx(150),
    height: hpx(150),
  },
  appNameIcon: {
    marginVertical: hpx(40),
  },
  helperInfoText: {
    marginLeft: wpx(16),
    width: 220,
  },
  greatJob: {
    color: '#1FAF38',
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: hpx(10),
  },
  helperInfoView: {
    flexDirection: 'row',
    // marginTop: hpx(20),
  },
  noRejection: {
    color: 'grey',
    fontWeight: '500',
    fontSize: 24,
    marginVertical: hpx(10),
  },
  helperInfoName: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 27,
    color: '#000000',
  },
  helperInfoContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: wpx(20),
    borderRadius: 16,
    paddingVertical: hpx(20),
    paddingHorizontal: wpx(20),
    marginBottom: 20,
    elevation: 5,
  },
  profileImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
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
export default CancelledRequest;
