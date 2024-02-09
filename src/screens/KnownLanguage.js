import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {wpx, hpx} from '../Component/responsive';

const KnownLanguage = ({route}) => {
  const navigation = useNavigation();
  const {personalDetails} = route.params;
  //console.log('Personal Details:', personalDetails);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const data = [
    {id: 1, name: 'Hindi'},
    {id: 2, name: 'English'},
    {id: 3, name: 'ಕನ್ನಡ'},
    {id: 4, name: 'తెలుగు'},
    {id: 5, name: 'తమిళం'},
    {id: 6, name: 'Marathi'},
    {id: 7, name: 'బెంగాలీ'},
  ];

  const toggleLanguageSelection = languageName => {
    const updatedSelection = [...selectedLanguages];

    if (updatedSelection.includes(languageName)) {
      // Remove the language if already selected
      updatedSelection.splice(updatedSelection.indexOf(languageName), 1);
    } else {
      // Add the language if not selected
      updatedSelection.push(languageName);
    }

    setSelectedLanguages(updatedSelection);
  };

  const handleNext = () => {
    const data = {
      languages: selectedLanguages.join(','),
    };

    if (selectedLanguages.length > 0) {
      navigation.navigate('GovermentIdentity', {
        ...route.params,
        knownLanguage: data,
      });
    }
  };

  const renderItem = ({item}) => {
    const isSelected = selectedLanguages.includes(item.name);

    return (
      <TouchableOpacity
        style={[styles.itemStyle, isSelected && styles.selectedItem]}
        onPress={() => toggleLanguageSelection(item.name)}>
        <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backImageView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../Assets/Arrow.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.selectLanguageView}>
        <Text style={styles.selectLanguageText}>Select Known Language</Text>
      </View>

      <View style={styles.selectLanguageView}>
        <FlatList
          style={styles.flatListStyle}
          data={data}
          renderItem={renderItem}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.nextBtn,
          selectedLanguages.length === 0 && styles.disabledNextBtn,
        ]}
        onPress={handleNext}
        disabled={selectedLanguages.length === 0}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0CC',
  },
  backImageView: {
    flexDirection: 'row',
    marginTop: hpx(50),
    marginLeft: wpx(20),
  },
  backImage: {
    width: wpx(32),
    height: hpx(32),
  },
  selectLanguageView: {
    marginTop: hpx(20),
    marginHorizontal: wpx(30),
  },
  selectLanguageText: {
    fontSize: wpx(24),
    color: '#0D007F',
    fontWeight: '600',
    lineHeight: 36,
  },
  flatListStyle: {
    marginBottom: hpx(20),
  },
  itemStyle: {
    marginTop: hpx(16),
    padding: 10,
    borderRadius: 50,
    borderWidth: wpx(0.2),
    paddingLeft: wpx(24),
    borderWidth: 1,
    borderColor: '#000000',
  },
  itemText: {
    color: '#000000',
    fontSize: wpx(18),
    fontWeight: '500',
    lineHeight: 27,
    textAlign: 'center',
  },
  selectedItem: {
    borderColor: '#F89C29',
  },
  selectedItemText: {
    color: '#F89C29',
  },
  nextBtn: {
    position: 'absolute',
    bottom: hpx(50),
    left: wpx(30),
    right: wpx(30),
    height: hpx(50),
    backgroundColor: '#F89C29',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  disabledNextBtn: {
    backgroundColor: '#C0C0C0',
  },
  nextText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    color: '#ffffff',
  },
});

export default KnownLanguage;
