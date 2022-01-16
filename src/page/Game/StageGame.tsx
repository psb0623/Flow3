import * as React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
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

type Props = StageGameStackRouteProp<'StageGame'> &
  StageGameStackNavigationProp;

export const StageGame = ({
  navigation,
  route: {
    params: {gameType, beforeGameStageNumber},
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
    console.log(stage?.length, beforeGameStageNumber);
    if (stage != null && beforeGameStageNumber != undefined) {
      if (stage.length <= beforeGameStageNumber) {
        navigation.push('StageGameSuccess', {
          gameType: gameType,
        });
      }
    }
  });

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
