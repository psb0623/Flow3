// @flow
import * as React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {BasicButton} from '../../../components/BasicButton';
import {ChallengeGameStackNavigationProp} from '../../stack/ChallengeGameStack';
import {useCallback, useRef, useState} from 'react';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import useLayout from 'react-native-paper/lib/typescript/utils/useLayout';

type Props = {} & ChallengeGameStackNavigationProp;

const diffColor = ['#50E989', 'blue', 'black'];

export const ChallengeGameSelect = ({navigation}: Props) => {
  const top3 = [
    [200, 150, 100],
    [100, 70, 30],
    [50, 40, 20],
  ];

  const [top3Diff, setTop3Diff] = useState<number>(0);

  const goSpeedRun = useCallback(() => {
    navigation.navigate('SpeedRun');
  }, []);
  const graphAnim = Array(3)
    .fill(null)
    .map((_) => useRef(new Animated.Value(0)).current);
  const [height, setHeight] = useState<number>(0);

  const onGraphFrameContainerLayout = ({
    nativeEvent: {
      layout: {x, y, width, height},
    },
  }) => setHeight(height);

  const show = (difficulty: number) => {
    setTop3Diff(difficulty);
    graphAnim.forEach((v, idx) => {
      v.setValue(0);
      Animated.spring(v, {
        stiffness: 300,
        mass: 1,
        damping: 15,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        toValue:
          (height * (top3[difficulty][idx] + 1) * 0.8) / top3[difficulty][0],
      }).start();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.HOFLayout}>
        <View style={styles.rankingDifficultyLayout}>
          <View style={styles.buttonLayout}>
            <BasicButton
              onPressed={() => show(0)}
              text={'초급 TOP3'}></BasicButton>
          </View>
          <View style={styles.buttonLayout}>
            <BasicButton
              onPressed={() => {
                show(1);
              }}
              text={'중급 TOP3'}></BasicButton>
          </View>
          <View style={styles.buttonLayout}>
            <BasicButton
              onPressed={() => {
                show(2);
              }}
              text={'고급 TOP3'}></BasicButton>
          </View>
        </View>
        <View
          style={styles.graphFrameLayout}
          onLayout={onGraphFrameContainerLayout}>
          <Animated.View
            style={[
              styles.graphLayout,
              {height: graphAnim[2], backgroundColor: diffColor[top3Diff]},
            ]}>
            <Animated.Text style={styles.rankTextStyle}>
              {top3[top3Diff][2]}
            </Animated.Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.graphLayout,
              {height: graphAnim[0], backgroundColor: diffColor[top3Diff]},
            ]}>
            <Text style={styles.rankTextStyle}>{top3[top3Diff][0]}</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.graphLayout,
              {height: graphAnim[1], backgroundColor: diffColor[top3Diff]},
            ]}>
            <Text style={styles.rankTextStyle}>{top3[top3Diff][1]}</Text>
          </Animated.View>
        </View>
      </View>
      <View style={styles.selectGameLayout}>
        <View
          style={[styles.difficultyLayout, {backgroundColor: diffColor[0]}]}>
          <Text style={styles.textStyle}>초급 </Text>
          <Text style={styles.rankTextStyle}>72점 </Text>
          <View style={styles.buttonLayout}>
            <BasicButton onPressed={goSpeedRun} text={'순위표'}></BasicButton>
          </View>
          <View style={styles.buttonLayout}>
            <BasicButton onPressed={goSpeedRun} text={'도전!'}></BasicButton>
          </View>
        </View>
        <View
          style={[styles.difficultyLayout, {backgroundColor: diffColor[1]}]}>
          <Text style={styles.textStyle}>중급 </Text>
          <Text style={styles.rankTextStyle}>-점 </Text>
          <View style={styles.buttonLayout}>
            <BasicButton onPressed={goSpeedRun} text={'순위표'}></BasicButton>
          </View>
          <View style={styles.buttonLayout}>
            <BasicButton onPressed={goSpeedRun} text={'도전!'}></BasicButton>
          </View>
        </View>

        <View
          style={[styles.difficultyLayout, {backgroundColor: diffColor[2]}]}>
          <Text style={styles.textStyle}>고급 </Text>
          <Text style={styles.rankTextStyle}>-점 </Text>
          <View style={styles.buttonLayout}>
            <BasicButton onPressed={goSpeedRun} text={'순위표'}></BasicButton>
          </View>
          <View style={styles.buttonLayout}>
            <BasicButton onPressed={goSpeedRun} text={'도전!'}></BasicButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 0,
  },
  imageLayout: {
    width: '100%',
    height: '50%',
  },
  HOFLayout: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
  },
  selectGameLayout: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankingDifficultyLayout: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphFrameLayout: {
    flex: 3,
    width: '100%',
    height: '100%',
    padding: 0,
    paddingLeft: '20%',
    paddingRight: '20%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  graphLayout: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 0,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 2,
  },
  buttonLayout: {
    flex: 1,
    width: 0,
    height: '50%',
    margin: 5,
  },
  difficultyLayout: {
    flexDirection: 'row',
    width: '100%',
    //height: 70,
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#2196F3',
    elevation: 2,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  rankTextStyle: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
  },
});
