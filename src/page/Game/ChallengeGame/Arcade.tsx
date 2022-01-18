// @flow
import * as React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {PatternRenderer} from '../../../components/Renderer/PatternRenderer';
import {Pattern} from '../Pattern/Pattern';

type Props = {};
export const Arcade = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.patternRendererContainer}>
        <View style={styles.patternRendererLayout}>
          <PatternRenderer selectedIndexes={[]} columnCount={3} rowCount={3} />
        </View>
      </View>
      <View style={styles.patternLayout}>
        <Pattern
          onSuccess={() => {}}
          rowCount={3}
          activeColor={'#8E91A8'}
          columnCount={3}
          errorColor={'#D93609'}
          patternMargin={25}
          inactiveColor={'#8E91A8'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  patternRendererContainer: {
    width: '100%',
    height: '30%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  patternRendererLayout: {
    width: '100%',
    height: '100%',
  },
  patternLayout: {
    width: '100%',
    height: '70%',
  },
});
