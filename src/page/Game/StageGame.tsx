import * as React from 'react';
import {SafeAreaView, View} from 'react-native';
import {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StageGameScene} from './StageGameScene';
import {
  StageGameStackNavigationProp,
  StageGameStackRouteProp,
} from '../stack/StageGameStack';
import {Stage} from './Stage';
import {stageService} from '../../api';
import {FlatGrid} from 'react-native-super-grid';
import {StageStartButton} from '../../components/StageStartButton';
import {BackButton} from '../../components/BackButton';

type Props = StageGameStackRouteProp<'StageGame'> &
  StageGameStackNavigationProp;

export const StageGame = ({
  navigation,
  route: {
    params: {gameType},
  },
}: Props) => {
  const [stage, setStage] = useState<Stage[] | null>(null);

  const goStageGameScene = useCallback((gameStageNumber: number) => {
    navigation.push('StageGameScene', {
      gameStageNumber,
      gameType,
    });
  }, []);

  useLayoutEffect(() => {
    if (gameType === 'Three') {
      (async () => {
        const {data} = await stageService.getStage3();
        console.log(data);
        setStage(data);
      })();
    }

    if (gameType === 'Four') {
      (async () => {
        const {data} = await stageService.getStage4();
        console.log(data);
        setStage(data);
      })();
    }

    return () => {
      setStage(null);
    };
  }, [gameType]);

  return (
    <SafeAreaView>
      {stage && (
        <FlatGrid
          data={stage}
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
      )}
    </SafeAreaView>
  );
};
