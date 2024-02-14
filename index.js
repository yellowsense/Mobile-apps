/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {ModalPortal} from 'react-native-modals';
import messaging from '@react-native-firebase/messaging';
import App from './App';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const Root = () => (
  <>
    <App />
    <ModalPortal />
  </>
);

AppRegistry.registerComponent(appName, () => Root);
