// @flow
import * as React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {BasicButton} from '../../components/BasicButton';

type Props = {};
export const ChallengeGame = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.selectGameLayout}>
        <View style={styles.buttonLayout}>
          <BasicButton
            onPressed={() => {}}
            text={'아케이드 모드 시작하기'}></BasicButton>
        </View>
        <View style={styles.buttonLayout}>
          <BasicButton
            onPressed={() => {}}
            text={'스피드런 모드 시작하기'}></BasicButton>
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
