// @flow
import * as React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {PatternRenderer} from '../../../components/Renderer/PatternRenderer';
import {normalize, Pattern} from '../Pattern/Pattern';
import {FC, useCallback} from 'react';

type Props = {
  answerIndices: Array<number>;
  onSuccess: () => void;
  row: number;
  column: number;
};
export const PatternModule = ({
  answerIndices,
  onSuccess,
  row,
  column,
}: Props) => {
  const onCheck = useCallback(
    (res: string) => {
      if (normalize(answerIndices, row, column) === res) {
        return true;
      }
      return false;
    },
    [answerIndices],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.patternRendererContainer}>
        <View style={styles.patternRendererLayout}>
          <PatternRenderer
            selectedIndexes={answerIndices}
            columnCount={row}
            rowCount={column}
          />
        </View>
      </View>
      <View style={styles.patternLayout}>
        <Pattern
          onSuccess={onSuccess}
          onCheck={onCheck}
          rowCount={row}
          activeColor={'#8E91A8'}
          columnCount={column}
          errorColor={'#D93609'}
          patternMargin={20}
          inactiveColor={'#8E91A8'}
        />
      </View>
    </SafeAreaView>
  );
};

PatternModule.defaultProps = {
  column: 3,
  row: 3,
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  patternLayout: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
  },
});