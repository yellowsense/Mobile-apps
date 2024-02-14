import React from 'react';
import {wpx, hpx, wp, hp} from '../Component/responsive';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#ECAE44', white: '#fff', yellow: '#FDD312'};

const slides = [
  {
    id: '1',
    image: require('../Assets/maid.json'),
    title: 'HouseHelp at your doorstep',
    subtitle: 'Easily find and hire housemaids with a simple touch.',
  },

  {
    id: '2',
    image: require('../Assets/cook.json'),
    title: 'Elevate your taste buds with every booking',
    subtitle:
      'Quickly discover and hire experienced cooks with a simple touch.',
  },

  {
    id: '3',
    image: require('../Assets/nanny.json'),
    title: 'Nannies who nurture, so you can thrive',
    subtitle:
      'Effortlessly find and hire dependable nannies with a simple touch.',
  },
];

const Slide = ({item}) => {
  return (
    <View style={styles.slideItemView}>
      <LottieView
        // ref={(animation) => {
        //   animationRef = animation
        // }}
        source={item.image}
        autoPlay
        loop
        style={{height: '75%', width, resizeMode: 'contain'}}
        // autoPlay
        // loop
        colorFilters={[
          {
            keypath: 'button',
            color: '#F00000',
          },
          {
            keypath: 'Sending Loader',
            color: '#F00000',
          },
        ]}
      />

      {/* <Text style={styles.title}>{item.title}</Text> */}
      {/* <Text style={styles.subtitle}>{item.subtitle}</Text> */}
    </View>
  );
};
const OnboardingScreen = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef(null);

  const Footer = ({currentSlideIndex}) => {
    const getTitleForIndex = index => {
      if (index >= 0 && index < slides.length) {
        return slides[index].title;
      }
      return '';
    };

    return (
      <View style={styles.footerView}>
        <Text style={styles.title}>{getTitleForIndex(currentSlideIndex)}</Text>
        <View style={styles.indicatorView}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.yellow,
                  width: wpx(20),
                  height: hpx(10),
                  borderRadius: 20,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.footerBtnsView}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: hpx(50)}}>
              <TouchableOpacity
                style={[styles.footerbtn]}
                onPress={() => navigation.replace('LanguageScreen')}>
                <Text style={[styles.footerText, {color: 'white'}]}>
                  Get Started
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={skip}
                style={[
                  styles.footerbtn,
                  {
                    backgroundColor: 'transparent',
                    borderWidth: wpx(1),
                    borderColor: 'white',
                  },
                ]}>
                <Text style={[[styles.footerText, {color: 'black'}]]}>
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{width: wpx(15)}}></View>
              <TouchableOpacity
                style={[styles.footerbtn]}
                onPress={goNextSlide}>
                <Text style={[styles.footerText, {color: 'white'}]}>NEXT</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
    console.log(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({offset});
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current?.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
    console.log(lastSlideIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        pagingEnabled
        data={slides}
        contentContainerStyle={{height: height * 0.75}}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer currentSlideIndex={currentSlideIndex} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  slideItemView: {
    alignItems: 'center',
    width: width,
  },
  title: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: hpx(20),
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 16,
    marginTop: hpx(10),
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },

  indicator: {
    height: hpx(10),
    width: wpx(10),
    backgroundColor: 'grey',
    marginHorizontal: wpx(3),
    borderRadius: 50,
    marginTop: hpx(20),
  },
  footerbtn: {
    flex: 1,
    height: hpx(50),
    borderRadius: 5,
    backgroundColor: '#ECAE44',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerView: {
    height: height * 0.4,
    justifyContent: 'space-between',
    paddingHorizontal: wpx(20),
    backgroundColor: '#FFF0CC',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  indicatorView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hpx(20),
  },
  footerBtnsView: {
    marginBottom: hpx(20),
  },
  footerText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default OnboardingScreen;
