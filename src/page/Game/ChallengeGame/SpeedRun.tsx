// @flow
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Timers from 'timers';
import {useEffect, useRef, useState} from 'react';
import {PatternRenderer} from '../../../components/Renderer/PatternRenderer';
import {PatternModule} from '../PatternModule/PatternModule';
import {PatternRandomGenerator} from '../PatternRandomGenerator';

const maxSecond = 120;

type Props = {};
export const SpeedRun = (props: Props) => {
  const patternGenerator = useRef(new PatternRandomGenerator(3, 3));
  const timeStarted = useRef(Date.now());
  const [duration, setDuration] = useState<number>();
  const [answerCount, setAnswerCount] = useState<number>();
  const [answerIndices, setAnswerIndices] = useState<number[]>(
    patternGenerator.current.generate(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const leftTime = timeStarted.current + maxSecond * 1000 - Date.now();
      if (leftTime < 0) {
        setDuration(0);
        clearInterval(interval);
      } else {
        setDuration(leftTime);
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timeLayout}>
          <Text>시간</Text>
          <Text>{((duration ?? 1) / 1000).toFixed()}</Text>
        </View>
        <View style={styles.countLayout}>
          <Text>정답 : </Text>
          {answerCount}
        </View>
      </View>
      <View style={styles.patternRendererContainer}>
        <View style={styles.patternRendererLayout}>
          <PatternModule
            answerIndices={answerIndices}
            onSuccess={() => {
              setAnswerIndices(patternGenerator.current.generate());
            }}
          />
        </View>
      </View>
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
  countLayout: {},
  patternRendererLayout: {
    width: '80%',
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
  },
});
