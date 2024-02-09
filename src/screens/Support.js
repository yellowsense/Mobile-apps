import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {wpx, hpx} from '../Component/responsive';

const Support = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.supportView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../Assets/Arrow.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>

        <Text style={styles.supportText}>Support</Text>
      </View>

      <View style={styles.supportInfoView}>
        <View style={styles.supportInfoImageView}>
          <Image
            source={require('../Assets/Arrow.png')}
            style={styles.supportInfoImage}
          />
        </View>

        <View style={styles.supportInfoTextView}>
          <Text style={[styles.supportInfoText, {opacity: 0.65}]}>
            Contact us at
          </Text>
          <Text style={styles.supportInfoText}>9403890108</Text>
        </View>
      </View>

      <View style={styles.supportInfoView}>
        <View style={styles.supportInfoImageView}>
          <Image
            source={require('../Assets/Arrow.png')}
            style={styles.supportInfoImage}
          />
        </View>

        <View style={styles.supportInfoTextView}>
          <Text style={[styles.supportInfoText, {opacity: 0.65}]}>
            Write us at
          </Text>
          <Text style={styles.supportInfoText}>support@yellowsense.in</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  supportView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hpx(20),
    marginLeft: wpx(20),
  },
  backImage: {
    width: wpx(32),
    height: hpx(32),
    // resizeMode:'contain'
  },
  supportText: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 48,
    color: '#0D007F',
    marginLeft: wpx(100),
  },
  supportInfoView: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    marginHorizontal: wpx(20),
    marginTop: hpx(20),
    paddingHorizontal: wpx(20),
    paddingVertical: hpx(10),
    borderRadius: 8,
  },
  supportInfoImageView: {
    backgroundColor: '#F1F5FD',
    width: wpx(50),
    height: hpx(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  supportInfoImage: {
    width: wpx(24),
    height: hpx(24),
  },
  supportInfoTextView: {
    marginLeft: wpx(20),
  },
  supportInfoText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    color: '#000000',
  },
});
export default Support;