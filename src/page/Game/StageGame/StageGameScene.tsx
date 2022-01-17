import * as React from 'react';
import {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  StageGameStackNavigationProp,
  StageGameStackRouteProp,
} from '../../stack/StageGameStack';
import {stageService} from '../../../api';
import {Stage} from './Stage';
import {PatternModule} from '../PatternModule/PatternModule';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  stageRepository,
  StageRepository,
} from '../../../repository/StageRepository';

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
    if (stage != null && stage.answer != null) {
      const answer = stage.answer;
      const answerLen = answer.length;
      const _selectedIndices: number[] = [];

      const hexcharToDec = (c: string) => {
        if (
          '0'.charCodeAt(0) <= c.charCodeAt(0) &&
          c.charCodeAt(0) <= '9'.charCodeAt(0)
        )
          return c.charCodeAt(0) - '0'.charCodeAt(0);
        else return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
      };

      for (let i = 0; i < answerLen; i++) {
        _selectedIndices.push(hexcharToDec(answer[i]));
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
      <>
        <Pressable
          style={[
            styles.button,
            {
              borderRadius: 25,
              display: 'flex',
              flexDirection: 'row',
              margin: 10,
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
            },
          ]}>
          <Image source={require('./eletronic.png')} />
          <Text style={styles.textStyle}>3</Text>
        </Pressable>
        <View
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.patternRendererContainer}>
            <View
              style={[
                styles.patternRendererLayout,
                {
                  width: gameType === 'Three' ? '80%' : '100%',
                },
              ]}>
              <PatternModule
                row={gameType === 'Three' ? 3 : 4}
                column={gameType === 'Three' ? 3 : 4}
                answerIndices={selectedIndices}
                onSuccess={async () => {
                  if (gameType === 'Three') {
                    await stageRepository.saveLastClearStage3(
                      gameStageNumber + 1,
                    );
                  }
                  if (gameType === 'Four') {
                    await stageRepository.saveLastClearStage4(
                      gameStageNumber + 1,
                    );
                  }
                  goNextGameStage(gameStageNumber + 1);
                }}
              />
            </View>
          </View>
        </View>
      </>
    )
  );
};

const styles = StyleSheet.create({
  patternRendererLayout: {
    width: '80%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  patternRendererContainer: {
    width: '100%',
    height: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintLayout: {
    margin: 10,
  },
  button: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
