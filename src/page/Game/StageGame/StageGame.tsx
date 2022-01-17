import * as React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StageGameScene} from './StageGameScene';
import {
  StageGameStackNavigationProp,
  StageGameStackRouteProp,
} from '../../stack/StageGameStack';
import {Stage} from './Stage';
import {stageService} from '../../../api';
import {FlatGrid} from 'react-native-super-grid';
import {StageStartButton} from '../../../components/StageStartButton';
import {stageRepository} from '../../../repository/StageRepository';
import {useIsFocused} from '@react-navigation/native';

type Props = StageGameStackRouteProp<'StageGame'> &
  StageGameStackNavigationProp;

export const StageGame = ({
  navigation,
  route: {
    params: {gameType, beforeGameStageNumber},
  },
}: Props) => {
  const isFocused = useIsFocused();
  const [stage, setStage] = useState<Stage[] | null>(null);
  const [lastStage, setLastStage] = useState<number>(0);
  const goStageGameScene = useCallback((gameStageNumber: number) => {
    navigation.push('StageGameScene', {
      gameStageNumber,
      gameType,
    });
  }, []);

  useLayoutEffect(() => {
    if (stage != null && beforeGameStageNumber != undefined) {
      if (stage.length <= beforeGameStageNumber) {
        navigation.push('StageGameSuccess', {
          gameType: gameType,
        });
      }
    }
  });

  useLayoutEffect(() => {
    if (isFocused) {
      (async () => {
        if (gameType === 'Three') {
          const value = await stageRepository.getLastClearStage3();
          setLastStage(value);
        }

        if (gameType === 'Four') {
          const value = await stageRepository.getLastClearStage4();
          setLastStage(value);
        }
      })();
    }
  }, [isFocused, gameType]);

  useLayoutEffect(() => {
    if (gameType === 'Three') {
      (async () => {
        const {data} = await stageService.getStage3();
        setStage(data);
      })();
    }

    if (gameType === 'Four') {
      (async () => {
        const {data} = await stageService.getStage4();
        setStage(data);
      })();
    }
    return () => {
      setStage(null);
    };
  }, [gameType]);
  return (
    <View style={styles.container}>
      {stage && (
        <FlatGrid
          centerContent={true}
          data={stage}
          renderItem={({index}) => (
            <StageStartButton
              enable={index <= lastStage}
              key={index}
              title={index.toString()}
              onPressed={() => {
                goStageGameScene(index);
              }}
            />
          )}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
