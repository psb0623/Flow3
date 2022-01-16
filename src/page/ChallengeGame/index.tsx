// @flow
import * as React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Pattern} from '../Game/Pattern/Pattern';
import {StageStartButton} from '../../components/StageStartButton';
import {PatternRenderer} from '../../components/Renderer/PatternRenderer';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};
export const ChallengeGame = (props: Props) => {
  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <Text>ChallengeGame</Text>
      <Pattern
        onCheck={(res) => {
          return false;
        }}
        rowCount={4}
        activeColor={'#8E91A8'}
        columnCount={4}
        errorColor={'#D93609'}
        patternMargin={25}
        inactiveColor={'#8E91A8'}
      />

      <Text>ChallengeGame end</Text>
    </SafeAreaView>
  );
};
