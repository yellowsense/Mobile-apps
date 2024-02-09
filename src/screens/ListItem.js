import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {wpx, hpx} from '../Component/responsive';

export default function ListItem({id, name, date, time, servicetype, location}) {
  return (
    <View>
      {/* Tab Content */}
      <View style={styles.helperInfoContainer}>
        <View style={styles.helperInfoView}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Image
              source={require('../Assets/client_photo.png')}
              style={{height: 120}}
            />
            <Text style={styles.helperName}>{name}</Text>
          </View>

          <View style={styles.helperInfoText}>
            <Text style={styles.helperInfoName}>Date: {date}</Text>
            <Text style={styles.helperInfoName}>Time: {time}</Text>
            <Text style={styles.helperInfoName}>
              Service Type: {servicetype}
            </Text>
            <Text style={styles.helperInfoName}>
              Job Location: {location}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  helperInfoContainer: {
    marginTop: hpx(20),
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: wpx(20),
    borderRadius: 16,
    paddingVertical: hpx(10),
    paddingHorizontal: wpx(20),
    marginBottom: 20,
    elevation:3,
    borderColor:'yellow',
    borderWidth:0.5,
    borderBottomColor:'yellow',
    borderBottomWidth:2
  },
  helperInfoView: {
    flexDirection: 'row',
    marginTop: hpx(20),
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
    margin:10
  },
  helperInfoText: {
    marginLeft: wpx(16),
  },
  helperInfoName: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 27,
    color: '#000000',
  },
});
