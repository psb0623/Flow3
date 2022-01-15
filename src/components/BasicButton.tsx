// @flow
import * as React from 'react';
import {Pressable, View, StyleSheet, Text} from 'react-native';

type Props = {
  text: string;
  onPressed: (...args: any[]) => void;
};
export const BasicButton = ({text, onPressed}: Props) => {
  return (
    <View style={styles.centeredView}>
      <Pressable style={[styles.button]} onPress={onPressed}>
        <Text style={styles.textStyle}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    width: '100%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
