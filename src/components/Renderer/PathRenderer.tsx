// @flow
import * as React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  AnimateProps,
  useAnimatedProps,
} from 'react-native-reanimated';
import Svg, {Color, NumberProp, Path} from 'react-native-svg';
import {SharedValue} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper';
const AnimatedPath = Animated.createAnimatedComponent(Path);

type Props = {
  color: string;
  fill?: Color;
  strokeWidth?: NumberProp;
  selectedIndexes: SharedValue<any>;
  patternPoints: SharedValue<any>;
  opacity: Animated.Value<number>;
};

export const PathRenderer = ({
  color,
  fill,
  strokeWidth,
  selectedIndexes,
  patternPoints,
  opacity,
}: Props) => {
  const animatedProps = useAnimatedProps(() => {
    let d = '';
    selectedIndexes.value.forEach((idx) => {
      if (patternPoints.value != null) {
        d += !d ? ' M' : ' L';
        d += ` ${patternPoints?.value[idx].x},${patternPoints.value[idx].y}`;
      }
    });
    if (!d) d = 'M-1,-1';
    return {d};
  });
  return (
    <Svg style={styles.svg} width="100%" height="100%">
      <AnimatedPath
        fill={fill}
        strokeWidth={strokeWidth}
        animatedProps={animatedProps}
        stroke={color}
        opacity={opacity}
      />
    </Svg>
  );
};

PathRenderer.defaultProps = {
  fill: 'none',
  strokeWidth: 3,
  opacity: undefined,
  color: '#8E91A8',
};

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
