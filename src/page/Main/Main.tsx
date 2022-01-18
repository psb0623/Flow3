import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  StageGameStack,
  StageGameStackType,
  StageGameTypes,
} from '../stack/StageGameStack';
import {ChallengeGameStack} from '../stack/ChallengeGameStack';
import {PublicTab} from '../Game/Public/Public';
import {DailyPattern} from '../Game/DailyPattern';
import {BottomTabNavigationConfig} from '@react-navigation/bottom-tabs/lib/typescript/src/types';

type MainTabType = {
  StageGameStack: undefined;
  ChallengeGame: undefined;
  DailyPattern: undefined;
};

const Tab = createBottomTabNavigator<MainTabType>();

export type MainTabNavigationProp = {
  navigation: BottomTabNavigationProp<MainTabType, keyof MainTabType>;
};

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

          if (route.name == 'DailyPattern') {
            return (
              <Image
                source={require('./img/daily-calendar.png')}
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
        name={'DailyPattern'}
        component={DailyPattern}
        options={{
          title: '일일 챌린지',
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};
