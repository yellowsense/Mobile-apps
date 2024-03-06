import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {wpx, hpx} from '../Component/responsive';

const LanguageScreen = () => {
  const navigation = useNavigation();
  const data = [
    {id: 1, name: 'English'},
    {id: 2, name: 'ಕನ್ನಡ'},
    {id: 3, name: 'हिन्दी'},
    {id: 4, name: 'தமிழ்'},
    {id: 5, name: 'తెలుగు'},
    {id: 6, name: 'मराठी'},
    {id: 7, name: 'ਪੰਜਾਬੀ'},
    {id: 8, name: 'বাংলা'},
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemStyle}
        onPress={() => {
          navigation.navigate('Login');
          // navigation.navigate('OTPAuthentication');
        }}>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectlanguageView}>
        <Text style={styles.selectlanguageText}>Select language</Text>
        <FlatList
          style={styles.flatListStyle}
          data={data}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0CC',
  },
  selectlanguageView: {
    marginTop: hpx(20),
    marginHorizontal: wpx(20),
  },
  selectlanguageText: {
    fontSize: wpx(24),
    color: '#0D007F',
    fontWeight: '600',
    lineHeight: 36,
  },
  flatListStyle: {
    marginTop: hpx(20),
    marginBottom: hpx(20),
  },
  itemStyle: {
    backgroundColor: '#F5F5F5',
    marginTop: hpx(16),
    padding: 10,
    borderRadius: 10,
    borderWidth: wpx(0.2),
    paddingLeft: wpx(24),
    elevation: 3,
    // borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  itemText: {
    color: '#000000',
    fontSize: wpx(18),
    fontWeight: '500',
    lineHeight: 27,
  },
});
