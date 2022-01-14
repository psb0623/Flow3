import * as React from 'react';
import {SafeAreaView, StyleSheet, Button} from 'react-native';
import {BackButton} from '../../components/BackButton';
import {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  StageGameStackNavigationProp,
  StageGameStackRouteProp,
} from '../stack/StageGameStack';
import {Pattern} from './Pattern/Pattern';
import {stageService} from '../../api';
import {Stage} from './Stage';
import {PatternRenderer} from '../../components/PatternRenderer/PatternRenderer';

type Props = StageGameStackNavigationProp &
  StageGameStackRouteProp<'StageGameScene'>;

export const StageGameScene = ({
  navigation,
  route: {
    params: {gameStageNumber, gameType},
  },
}: Props) => {
  const [stage, setStage] = useState<Stage | null>(null);

  const goNextGameStage = useCallback((gameStageNumber) => {
    navigation.navigate('StageGameScene', {
      gameStageNumber: gameStageNumber,
      gameType: gameType,
    });
  }, []);

  useLayoutEffect(() => {
    (async () => {
      if (gameType == 'Three') {
        const {data} = await stageService.getStage3Detail(
          gameStageNumber.toString(),
        );
        setStage(data);
      }

      if (gameType == 'Four') {
        const {data} = await stageService.getStage4Detail(
          gameStageNumber.toString(),
        );
        setStage(data);
      }
    })();
  }, [gameStageNumber, gameType]);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} />
      <Button
        title={'next'}
        onPress={() => {
          goNextGameStage(gameStageNumber + 1);
        }}
      />
      <Pattern
        onCheck={(res) => {
          return false;
        }}
        rowCount={3}
        activeColor={'#8E91A8'}
        columnCount={3}
        errorColor={'#D93609'}
        patternMargin={25}
        inactiveColor={'#8E91A8'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
