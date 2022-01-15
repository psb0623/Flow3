import React, {useEffect, useRef, useState} from 'react';
import ReactNative, {StyleSheet, View, Text, Vibration} from 'react-native';
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  Easing,
  EasingNode,
  runOnJS,
  runOnUI,
  sqrt,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
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
}

export function Pattern(props: PropsType) {
  const [isError, setIsError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const selectAnim = Array(props.rowCount * props.columnCount)
    .fill(0)
    .map((_, idx) => useSharedValue<number>(1));

  const testAnim = useSharedValue<number>(1);

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
      duration: 1000,
      easing: EasingNode.linear,
    }).start();
  };

  const canTouch = useSharedValue(true);
  const patternPoints = useSharedValue<Point[] | null>(null);
  const selectedIndexes = useSharedValue<number[]>([]);
  const endPoint = useSharedValue<Point | null>(null);
  const containerLayout = useSharedValue({width: 0, height: 0, min: 0});
  const R = useDerivedValue(
    () =>
      (containerLayout.value.min / props.rowCount - props.patternMargin * 2) /
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
      canTouch.value = false;
      if (!props.onCheck(res)) {
        selectAnim.forEach((v, idx) => {
          v.value = withDelay(
            selectedIndexes.value.findIndex((v) => v === idx) * 100,
            withSpring(1),
          );
        });

        setIsError(true);
        fadeOut();

        const closeError = () => setIsError(false);
        runOnUI(() => {
          cancelAnimation(msgX);

          //修复iOS上原地spring不动的问题。
          msgX.value = withSpring(
            msgX.value === 0 ? 0.1 : 0,
            {
              stiffness: 2000,
              damping: 10,
              mass: 1,
              velocity: 2000,
            },
            (finished) => {
              runOnJS(closeError)();
              canTouch.value = true;
              selectedIndexes.value = [];
            },
          );
        })();
      } else {
        setIsError(false);
        setTimeout(() => {
          selectedIndexes.value = [];
          canTouch.value = true;
        }, 1000);
      }
    }
  };
  const panHandler: (event: GestureEvent<any>) => void =
    useAnimatedGestureHandler({
      onStart: (evt) => {
        if (
          canTouch.value &&
          patternPoints.value &&
          selectedIndexes.value.length === 0
        ) {
          const selected: number[] = [];
          patternPoints.value.every((p, idx) => {
            if (
              (p.x - evt.x) * (p.x - evt.x) + (p.y - evt.y) * (p.y - evt.y) <
              R.value * R.value
            ) {
              selected.push(idx);
              selectAnim[idx].value = withSpring(2);
              runOnJS(Vibration.vibrate)(10);
              runOnJS(fadeIn)();
              return false;
            }
            return true;
          });
          selectedIndexes.value = selected;
        }
      },
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
                selectedIndexes.value = [...selectedIndexes.value, idx];
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
      },
      onEnd: (evt) => {
        if (!canTouch.value) return;
        endPoint.value = null;
        //testAnim.value = 0;
        if (selectedIndexes.value.length > 0)
          runOnJS(onEndJS)(selectedIndexes.value.join(''));
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
            <View style={styles.msgc}>
              <Animated.Text style={[msgColor, msgStyle]}>
                {props.message}
              </Animated.Text>
            </View>
            <Animated.View style={cvc} onLayout={onPatternLayout}>
              {Array(props.rowCount * props.columnCount)
                .fill(0)
                .map((_, idx) => {
                  const patternColor = useDerivedValue(() => {
                    if (selectedIndexes.value.findIndex((v) => v === idx) < 0) {
                      return props.inactiveColor;
                    } else if (isError) {
                      return props.errorColor;
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
                strokeWidth={3}
                animatedProps={animatedProps}
                stroke={isError ? props.errorColor : props.activeColor}
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
  patternMargin: 25,
  inactiveColor: '#8E91A8',
  activeColor: '#5FA8FC',
  errorColor: '#D93609',
  onCheck: () => false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  msgc: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  svg: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
