// @flow
import * as React from 'react';
import {IPattern} from './SharePattern';
import {View, Text} from 'react-native';

type Props = {
  pattern: IPattern;
};
export const PublicPatternCard = ({pattern}: Props) => {
  return (
    <View>
      <Text>{pattern.writer}</Text>
    </View>
  );
};
