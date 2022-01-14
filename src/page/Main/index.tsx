import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {AppStackNavigationProp} from '../stack/AppStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ChallengeGame} from '../ChallengeGame';
import {Achieve} from '../Achieve';
import {StageGameStack} from '../stack/StageGameStack';

type MainTabType = {
  StageGameStack: undefined;
  ChallengeGame: undefined;
  Achieve: undefined;
};

const Tab = createBottomTabNavigator<MainTabType>();

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {} & AppStackNavigationProp;

export const Main = ({navigation}: Props) => {
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
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="StageGameStack" component={StageGameStack} />
      <Tab.Screen name={'ChallengeGame'} component={ChallengeGame}></Tab.Screen>
      <Tab.Screen name={'Achieve'} component={Achieve}></Tab.Screen>
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
