// @flow
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {PatternModule} from '../PatternModule/PatternModule';
import {
  PublicGameStackNavigationProp,
  PublicGameStackRouteProp,
} from '../../stack/PublicGameStack';
import {useCallback} from 'react';
import {authService, patternService} from '../../../api';

type Props = {} & PublicGameStackNavigationProp &
  PublicGameStackRouteProp<'PublicGameScene'>;

export const SharePatternScene = ({
  navigation,
  route: {
    params: {pattern},
  },
}: Props) => {
  const onSuccess = useCallback(() => {
    (async () => {
      navigation.pop();
      await patternService.solvePublicPattern(pattern.id);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <PatternModule
        answerIndices={pattern.answer.split('').map((value) => parseInt(value))}
        onSuccess={() => {
          onSuccess();
        }}></PatternModule>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
