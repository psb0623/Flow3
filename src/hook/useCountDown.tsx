// @flow
import * as React from 'react';
import {View} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

type Props = {
  maxSecond: number;
  callback: () => void;
};
export const useCountDown = (maxSecond: number, callback: () => void) => {
  const interval = useRef<any>();
  const [duration, setDuration] = useState<number>(maxSecond * 1000);
  const timeStarted = useRef(Date.now());
  const countDownElement = useMemo(() => {
    return (
      <ProgressBar progress={duration / (maxSecond * 1000)} color="#49B5F2" />
    );
  }, [maxSecond, duration, timeStarted.current]);

  useEffect(() => {
    interval.current = setInterval(() => {
      const leftTime = timeStarted.current + maxSecond * 1000 - Date.now();
      if (leftTime < -500) {
        setDuration(0);
        callback();
        clearInterval(interval.current);
      } else {
        setDuration(leftTime);
      }
    }, 500);

    return () => {
      clearInterval(interval.current);
    };
  }, [timeStarted.current]);

  const countDownInit = useCallback(
    (second: number) => {
      timeStarted.current = Date.now();
      setDuration(second * 1000);
      clearInterval(interval.current);
    },
    [interval, maxSecond],
  );

  return {
    countDownElement,
    countDownInit,
  };
};
