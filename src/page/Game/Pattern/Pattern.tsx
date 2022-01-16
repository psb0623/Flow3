import React, {useEffect, useRef, useState} from 'react';
import ReactNative, {StyleSheet, View, Text, Vibration} from 'react-native';
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  EasingNode,
  runOnJS,
  runOnUI,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
import {Point} from './Point';
import {GestureEvent} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface PropsType {
  message: string;
  rowCount: number;
  errorColor: string;
  columnCount: number;
  activeColor: string;
  inactiveColor: string;
  patternMargin: number;
  onCheck?: (res: string) => boolean;
  onSuccess: () => void;
  successColor: string;
}

export const normalize = (
  path: number[] | null,
  rowCount: number,
  columnCount: number,
) => {
  if (path === null) return 'hello';
  let normPath: number[] = [path[0]];
  for (let i = 1; i < path.length; i++) {
    let p = path[i - 1];
    let c = path[i];

    let px = p % columnCount,
      py = (p / rowCount) >> 0;
    let cx = c % columnCount,
      cy = (c / rowCount) >> 0;
    let inc = py < cy,
      jnc = px < cx;
    for (let i = py; i != cy + (inc ? 1 : -1); inc ? i++ : i--) {
      for (let j = px; j != cx + (jnc ? 1 : -1); jnc ? j++ : j--) {
        if (i == py && j == px) continue;
        if (i == cy && j == cx) continue;
        if ((j - px) * (cy - i) == (i - py) * (cx - j)) {
          normPath.push(i * rowCount + j);
        }
      }
    }
    normPath.push(c);
  }
  const ret = Array.from(Array(rowCount * columnCount), () =>
    Array(rowCount * columnCount).fill(0),
  );

  for (let i = 1; i < normPath.length; i++) {
    ret[normPath[i - 1]][normPath[i]] = 1;
    ret[normPath[i]][normPath[i - 1]] = 1;
  }

  let res = ret
    .map((v: Array<number>) => {
      return v.join('');
    })
    .join('\n');
  //console.log(res);
  return res;
};

export function Pattern(props: PropsType) {
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const selectAnim = Array(props.rowCount * props.columnCount)
    .fill(0)
    .map((_, idx) => useSharedValue<number>(1));

  const testAnim = useSharedValue<number>(1);

  const lineWidthAnim = useRef(new Animated.Value(3)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10,
      easing: EasingNode.linear,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 700,
      easing: EasingNode.linear,
    }).start();
  };

  const lineBig = () => {
    Animated.spring(lineWidthAnim, {
      stiffness: 400,
      mass: 1,
      damping: 15,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
      toValue: 6,
    }).start();
  };

  const lineSmall = () => {
    Animated.spring(lineWidthAnim, {
      stiffness: 400,
      mass: 1,
      damping: 15,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
      toValue: 3,
    }).start();
  };

  const canTouch = useSharedValue(true);
  const patternPoints = useSharedValue<Point[] | null>(null);
  const selectedIndexes = useSharedValue<number[]>([]);

  const normalizedPath = useSharedValue<number[]>([]);

  const endPoint = useSharedValue<Point | null>(null);
  const containerLayout = useSharedValue({width: 0, height: 0, min: 0});
  const R = useDerivedValue(
    () =>
      (containerLayout.value.min / props.columnCount -
        props.patternMargin * 2) /
      2,
  );
  const cvc = useAnimatedStyle(() => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: `${
      Math.max(
        0,
        containerLayout.value.height / containerLayout.value.width - 1.25,
      ) * 50
    }%`,
    width: containerLayout.value.min,
    height: containerLayout.value.min,
  }));
  const msgX = useSharedValue(0);
  const msgColor = {color: isError ? props.errorColor : props.activeColor};
  const msgStyle = useAnimatedStyle(() => {
    return {transform: [{translateX: msgX.value}]};
  });
  const onContainerLayout = ({
    nativeEvent: {
      layout: {x, y, width, height},
    },
  }) =>
    (containerLayout.value = {
      width,
      height,
      min: Math.min(width, height),
    });
  const onPatternLayout = ({nativeEvent: {layout}}) => {
    const points: Array<Point> = [];
    for (let i = 0; i < props.rowCount; i++) {
      for (let j = 0; j < props.columnCount; j++) {
        points.push({
          x: layout.x + (layout.width / props.columnCount) * (j + 0.5),
          y: layout.y + (layout.height / props.rowCount) * (i + 0.5),
        });
      }
    }
    patternPoints.value = points;
  };
  const onEndJS = (res) => {
    if (props.onCheck) {
      const unselect = () => {
        selectAnim.forEach((v, idx) => {
          v.value = withDelay(
            (selectedIndexes.value.findIndex((v) => v === idx) * 900) /
              (props.rowCount * props.columnCount),
            withSpring(1),
          );
        });
        fadeOut();
      };

      //console.log(
      //  normalize(selectedIndexes.value, props.rowCount, props.columnCount),
      //);

      canTouch.value = false;
      if (
        !props.onCheck(
          normalize(selectedIndexes.value, props.rowCount, props.columnCount),
        )
      ) {
        unselect();
        setIsError(true);

        const closeError = () => setIsError(false);
        runOnUI(() => {
          cancelAnimation(msgX);

          //修复iOS上原地spring不动的问题。
          msgX.value = withSpring(
            msgX.value === 0 ? 0.1 : 0,
            {
              stiffness: 2000,
              damping: 100,
              mass: 1,
              velocity: 2000,
            },
            (finished) => {},
          );
          setTimeout(() => {
            if (!canTouch.value) {
              runOnJS(closeError)();
              canTouch.value = true;
              selectedIndexes.value = [];
            }
          }, 700);
        })();
      } else {
        lineBig();
        setIsError(false);
        setSuccess(true);

        setTimeout(() => {
          lineSmall();
          unselect();
          props.onSuccess();
          selectedIndexes.value = [];
          setSuccess(false);
          canTouch.value = true;
        }, 500);
      }
    }
  };
  const panHandler: (event: GestureEvent<any>) => void =
    useAnimatedGestureHandler({
      onStart: (evt) => {},
      onActive: (evt) => {
        if (
          canTouch.value &&
          patternPoints.value &&
          selectedIndexes.value.length > 0
        ) {
          patternPoints.value.every((p, idx) => {
            if (
              (p.x - evt.x) * (p.x - evt.x) + (p.y - evt.y) * (p.y - evt.y) <
              R.value * R.value
            ) {
              if (selectedIndexes.value.indexOf(idx) < 0) {
                let p = selectedIndexes.value[selectedIndexes.value.length - 1];
                let c = idx;
                let px = p % props.columnCount;
                let py = (p / props.rowCount) >> 0;
                let cx = c % props.columnCount;
                let cy = (c / props.rowCount) >> 0;

                let inc = py < cy;
                let jnc = px < cx;

                for (let i = py; i != cy + (inc ? 1 : -1); inc ? i++ : i--) {
                  for (let j = px; j != cx + (jnc ? 1 : -1); jnc ? j++ : j--) {
                    if (i == py && j == px) continue;
                    if (i == cy && j == cx) continue;
                    if ((j - px) * (cy - i) == (i - py) * (cx - j)) {
                      if (
                        selectedIndexes.value.indexOf(i * props.rowCount + j) <
                        0
                      ) {
                        selectedIndexes.value = [
                          ...selectedIndexes.value,
                          i * props.rowCount + j,
                        ];
                        selectAnim[i * props.rowCount + j].value =
                          withSpring(2);
                      }
                      normalizedPath.value = [
                        ...normalizedPath.value,
                        i * props.rowCount + j,
                      ];
                      //console.log(`inter : ${i}, ${j}`);
                    }
                  }
                }

                selectedIndexes.value = [...selectedIndexes.value, idx];
                normalizedPath.value = [...normalizedPath.value, idx];
                selectAnim[idx].value = withSpring(2);
                cancelAnimation(testAnim);
                testAnim.value = 1;
                testAnim.value = withSpring(0);
                runOnJS(Vibration.vibrate)(10);
              }
              return false;
            }
            return true;
          });
          endPoint.value = {x: evt.x, y: evt.y};
        }

        if (!canTouch.value && !success) {
          runOnJS(setIsError)(false);
          canTouch.value = true;
          selectedIndexes.value = [];
        }
        if (
          canTouch.value &&
          patternPoints.value &&
          selectedIndexes.value.length === 0
        ) {
          const selected: number[] = [];
          const normPath: number[] = [];
          patternPoints.value.every((p, idx) => {
            if (
              (p.x - evt.x) * (p.x - evt.x) + (p.y - evt.y) * (p.y - evt.y) <
              R.value * R.value
            ) {
              selected.push(idx);
              normPath.push(idx);
              selectAnim[idx].value = withSpring(2);
              runOnJS(Vibration.vibrate)(10);
              runOnJS(fadeIn)();
              return false;
            }
            return true;
          });
          selectedIndexes.value = selected;
          normalizedPath.value = normPath;
        }
      },
      onEnd: (evt) => {
        if (!canTouch.value) return;
        endPoint.value = null;
        //testAnim.value = 0;
        if (selectedIndexes.value.length > 0) {
          //console.log(normalizedPath.value);
          //runOnJS(console.log)(normalize(selectedIndexes.value));
          runOnJS(onEndJS)(selectedIndexes.value.join(''));
        }
      },
    });
  const animatedProps = useAnimatedProps(() => {
    let d = '';
    selectedIndexes.value.forEach((pos, idx) => {
      if (patternPoints.value != null) {
        if (!d) {
          d += ' M';
          d += ` ${patternPoints?.value[pos].x},${patternPoints.value[pos].y}`;
        } else if (idx == selectedIndexes.value.length - 1) {
          let mx =
            (patternPoints?.value[pos].x +
              patternPoints?.value[selectedIndexes.value[idx - 1]].x) /
            2;
          let my =
            (patternPoints?.value[pos].y +
              patternPoints?.value[selectedIndexes.value[idx - 1]].y) /
            2;
          let dx =
            (patternPoints?.value[pos].x -
              patternPoints?.value[selectedIndexes.value[idx - 1]].x) /
            2;
          let dy =
            (patternPoints?.value[pos].y -
              patternPoints?.value[selectedIndexes.value[idx - 1]].y) /
            2;

          let ndx = dx / Math.sqrt(dx * dx + dy * dy);
          let ndy = dy / Math.sqrt(dx * dx + dy * dy);

          let vx = mx - 20 * ndy * testAnim.value;
          let vy = my + 20 * ndx * testAnim.value;

          d += ' Q';
          d += ` ${vx},${vy}, ${patternPoints?.value[pos].x},${patternPoints.value[pos].y}`;
        } else {
          d += ' L';
          d += ` ${patternPoints?.value[pos].x},${patternPoints.value[pos].y}`;
        }
        //d += !d ? ' M' : ' L';
        //d += ` ${patternPoints?.value[idx].x},${patternPoints.value[idx].y}`;
      }
    });
    if (d && endPoint.value) d += ` L ${endPoint.value.x},${endPoint.value.y}`;
    if (!d) d = 'M-1,-1';
    return {d};
  });

  return (
    <PanGestureHandler onGestureEvent={panHandler}>
      <Animated.View style={styles.container} onLayout={onContainerLayout}>
        <TapGestureHandler onGestureEvent={panHandler}>
          <Animated.View style={styles.container}>
            <Animated.View style={cvc} onLayout={onPatternLayout}>
              {Array(props.rowCount * props.columnCount)
                .fill(0)
                .map((_, idx) => {
                  const patternColor = useDerivedValue(() => {
                    if (selectedIndexes.value.findIndex((v) => v === idx) < 0) {
                      return props.inactiveColor;
                    } else if (isError) {
                      return props.errorColor;
                    } else if (success) {
                      return props.successColor;
                    } else {
                      return props.activeColor;
                    }
                  });
                  const outer = useAnimatedStyle(() => {
                    return {
                      borderWidth: 0,
                      width: 2 * R.value,
                      height: 2 * R.value,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: patternColor.value,
                      borderRadius: 2 * R.value,
                      margin: props.patternMargin,
                    };
                  });
                  const inner = useAnimatedStyle(() => {
                    return {
                      width: R.value * 0.4 * selectAnim[idx].value,
                      height: R.value * 0.4 * selectAnim[idx].value,
                      borderRadius: R.value * 0.4,
                      backgroundColor: patternColor.value,
                    };
                  });
                  return (
                    <Animated.View key={idx} style={outer}>
                      <Animated.View style={inner} />
                    </Animated.View>
                  );
                })}
            </Animated.View>
            <Svg style={styles.svg} width="100%" height="100%">
              <AnimatedPath
                fill="none"
                strokeLinejoin="round"
                strokeWidth={lineWidthAnim}
                animatedProps={animatedProps}
                stroke={
                  isError
                    ? props.errorColor
                    : success
                    ? props.successColor
                    : props.activeColor
                }
                opacity={fadeAnim}
              />
            </Svg>
          </Animated.View>
        </TapGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
}

Pattern.defaultProps = {
  message: '',
  rowCount: 3,
  columnCount: 3,
  patternMargin: 0,
  inactiveColor: '#8E91A8',
  activeColor: '#5FA8FC',
  errorColor: '#D93609',
  successColor: 'green',
  onCheck: () => false,
  onSuccess: () => {},
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  svg: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
