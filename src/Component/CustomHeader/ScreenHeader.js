import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {wpx, hpx} from '../responsive';

const ScreenHeader = ({title}) => {
  const navigation = useNavigation();

  return (
    <ScrollView>
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Assets/Arrow.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginVertical: hpx(20),
    marginHorizontal: wpx(20),
    alignItems:'center'
  },
  backImage: {
    width: wpx(32),
    height: hpx(32),
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0D007F',
  },
});

export default ScreenHeader;