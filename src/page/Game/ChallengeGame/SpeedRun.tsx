// @flow
import * as React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {PatternModule} from '../PatternModule/PatternModule';
import {PatternRandomGenerator} from '../PatternRandomGenerator';
import {ChallengeGameStackNavigationProp} from '../../stack/ChallengeGameStack';
import {Modal} from 'react-native';
import {ProgressBar} from 'react-native-paper';

const timeReduceRatio = 0.95;

type Props = {} & ChallengeGameStackNavigationProp;
export const SpeedRun = ({navigation}: Props) => {
  const patternGenerator = useRef(new PatternRandomGenerator(3, 3));
  const [maxSecond, setMaxSecond] = useState<number>(10);
  const timeStarted = useRef(Date.now());
  const [duration, setDuration] = useState<number>();
  const [answerCount, setAnswerCount] = useState<number>(0);
  const [answerIndices, setAnswerIndices] = useState<number[]>(
    patternGenerator.current.generate(),
  );
  const [progress, setProgress] = useState(1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const interval = useRef<any>();

  useEffect(() => {
    if (duration == null) {
      setProgress(1);
    } else {
      setProgress(duration / (maxSecond * 1000));
    }
  }, [maxSecond, duration]);

  useEffect(() => {
    interval.current = setInterval(() => {
      const leftTime = timeStarted.current + maxSecond * 1000 - Date.now();
      if (leftTime < 0) {
        setDuration(0);
        clearInterval(interval.current);
        setModalVisible(true);
      } else {
        setDuration(leftTime);
      }
    }, 500);

    return () => {
      clearInterval(interval.current);
    };
  }, [timeStarted.current]);

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} color="#49B5F2" />
      <View style={styles.header}>
        <View style={styles.countLayout}>
          <Text style={styles.count}>{answerCount}</Text>
        </View>
      </View>
      <View style={styles.patternRendererContainer}>
        <View style={styles.patternRendererLayout}>
          <PatternModule
            answerIndices={answerIndices}
            onSuccess={() => {
              if (!modalVisible) {
                setMaxSecond(Math.max(maxSecond * timeReduceRatio, 2));
                timeStarted.current = Date.now();
                setAnswerIndices(patternGenerator.current.generate());
                setAnswerCount((count) => (count as number) + 1);
              }
            }}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onShow={() => {
          clearInterval(interval.current);
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
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
  container: {},
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
    flex: 1,
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
