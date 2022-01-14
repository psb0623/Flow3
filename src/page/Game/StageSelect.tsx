// @flow
import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {useCallback} from 'react';
import {StageGameStackNavigationProp} from '../stack/StageGameStack';
import {PatternRenderer} from '../../components/PatternRenderer/PatternRenderer';

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
      <Text>ASdasd</Text>
      <View
        style={{
          width: '75%',
          height: '75%',
        }}>
        <PatternRenderer
          selectedIndexes={[3, 4, 5]}
          columnCount={3}
          rowCount={3}
        />
      </View>
      <Button title={'3'} onPress={goStage3}></Button>
      <Button title={'4'} onPress={goStage4}></Button>
    </View>
  );
};
