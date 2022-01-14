// @flow
import * as React from 'react';
import {Button, View} from 'react-native';
import {useCallback} from 'react';
import {StageGameStackNavigationProp} from '../stack/StageGameStack';

type Props = {} & StageGameStackNavigationProp;

export const StageSelect = ({navigation}: Props) => {
  const goStage3 = useCallback(() => {
    navigation.push('StageGame', {
      gameType: 'Three',
    });
  }, []);

  const goStage4 = useCallback(() => {
    navigation.push('StageGame', {
      gameType: 'Four',
    });
  }, []);

  return (
    <View>
      <Button title={'3'} onPress={goStage3}></Button>
      <Button title={'4'} onPress={goStage4}></Button>
    </View>
  );
};
