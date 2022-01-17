// @flow
import * as React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {PatternModule} from '../PatternModule/PatternModule';
import {PatternRandomGenerator} from '../PatternRandomGenerator';
import {
  ChallengeGameStackNavigationProp,
  ChallengeGameStackRouteProp,
} from '../../stack/ChallengeGameStack';
import {Modal} from 'react-native';
import {useCountDown} from '../../../hook/useCountDown';
import {rankingRepository} from '../../../repository/RankingRepository';
import {randomGeneratorService} from '../../../api';

const timeReduceRatio = 0.97;

type Props = {} & ChallengeGameStackNavigationProp &
  ChallengeGameStackRouteProp<'SpeedRun'>;

export const SpeedRun = ({
  navigation,
  route: {
    params: {difficulty},
  },
}: Props) => {
  const [maxSecond, setMaxSecond] = useState<number>(10);
  const [answerCount, setAnswerCount] = useState<number>(0);
  const [answerIndices, setAnswerIndices] = useState<number[] | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (difficulty === 'High') {
        const randomPattern = await randomGeneratorService.getRandomPattern(2);
        setAnswerIndices(randomPattern.data);
      }

      if (difficulty === 'Low') {
        const randomPattern = await randomGeneratorService.getRandomPattern(0);
        setAnswerIndices(randomPattern.data);
      }

      if (difficulty === 'Intermediate') {
        const randomPattern = await randomGeneratorService.getRandomPattern(1);
        setAnswerIndices(randomPattern.data);
      }
    })();
  }, []);

  const onCountDown = useCallback(() => {
    if (difficulty === 'High') {
      rankingRepository.setHighRank(answerCount);
    }

    if (difficulty === 'Low') {
      rankingRepository.setLowRank(answerCount);
    }

    if (difficulty === 'Intermediate') {
      rankingRepository.setIntermediateRank(answerCount);
    }
    setModalVisible(true);
  }, [difficulty, answerCount]);

  const {countDownElement, countDownInit} = useCountDown(
    maxSecond,
    onCountDown,
  );

  return (
    <View style={styles.container}>
      {countDownElement}
      <View style={styles.header}>
        <View style={styles.countLayout}>
          <Text style={styles.count}>{answerCount}</Text>
        </View>
      </View>
      <View style={styles.patternRendererContainer}>
        <View style={styles.patternRendererLayout}>
          {answerIndices && (
            <PatternModule
              answerIndices={answerIndices}
              onSuccess={() => {
                if (!modalVisible) {
                  (async () => {
                    setMaxSecond(Math.max(maxSecond * timeReduceRatio, 2));
                    setAnswerCount((count) => (count as number) + 1);
                    countDownInit(Math.max(maxSecond * timeReduceRatio, 2));
                    if (difficulty === 'High') {
                      const randomPattern =
                        await randomGeneratorService.getRandomPattern(2);
                      setAnswerIndices(randomPattern.data);
                    }

                    if (difficulty === 'Low') {
                      const randomPattern =
                        await randomGeneratorService.getRandomPattern(0);
                      setAnswerIndices(randomPattern.data);
                    }

                    if (difficulty === 'Intermediate') {
                      const randomPattern =
                        await randomGeneratorService.getRandomPattern(1);
                      setAnswerIndices(randomPattern.data);
                    }
                  })();
                }
              }}
              row={3}
              column={3}
            />
          )}
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Answer : {answerCount}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                navigation.pop();
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>종료</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  timeLayout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countLayout: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    textAlign: 'center',
    fontSize: 40,
  },
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
  header: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
