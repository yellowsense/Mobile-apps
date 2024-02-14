import React, { useRef, useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet,Modal } from 'react-native'
import LottieView from 'lottie-react-native'
const LoadingModal = (props) => {


  const customStyle = styles()
  const [value1, setValue] = useState(1)

  return (
    <View>
      <Modal
        isVisible={props.isModalVisible}
        useNativeDriver={true}
        style={[ 
            customStyle.loadingModalContainer]}
        transparent={true}
      >
        <View
          style={[ 
            {
             alignItems:'center',
             justifyContent:'center'
            },
            customStyle.loadingModal,
          ]}
        >
          <View
            style={[
              customStyle.loadingModalContent,
            ]}
          >
            <View style={[customStyle.some]}>
              <LottieView
                // ref={(animation) => {
                //   animationRef = animation
                // }}
                source={require('../Assets/Loader.json')}
                autoPlay
                loop
                style={[customStyle.primarySuccessImage]}
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
            </View>
            <View
              style={{ 
                alignItems:'center',
              justifyContent:'center'
            }}
            >
              <Text style={[customStyle.title]}>{props.title}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = () => {
  return StyleSheet.create({
    loadingModalContainer: {
      margin: 0,
      borderWidth: 0,
      borderBottomWidth: 10,
      borderColor: '#13396533',
      alignItems:'center',
      flex:1
      // backgroundColor: ''
    },
    loadingModal: {
      height: 227,
      width: 220,
      backgroundColor: "#ffffff",
      borderRadius: 12,
      padding: 10,
      alignItems:'center',
      justifyContent:'center',
     
    },
    loadingModalContent: {
      borderWidth: 0,
      padding: 0,
      height: 247,
      alignItems:'center',
      justifyContent:'center'
    },
    title: {
      color: "#000000",
      fontSize: 16,
      opacity: 0.9,
      textAlign: 'center',
    },
    primarySuccessImage: {
      height: 100,
      width: 100,
      marginBottom: 23,
    },
  })
}

export default LoadingModal
