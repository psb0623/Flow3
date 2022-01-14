import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
import {Point} from '../../page/Game/Pattern/Point';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface PropsType {
  selectedIndexes: number[];
  rowCount: number;
  columnCount: number;
  patternMargin: number;
  inactiveColor: string;
}

export const PatternRenderer = ({
  selectedIndexes: _selectedIndexes,
  rowCount,
  patternMargin,
  columnCount,
  inactiveColor,
}: PropsType) => {
  const selectedIndexes = useSharedValue<number[]>([]);
  const containerLayout = useSharedValue({width: 0, height: 0, min: 0});
  const patternPoints = useSharedValue<Point[] | null>(null);
  const R = useDerivedValue(
    () => (containerLayout.value.min / rowCount - patternMargin * 2) / 2,
  );

  useEffect(() => {
    selectedIndexes.value = _selectedIndexes;
  }, [_selectedIndexes]);

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
    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < columnCount; j++) {
        points.push({
          x: layout.x + (layout.width / columnCount) * (j + 0.5),
          y: layout.y + (layout.height / columnCount) * (i + 0.5),
        });
      }
    }
    patternPoints.value = points;
  };

  const animatedProps = useAnimatedProps(() => {
    let d = '';
    selectedIndexes.value.forEach((idx) => {
      if (patternPoints.value != null) {
        d += !d ? ' M' : ' L';
        d += ` ${patternPoints?.value[idx].x},${patternPoints.value[idx].y}`;
      }
    });
    if (!d) d = 'M-1,-1';
    console.log(d);
    return {d};
  });

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

  return (
    <Animated.View style={styles.container} onLayout={onContainerLayout}>
      <Animated.View style={cvc} onLayout={onPatternLayout}>
        {Array(rowCount * columnCount)
          .fill(0)
          .map((_, idx) => {
            const patternColor = useDerivedValue(() => {
              return inactiveColor;
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
                margin: patternMargin,
              };
            });
            const inner = useAnimatedStyle(() => {
              return {
                width: R.value * 0.4,
                height: R.value * 0.4,
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
          stroke={inactiveColor}
        />
      </Svg>
    </Animated.View>
  );
};

PatternRenderer.defaultProps = {
  patternMargin: 25,
  inactiveColor: '#8E91A8',
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
