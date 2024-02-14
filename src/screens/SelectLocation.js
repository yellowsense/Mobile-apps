import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const SelectLocation = () => {
  const [SpecialityType, setSpecialityType] = useState('');
  const [societyname, setSocietynames] = useState([]);

  const navigation = useNavigation();

  const foodTypes = [
    {key: '1', value: 'Kannada style'},
    {key: '2', value: 'italian Cuisine'},
    {key: '3', value: 'Mexican style'},
    {key: '4', value: 'Indian '},
    {key: '5', value: 'Ramen'},
  ];
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

  const renderDropdownIcon = () => {
    return (
      <Image
        source={require('../Assets/search_icon.png')}
        style={{width: 20, height: 20, marginRight: 20}}
      />
    );
  };

  const renderItem = (item, selected) => {
    return (
      <View style={[styles.DropElementParentContainer]}>
        <Text style={[styles.DropElementParentTxt, {color: 'black'}]}>
          {item?.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF2CD'}}>
      <View style={[styles.TxtInptContainer]}>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={societyname}
          maxHeight={300}
          labelField="name"
          valueField="id"
          placeholder={
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {renderDropdownIcon()}
              <Text style={{fontSize: 16}}>
                {SpecialityType ? SpecialityType : 'Search Apartment'}
              </Text>
            </View>
          }
          searchPlaceholder="Search Here..."
          value={SpecialityType}
          onChange={item => {
            const selectedValue = item?.name; // or item?.name, based on your requirements
            console.log('Selected item:', selectedValue);
            setSpecialityType(selectedValue);
            navigation.navigate('BottomTabNavigator', {
              screen: 'Home',
              params: {selectedValue: selectedValue},
            });
          }}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'gray',
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 8,
  },
  TxtInptContainer: {
    height: 50,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginLeft: 20,
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
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  DropElementParentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // justifyContent: ,
    borderBottomWidth: 0,
    backgroundColor: '#FDD312',
  },
  DropElementParentTxt: {
    fontSize: 16,
    flex: 1,
    color: 'black',
  },
});
export default SelectLocation;
