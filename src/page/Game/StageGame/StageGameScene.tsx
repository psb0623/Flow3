import * as React from 'react';
import {SafeAreaView, StyleSheet, Button, View} from 'react-native';
import {BackButton} from '../../../components/BackButton';
import {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  StageGameStackNavigationProp,
  StageGameStackRouteProp,
} from '../../stack/StageGameStack';
import {Pattern} from '../Pattern/Pattern';
import {stageService} from '../../../api';
import {Stage} from './Stage';
import {PatternRenderer} from '../../../components/Renderer/PatternRenderer';
import {PatternModule} from '../PatternModule/PatternModule';

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
    if (stage != null) {
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
    selectedIndices && (
      <PatternModule
        answerIndices={selectedIndices}
        onSuccess={() => {
          goNextGameStage(gameStageNumber + 1);
        }}
      />
    )
  );
};
