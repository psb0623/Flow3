import * as React from 'react';
import {Button, FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useCallback, useLayoutEffect, useMemo, useRef} from 'react';
import {StageStartButton} from '../../components/StageStartButton';
import {FlatGrid} from 'react-native-super-grid';
import {AppStackNavigationProp} from '../stack/AppStack';
import {BackButton} from '../../components/BackButton';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {StageGameScene} from './StageGameScene';
import {
  StageGameStackNavigationProp,
  StageGameStackRouteProp,
} from '../stack/StageGameStack';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const Stack = createStackNavigator();

export const StageGame = ({
  navigation,
}: Props & StageGameStackRouteProp & StageGameStackNavigationProp) => {
  const stage = useRef(new Array(100).fill(null));

  const goStageGameScene = useCallback((gameStageNumber: number) => {
    navigation.push('StageGameScene', {gameStageNumber});
  }, []);

  return (
    <View>
      <FlatGrid
        data={stage.current}
        renderItem={({index}) => (
          <StageStartButton
            key={index}
            title={index.toString()}
            onPressed={() => {
              goStageGameScene(index);
            }}
          />
        )}
        keyExtractor={() => {
          return Math.random().toString();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gameContainer: {},
});
