// @flow
import * as React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {BasicButton} from '../../../components/BasicButton';
import {ChallengeGameStackNavigationProp} from '../../stack/ChallengeGameStack';
import {useCallback} from 'react';

type Props = {} & ChallengeGameStackNavigationProp;
export const ChallengeGameSelect = ({navigation}: Props) => {
  const goSpeedRun = useCallback(() => {
    navigation.navigate('SpeedRun');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.selectGameLayout}>
        <View style={styles.buttonLayout}>
          <BasicButton onPressed={goSpeedRun} text={'초급'}></BasicButton>
        </View>
        <View style={styles.buttonLayout}>
          <BasicButton onPressed={goSpeedRun} text={'중급'}></BasicButton>
        </View>
        <View style={styles.buttonLayout}>
          <BasicButton onPressed={goSpeedRun} text={'고급'}></BasicButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  imageLayout: {
    width: '100%',
    height: '50%',
  },
  selectGameLayout: {
    width: '100%',
    height: '100%',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLayout: {
    width: '100%',
    height: 50,
    marginBottom: 5,
  },
});
