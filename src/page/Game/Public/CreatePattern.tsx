// @flow
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Pattern} from '../Pattern/Pattern';

type Props = {};
export const CreatePattern = (props: Props) => {
  return (
    <View>
      <Pattern
        inactiveColor={Pattern.defaultProps.inactiveColor}
        errorColor={Pattern.defaultProps.inactiveColor}
        onSuccess={() => false}
        activeColor={Pattern.defaultProps.inactiveColor}
        successColor={Pattern.defaultProps.inactiveColor}></Pattern>
      <Text>CREATE PATTERN</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
