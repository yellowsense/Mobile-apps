import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import {wpx, hpx, wp, hp} from '../Component/responsive';
import ScreenHeader from '../Component/CustomHeader/ScreenHeader';

const ViewHelper = props => {
  const data = props?.route?.params?.data;
  const {selectedService} = props.route.params;
  const [selectedServiceImage, setSelectedServiceImage] = useState(null);

  useEffect(() => {
    // Update selectedServiceImage based on the selectedService
    if (selectedService === 'Maid') {
      setSelectedServiceImage(require('../Assets/service_image/maid.jpg'));
    } else if (selectedService === 'Cook') {
      setSelectedServiceImage(require('../Assets/service_image/cook.jpg')); // Replace with the actual image for Cook
    } else if (selectedService === 'Nanny') {
      setSelectedServiceImage(require('../Assets/service_image/nanny.jpg')); // Replace with the actual image for Nanny
    }
  }, [selectedService]);

  const [ModalVisible, setModalVisible] = useState(false);
  const [memberno, setmemberno] = useState('');
  const navigation = useNavigation();
  const houseMembers = [
    {key: '1', value: '1'},
    {key: '2', value: '2'},
    {key: '3', value: '3'},
    {key: '4', value: '4'},
    {key: '5', value: '5'},
  ];

  const renderItem1 = item => {
    return (
      <View style={[styles.DropElementParentContainer]}>
        <Text style={[styles.DropElementParentTxt]}>{item?.value}</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.helperInfoView}>
        {/* <View style={styles.helperInfoImage} /> */}
        <Image
          style={styles.helperInfoImage}
          source={selectedServiceImage || require('../Assets/maid_service.jpg')}
        />

        <View style={styles.helperInfoText}>
          <Text style={styles.helperInfoName}>{item.Name}</Text>

          <View style={styles.helperInfoLocation}>
            <Image
              source={require('../Assets/location.png')}
              style={styles.helperInfoLocationImage}
            />
            {/* <Text style={{color: 'black', fontWeight: '500', fontSize: 16}}>
              Locations:
            </Text> */}
            <View style={{flex: 1}}>
              <Text style={styles.helperInfoLocationName} numberOfLines={8}>
                {item?.Locations.join(', ')}
              </Text>
            </View>
          </View>

          {/* <View style={styles.helperInfoLocation}>
            <Image source={item.image} />
            <Text
              style={{color: 'black', fontWeight: 'bold', marginLeft: wpx(5)}}>
              {"4/2"}
            </Text>
          </View> */}

          <View style={styles.helperInfoLocation}>
            <Text style={{color: 'black', fontWeight: '500', fontSize: 16}}>
              Services:
            </Text>
            <Text style={styles.helperInfoLocationName} numberOfLines={3}>
              {item?.Services.join(', ')}
            </Text>
          </View>

          <View style={styles.helperInfoLocation}>
            <Text style={{color: 'black', fontWeight: '500', fontSize: 16}}>
              Timings:
            </Text>
            <View style={{flex: 1}}>
              <Text style={styles.helperInfoLocationName} numberOfLines={3}>
                {item?.Timings.join(', ')}
              </Text>
            </View>
          </View>

          {/* <Text style={styles.helperInfoType}>{item.Gender}</Text> */}

          <View style={styles.helperInfoBtnContainer}>
            <TouchableOpacity
              style={[styles.helperInfoBtnView, {backgroundColor: '#FDD312'}]}
              onPress={() => {
                navigation.navigate('HelperDetail', {
                  item,
                  selectedServiceImage,
                });
              }}>
              <Text style={styles.helperInfoBtnText}>View</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={[
                styles.helperInfoBtnView,
                {backgroundColor: '#6244C4', marginHorizontal: wpx(20)},
              ]}
              onPress={() => {
                navigation.navigate('Login', {item});
              }}>
              <Text style={styles.helperInfoBtnText}>Book</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewHelperContainer}>
        {/* <View style={styles.viewHelperContainerView}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../Assets/Arrow.png')}
              style={styles.goBackandFilter}
            />
          </TouchableOpacity>

          <Text style={styles.viewHelperText}>View Helpers</Text>
        </View> */}

        <ScreenHeader title="View Helpers" />

        {/* <TouchableOpacity
          style={styles.filterImgView}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Image
            source={require('../images/filter.png')}
            style={styles.goBackandFilter}
          />
        </TouchableOpacity> */}
      </View>

      {/* Filter Modal*/}
      <View>
        <Modal animationType="fade" transparent={true} visible={ModalVisible}>
          <TouchableWithoutFeedback>
            <View style={styles.filterModal}>
              <View style={styles.filterModalContainer}>
                <View style={styles.filterModalFilter}>
                  <Text style={styles.filterModalFilterText}>Filter</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    <Image
                      source={require('../images/material-symbols_close.png')}
                      style={styles.filterModalCloseBtn}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.filterModalRatingExp}>
                  <Text style={styles.filterModalRatingExpText}>Rating</Text>
                </View>

                <View style={[styles.TxtInptContainer]}>
                  <Dropdown
                    style={[styles.dropdown]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={houseMembers}
                    maxHeight={300}
                    labelField="value"
                    valueField="key"
                    placeholder={memberno ? memberno : 'Select---'}
                    searchPlaceholder="Search Here..."
                    value={memberno}
                    //   search
                    onChange={item => {
                      console.log('90===', item.value);
                      setmemberno(item.value);
                    }}
                    renderItem={renderItem1}
                  />
                </View>

                <View style={styles.filterModalRatingExp}>
                  <Text style={styles.filterModalRatingExpText}>
                    Experience (In Years)
                  </Text>
                </View>

                <View style={styles.filterModalMMExp}>
                  <Text style={styles.filterModalMMExpText}>
                    Min Experience
                  </Text>
                </View>

                <View style={[styles.TxtInptContainer]}>
                  <Dropdown
                    style={[styles.dropdown]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={houseMembers}
                    maxHeight={300}
                    labelField="value"
                    valueField="key"
                    placeholder={memberno ? memberno : 'Select---'}
                    searchPlaceholder="Search Here..."
                    value={memberno}
                    //   search
                    onChange={item => {
                      console.log('90===', item.value);
                      setmemberno(item.value);
                    }}
                    renderItem={renderItem1}
                  />
                </View>

                <View style={styles.filterModalMMExp}>
                  <Text style={styles.filterModalMMExpText}>
                    Max Experience
                  </Text>
                </View>

                <View style={[styles.TxtInptContainer]}>
                  <Dropdown
                    style={[styles.dropdown]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={houseMembers}
                    maxHeight={300}
                    labelField="value"
                    valueField="key"
                    placeholder={memberno ? memberno : 'Select---'}
                    searchPlaceholder="Search Here..."
                    value={memberno}
                    //   search
                    onChange={item => {
                      console.log('90===', item.value);
                      setmemberno(item.value);
                    }}
                    renderItem={renderItem1}
                  />
                </View>

                <View style={styles.filterModalApplyBtn}>
                  <TouchableOpacity style={styles.filterModalApplyBtnView}>
                    <Text style={styles.filterModalApplyBtnText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>

      {data == 'No matching service providers found' ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>No matching service providers found</Text>
        </View>
      ) : (
        <View style={styles.helperInfoContainer}>
          <FlatList data={data} renderItem={renderItem} />
        </View>
      )}
    </View>
  );
};
export default ViewHelper;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0CC',
  },
  viewHelperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wpx(20),
    // marginTop: hpx(20),
    justifyContent: 'space-between',
  },
  viewHelperContainerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBackandFilter: {
    width: wpx(32),
    height: hpx(32),
    // resizeMode:'contain'
  },
  filterModal: {
    backgroundColor: '#000000aa',
    flex: 1,
    justifyContent: 'flex-end',
    width: Dimensions.get('window').width,
  },
  filterModalContainer: {
    backgroundColor: '#FFF0CC',
    // height:100,
    paddingVertical: hpx(20),
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
  },
  filterModalFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wpx(20),
  },
  filterModalFilterText: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
    color: '#000000',
    marginLeft: hpx(10),
  },
  filterModalCloseBtn: {
    width: wpx(32),
    height: hpx(32),
  },
  filterModalRatingExp: {
    backgroundColor: '#FDD312',
    marginTop: hpx(20),
    paddingHorizontal: wpx(14),
    paddingVertical: hpx(4),
  },
  filterModalRatingExpText: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    color: '#000000',
  },
  filterModalMMExp: {
    marginTop: hpx(16),
    marginHorizontal: wpx(20),
  },
  filterModalMMExpText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: '#000000',
  },

  filterModalApplyBtn: {
    alignItems: 'center',
  },

  filterModalApplyBtnView: {
    backgroundColor: '#F89C29',
    marginVertical: hpx(20),
    paddingHorizontal: wpx(60),
    alignItems: 'center',
    paddingVertical: hpx(10),
    borderRadius: 8,
  },
  filterModalApplyBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  viewHelperText: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 48,
    color: '#0D007F',
    marginLeft: wpx(50),
  },
  filterImgView: {
    backgroundColor: '#F89C29',
    padding: 2,
    borderRadius: 10,
  },
  helperInfoContainer: {
    marginTop: hpx(20),
    flex: 1,
    bottom: 20,
  },
  helperInfoView: {
    backgroundColor: '#ffffff',
    marginTop: hpx(10),
    padding: 16,
    flexDirection: 'row',
    marginHorizontal: wpx(20),
    borderRadius: 16,
  },
  helperInfoImage: {
    width: wpx(120),
    height: hpx(150),
    backgroundColor: 'red',
    borderRadius: 5,
  },
  helperInfoText: {
    marginLeft: wpx(16),
  },
  helperInfoName: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 27,
    color: '#000000',
  },
  helperInfoLocation: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: hpx(4),
  },
  helperInfoLocationImage: {
    marginTop: wpx(6),
    width: wpx(14),
    height: hpx(18),
  },
  helperInfoLocationName: {
    fontSize: 14,
    fontWeight: '300',
    color: '#000000',
    lineHeight: 19.5,
    marginLeft: wpx(4),
  },
  helperInfoType: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 20,
    marginTop: hpx(4),
  },
  helperInfoBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hpx(6),
  },
  helperInfoBtnView: {
    paddingVertical: hpx(8),
    borderRadius: 4,
    paddingHorizontal: wpx(80),
  },
  helperInfoBtnText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
    lineHeight: 22.5,
  },

  button: {
    backgroundColor: '#f89c29',
    top: 5,
    right: 40,
    borderRadius: 10,
    margin: 30,
    padding: 10,
    width: wpx(100),
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
    marginTop: hpx(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginLeft: hpx(20),
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
