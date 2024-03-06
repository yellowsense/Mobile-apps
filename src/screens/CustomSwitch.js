import {View, TouchableOpacity, Text} from 'react-native';
import React, {useState} from 'react';

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };
  return (
    <View
      style={{
        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        // borderBottomWidth: 5,
        // borderColor: '#F89C29',
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: getSelectionMode === 1 ? 5 : 0,
          borderBottomColor: getSelectionMode === 1 ? '#F89C29' : '#000',
        }}>
        <Text
          style={{
            color: getSelectionMode == 1 ? 'black' : 'grey',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {option1}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: getSelectionMode === 2 ? 5 : 0,
          borderBottomColor: getSelectionMode === 2 ? '#F89C29' : '#000',
        }}>
        <Text
          style={{
            color: getSelectionMode == 2 ? 'black' : 'grey',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
