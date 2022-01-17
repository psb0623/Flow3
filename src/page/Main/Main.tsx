import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {AppStackNavigationProp} from '../stack/AppStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Achieve} from '../Achieve';
import {StageGameStack} from '../stack/StageGameStack';
import {ChallengeGameStack} from '../stack/ChallengeGameStack';
import {PublicTab} from '../Game/Public/Public';

type MainTabType = {
  StageGameStack: undefined;
  ChallengeGame: undefined;
  Public: undefined;
};

const Tab = createBottomTabNavigator<MainTabType>();

export const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name == 'ChallengeGame') {
            return (
              <Image
                source={require('./img/challenge.png')}
                style={{
                  width: size,
                  height: size,
                  tintColor: color,
                }}
              />
            );
          }
          if (route.name == 'StageGameStack') {
            return (
              <Image
                source={require('./img/game.png')}
                style={{
                  width: size,
                  height: size,
                  tintColor: color,
                }}
              />
            );
          }

          if (route.name == 'Public') {
            return (
              <Image
                source={require('./img/internet.png')}
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
        headerShown: false,
      })}>
      <Tab.Screen
        name={'StageGameStack'}
        component={StageGameStack}
        options={{
          title: '일반 모드',
        }}
      />
      <Tab.Screen
        name={'ChallengeGame'}
        component={ChallengeGameStack}
        options={{
          title: '도전 모드',
        }}></Tab.Screen>
      <Tab.Screen
        name={'Public'}
        component={PublicTab}
        options={{
          title: '공유',
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};
