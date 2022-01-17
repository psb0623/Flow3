// @flow
import * as React from 'react';
import {Button, SafeAreaView, StatusBar, Text, View} from 'react-native';
import {useCallback} from 'react';
import {AppStackNavigationProp} from '../stack/AppStack';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

export const BeforeStart = ({navigation}: Props & AppStackNavigationProp) => {
  const goMain = useCallback(() => {
    navigation.navigate('Main');
  }, []);


  return (
    <SafeAreaView>
      <StatusBar hidden></StatusBar>
      <Text>Pattern Game</Text>
      <Button title={'GO STAGE'} onPress={goMain}></Button>
    </SafeAreaView>
  );
};
