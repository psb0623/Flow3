// @flow
import * as React from 'react';
import {Pressable, View, StyleSheet, Text} from 'react-native';
import {FC} from 'react';

type Props = {
  text: string;
  onPressed: (...args: any[]) => void;
  borderRadius: number;
};

export const BasicButton = ({text, onPressed, borderRadius}: Props) => {
  return (
    <View style={styles.centeredView}>
      <Pressable
        style={[
          styles.button,
          {
            borderRadius,
          },
        ]}
        onPress={onPressed}>
        <Text style={styles.textStyle}>{text}</Text>
      </Pressable>
    </View>
  );
};

BasicButton.defaultProps = {
  borderRadius: 20,
};

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    width: '100%',
    height: '100%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
