import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {wpx, hpx} from '../responsive';

const UserIdentity = ({navigation, title}) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Assets/Arrow.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <View style={styles.mainIconView}>
          <Image
            source={require('../../Assets/MainIcon.png')}
            style={styles.mainIconImage}
          />
        </View>
      </View>

      <View style={styles.titleView}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginVertical: hpx(50),
    marginHorizontal: wpx(20),
  },
  backImage: {
    width: wpx(32),
    height: hpx(32),
  },
  mainIconView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainIconImage: {
    width: wpx(120),
    height: hpx(120),
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0D007F',
  },
});

export default UserIdentity;