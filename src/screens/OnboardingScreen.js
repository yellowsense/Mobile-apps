import React from 'react'

import { SafeAreaView, StyleSheet, Dimensions, StatusBar, View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get('window');

const COLORS = { primary: '#ECAE44', white: '#fff' }

const slides = [
    {
        id: '1',
        image: require('../images/image11.png'),
        title: 'Book your Maid',
        subtitle: 'Easily find and hire housemaids with a simple touch.',
    },

    {
        id: '2',
        image: require('../images/image22.png'),
        title: 'Book your Cook',
        subtitle: 'Quickly discover and hire experienced cooks with a simple touch.',
    },

    {
        id: '3',
        image: require('../images/image33.png'),
        title: 'Book your Nanny',
        subtitle: 'Effortlessly find and hire dependable nannies with a simple touch.'
    }


];


const Slide = ({ item }) => {
    return <View style={{ alignItems: 'center', width }} >
        <Image
            source={item.image}
            style={{ height: '75%', width, resizeMode: 'contain' }}
        />
        <Text style={styles.title} >{item.title}</Text>
        <Text style={styles.subtitle} >{item.subtitle}</Text>

    </View>
};
const OnboardingScreen = ({ navigation }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const ref = React.useRef(null);
    const Footer = () => {
        return <View style={{
            height: height * 0.25,
            justifyContent: 'space-between',
            paddingHorizontal: 20
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20
            }}>
                {slides.map((_, index) =>
                    <View key={index} style={[styles.indicator, currentSlideIndex == index && {
                        backgroundColor: COLORS.white,
                        width: 25,

                    }]} />)}
            </View>

            <View style={{ marginBottom: 20 }}>
                {
                    currentSlideIndex == slides.length - 1 ? (<View style={{ height: 50 }}>
                        <TouchableOpacity style={[styles.btn]} onPress={() => navigation.replace('HomeScreen')}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>GET STARTED</Text>
                        </TouchableOpacity>
                    </View>
                    ) : (
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                onPress={skip}
                                style={[styles.btn, { backgroundColor: 'transparent', borderWidth: 1, borderColor: 'white' },]}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }} >SKIP</Text>
                            </TouchableOpacity>
                            <View style={{ width: 15 }}></View>
                            <TouchableOpacity style={[styles.btn]} onPress={goNextSlide}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>NEXT</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        </View>
    }


    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
        console.log(currentIndex)
    };

    const goNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != slides.length) {
            const offset = nextSlideIndex * width;
            ref?.current?.scrollToOffset({ offset });
            setCurrentSlideIndex(nextSlideIndex);
        }


    };

    const skip = () => {
        const lastSlideIndex = slides.length - 1;
        const offset = lastSlideIndex * width;
        ref?.current?.scrollToOffset({ offset });
        setCurrentSlideIndex(lastSlideIndex);
        console.log(lastSlideIndex)
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <StatusBar backgroundColor={COLORS.primary} />
            <FlatList
                ref={ref}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                pagingEnabled
                data={slides} contentContainerStyle={{ height: height * 0.75 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <Slide item={item} />}
            />

            <Footer />
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    title: {
        color: COLORS.white,
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center'
    },
    subtitle: {
        color: COLORS.white,
        fontSize: 16,
        marginTop: 10,
        maxWidth: '70%',
        textAlign: 'center',
        lineHeight: 23,

    },

    indicator: {
        height: 2.5,
        width: 15,
        backgroundColor: 'black',
        marginHorizontal: 3,
        borderRadius: 2,
        marginTop: 20

    },
    btn: {
        flex: 1,
        height: 50,
        borderRadius: 5,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',


    }

});


export default OnboardingScreen;
