import * as React from 'react';
import {SafeAreaView, StyleSheet, Button, View} from 'react-native';
import {BackButton} from '../../components/BackButton';
import {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  StageGameStackNavigationProp,
  StageGameStackRouteProp,
} from '../stack/StageGameStack';
import {normalize, Pattern} from './Pattern/Pattern';
import {stageService} from '../../api';
import {Stage} from './Stage';
import {PatternRenderer} from '../../components/Renderer/PatternRenderer';

type Props = StageGameStackNavigationProp &
  StageGameStackRouteProp<'StageGameScene'>;

export const StageGameScene = ({
  navigation,
  route: {
    params: {gameStageNumber, gameType},
  },
}: Props) => {
  const [stage, setStage] = useState<Stage | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<Array<number> | null>(
    null,
  );

  const goNextGameStage = useCallback((gameStageNumber) => {
    navigation.navigate('StageGameScene', {
      gameStageNumber: gameStageNumber,
      gameType: gameType,
    });
  }, []);

  const onCheck = useCallback(
    (res: string) => {
      if (normalize(selectedIndices, 3, 3) === res) {
        return true;
      }
      return false;
    },
    [selectedIndices],
  );

  useLayoutEffect(() => {
    (async () => {
      try {
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
      } catch (e) {
        navigation.navigate('StageGame', {
          gameType,
          beforeGameStageNumber: gameStageNumber + 1,
        });
      }
    })();
  }, [gameStageNumber, gameType]);

  useEffect(() => {
    if (stage != null && stage.answer != null) {
      const answer = stage.answer;
      const answerLen = answer.length;
      const _selectedIndices: number[] = [];
      for (let i = 0; i < answerLen; i++) {
        _selectedIndices.push(answer.charCodeAt(i) - '0'.charCodeAt(0));
      }
      setSelectedIndices(_selectedIndices);
    }
  }, [stage]);

  useEffect(() => {
    return () => {
      setStage(null);
      setSelectedIndices(null);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {selectedIndices && (
        <View style={styles.patternRendererContainer}>
          <View style={styles.patternRendererLayout}>
            <PatternRenderer
              selectedIndexes={selectedIndices}
              columnCount={3}
              rowCount={3}
            />
          </View>
        </View>
      )}
      <View style={styles.patternLayout}>
        <Pattern
          onSuccess={() => {
            goNextGameStage(gameStageNumber + 1);
          }}
          onCheck={onCheck}
          rowCount={3}
          activeColor={'#8E91A8'}
          columnCount={3}
          errorColor={'#D93609'}
          patternMargin={25}
          inactiveColor={'#8E91A8'}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  patternRendererContainer: {
    width: '100%',
    height: '30%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  patternRendererLayout: {
    width: '100%',
    height: '100%',
  },
  patternLayout: {
    width: '100%',
    height: '70%',
  },
});
