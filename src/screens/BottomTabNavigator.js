import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Image, StyleSheet, Text} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Home from './Home';
import Profile from './Profile';
import Support from './Support.js';
import {wpx, hpx} from '../Component/responsive';

const BottomTabNavigator = ({route}) => {
  const Tab = createBottomTabNavigator();
  const focusedRoute = getFocusedRouteNameFromRoute(route);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor:
          focusedRoute === 'Home'
            ? '#fff'
            : focusedRoute === 'Profile'
            ? '#FFF2CD' // Change to the color you desire for 'Profile' screen
            : focusedRoute === 'Support'
            ? '#FFF2CD' // Change to the color you desire for 'Support' screen
            : '#fff', // Default to white for other screens
      }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          initialParams={{user_mobile_number: route.params?.user_mobile_number}}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source={require('../Assets/BottomIcon/home_icon.png')}
                  style={{
                    ...styles.imageStyle,
                    tintColor: focused ? '#81402f' : 'rgba(0, 0, 0, 0.25)',
                  }}
                />
              </View>
            ),
            tabBarLabel: ({focused, color}) => (
              <Text
                style={{color: focused ? '#81402f' : 'rgba(0, 0, 0, 0.25)'}}>
                Home
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          initialParams={{user_mobile_number: route.params?.user_mobile_number}}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source={require('../Assets/BottomIcon/iconamoon_profile.png')}
                  style={{
                    ...styles.imageStyle,
                    tintColor: focused ? '#000' : 'rgba(0, 0, 0, 0.25)',
                  }}
                />
              </View>
            ),
            tabBarLabel: ({focused, color}) => (
              <Text style={{color: focused ? '#000' : 'rgba(0, 0, 0, 0.25)'}}>
                Profile
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Support"
          component={Support}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source={require('../Assets/BottomIcon/SupportIcon.png')}
                  style={{
                    ...styles.imageStyle,
                    tintColor: focused ? '#000' : 'rgba(0, 0, 0, 0.25)',
                  }}
                />
              </View>
            ),
            tabBarLabel: ({focused, color}) => (
              <Text style={{color: focused ? '#000' : 'rgba(0, 0, 0, 0.25)'}}>
                Support
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    //backgroundColor:'#fff'
  },
  tabBarStyle: {
    backgroundColor: '#FDD312',
    height: hpx(60),
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingHorizontal: wpx(20),
  },
  imageStyle: {
    width: wpx(24),
    height: hpx(24),
    resizeMode: 'contain',
  },
});
export default BottomTabNavigator;
