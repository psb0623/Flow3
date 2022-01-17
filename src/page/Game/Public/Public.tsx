import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SharePattern} from './SharePattern';
import {CreatePattern} from './CreatePattern';
import {PublicGameStack} from '../../stack/PublicGameStack';

type PatternTabType = {
  CreatePattern: undefined;
  SharePattern: undefined;
};

const Tab = createBottomTabNavigator<PatternTabType>();

export const PublicTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name == 'SharePattern') {
            return (
              <Image
                source={require('./img/network.png')}
                style={{
                  width: size,
                  height: size,
                  tintColor: color,
                }}
              />
            );
          }

          if (route.name == 'CreatePattern') {
            return (
              <Image
                source={require('./img/pen.png')}
                style={{
                  width: size,
                  height: size,
                  tintColor: color,
                }}
              />
            );
          }
        },
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}>
      <Tab.Screen
        name={'SharePattern'}
        component={PublicGameStack}
        options={{
          title: 'RECENT  ',
        }}
      />
      <Tab.Screen
        name={'CreatePattern'}
        component={CreatePattern}
        options={{
          title: '패턴 생성',
        }}
      />
    </Tab.Navigator>
  );
};
