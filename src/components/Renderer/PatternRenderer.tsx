import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {Point} from '../../page/Game/Pattern/Point';
import {PathRenderer} from './PathRenderer';
import {SharedValue} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper';

interface PropsType {
  selectedIndexes: number[];
  rowCount: number;
  columnCount: number;
  patternMargin: number;
  inactiveColor: string;
  activeColor: string;
  errorColor: string;
  backgroundColor: string;
  error: boolean;
}

export const PatternRenderer = ({
  selectedIndexes: _selectedIndexes,
  rowCount,
  patternMargin,
  columnCount,
  backgroundColor,
  inactiveColor,
  activeColor,
  errorColor,
  error,
}: PropsType) => {
  const containerLayout = useSharedValue({width: 0, height: 0, min: 0});
  const selectedIndexes = useSharedValue(_selectedIndexes);
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

  useEffect(() => {
    selectedIndexes.value = _selectedIndexes;
  }, [_selectedIndexes]);

  const R = useDerivedValue(
    () => (containerLayout.value.min / rowCount - patternMargin * 2) / 2,
  );
  const patternPoints = useSharedValue<Point[] | null>(null);

  const onLayout = useCallback(
    ({nativeEvent: {layout}}) => {
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
    },
    [patternPoints],
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

  return (
    <Animated.View style={styles.container} onLayout={onContainerLayout}>
      <Animated.View style={cvc} onLayout={onLayout}>
        {Array(rowCount * columnCount)
          .fill(0)
          .map((_, idx) => {
            const patternColor = useDerivedValue(() => {
              if (selectedIndexes.value.findIndex((v) => v === idx) < 0) {
                return inactiveColor;
              } else if (error) {
                return errorColor;
              } else {
                return activeColor;
              }
            }).value;

            const outer = useAnimatedStyle(() => {
              return {
                borderWidth: 0,
                width: 2 * R.value,
                height: 2 * R.value,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: patternColor,
                borderRadius: 2 * R.value,
                margin: patternMargin,
              };
            });
            const inner = useAnimatedStyle(() => {
              return {
                width: R.value * 1,
                height: R.value * 1,
                borderRadius: R.value * 1,
                backgroundColor: backgroundColor,
              };
            });
            return (
              <Animated.View key={idx} style={outer}>
                <Animated.View style={inner} />
              </Animated.View>
            );
          })}
      </Animated.View>
      <PathRenderer
        patternPoints={patternPoints}
        selectedIndexes={selectedIndexes}
      />
    </Animated.View>
  );
};

PatternRenderer.defaultProps = {
  patternMargin: 25,
  error: false,
  inactiveColor: '#8E91A8',
  activeColor: '#5FA8FC',
  errorColor: '#D93609',
  backgroundColor: '#8E91A8',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
});
