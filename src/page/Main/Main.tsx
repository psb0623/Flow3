import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {AppStackNavigationProp} from '../stack/AppStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Achieve} from '../Achieve';
import {StageGameStack} from '../stack/StageGameStack';
import {ChallengeGameStack} from '../stack/ChallengeGameStack';

type MainTabType = {
  StageGameStack: undefined;
  ChallengeGame: undefined;
  Achieve: undefined;
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

          if (route.name == 'Achieve') {
            return (
              <Image
                source={require('./img/achievement.png')}
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
        name={'Achieve'}
        component={Achieve}
        options={{
          title: '업적',
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
