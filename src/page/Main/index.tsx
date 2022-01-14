import React, {useCallback, useMemo, useRef, useState} from "react";
import {Button, View, Text, StyleSheet, SafeAreaView, StatusBar, StatusBarIOS} from "react-native";
import {AppStackNavigationProp} from "../stack/AppStack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {StageGame} from "../Game/StageGame";
import { ChallengeGame } from "../ChallengeGame";
import {Achieve} from "../Achieve";
import {StageGameStack} from "../stack/StageGameStack";

const Tab = createBottomTabNavigator()

interface Props {

}

export const Main = ({navigation} : Props & AppStackNavigationProp) => {

  return (
          <Tab.Navigator
              screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
                      if (route.name === 'Main') {
                          iconName = focused
                              ? 'ios-information-circle'
                              : 'ios-information-circle-outline';
                      } else if (route.name === 'Settings') {
                          iconName = focused ? 'ios-list-box' : 'ios-list';
                      }

                      return <Ionicons name={iconName} size={size} color={color} />;
                  },

                  tabBarActiveTintColor: 'tomato',
                  tabBarInactiveTintColor: 'gray',
              })}
          >
              <Tab.Screen name="StageGame" component={StageGameStack} />
              <Tab.Screen name={"ChallengeGame"} component={ChallengeGame}></Tab.Screen>
              <Tab.Screen name={"Achieve"} component={Achieve}></Tab.Screen>
          </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center'
  }
})
