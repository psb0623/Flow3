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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    width: '80%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
