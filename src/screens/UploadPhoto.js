import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {wpx, hpx} from '../Component/responsive';

const UploadPhoto = () => {
  const navigation = useNavigation();
  const [imageAdded, setImageAdded] = useState(false);

  const handleUpload = () => {
    if (imageAdded) {
      navigation.navigate('HomeScreen');
    } else {
      // Image is not added, show an alert
      Alert.alert('Alert', 'Please add a profile photo.');
    }
  };

  // const handleImagePicker = () => {
  //   ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else {
  //       // Image selected, update the state
  //       setImageAdded(true);
  //     }
  //   });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.profilePhotoView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../Assets/Arrow.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <Text style={styles.profilePhotoText}>Upload Profile Photo</Text>
      </View>

      {/* Centered Image */}
      <TouchableOpacity
        style={styles.centeredImageContainer}
        //onPress={handleImagePicker} // Open image picker when centeredImage is pressed
      >
        <View style={styles.centeredImage}>
          {/* Display a different image or text if an image is added */}
          {imageAdded ? (
            <Text style={styles.uploadText}>Tap to Add Photo</Text>
          ) : (
            <Image source={require('../Assets/upload_photo.png')} />
          )}
        </View>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'column',
          position: 'absolute',
          bottom: 50,
          left: wpx(30),
          right: wpx(30),
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={[styles.uploadBtn, {marginBottom: 20}]}
          onPress={handleUpload}>
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.doLaterBtn}
          onPress={() => {
            navigation.navigate('BottomTabNavigator');
          }}>
          <Text style={styles.doLaterText}>Do Later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF2CD',
  },
  profilePhotoView: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-between',
    marginTop: hpx(20),
    marginHorizontal: wpx(20),
  },
  profilePhotoText: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 48,
    color: '#0D007F',
    alignItems: 'center',
    marginHorizontal: wpx(50),
  },
  backImage: {
    width: wpx(32),
    height: hpx(32),
    // resizeMode:'contain'
  },
  centeredImageContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: hpx(120),
  },
  centeredImage: {
    width: wpx(250),
    height: hpx(250),
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#DADADA',
    padding: 50,
    alignItems: 'center',
  },
  uploadBtn: {
    height: hpx(50),
    backgroundColor: '#F89C29',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    color: '#ffffff',
  },
  doLaterBtn: {
    height: hpx(50),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F89C29',
  },
  doLaterText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    color: '#F89C29',
  },
});
export default UploadPhoto;
