// @flow
import * as React from 'react';
import {Pressable, View, StyleSheet, Text} from 'react-native';
import {FC} from 'react';

type Props = {
  text: string;
  onPressed: (...args: any[]) => void;
  borderRadius: number;
  children?: any;
  enable: boolean;
  backgroundColor: string;
  textColor: string;
};

export const BasicButtonWhite = ({
  text,
  onPressed,
  borderRadius,
  children,
  enable,
  backgroundColor,
  textColor,
}: Props) => {
  return (
    <View style={styles.centeredView}>
      <Pressable
        style={[
          styles.button,
          {
            borderRadius,
            backgroundColor,
          },
        ]}
        disabled={!enable}
        onPress={onPressed}>
        <Text style={[styles.textStyle, {color: textColor}]}>{text}</Text>
      </Pressable>
    </View>
  );
};

BasicButtonWhite.defaultProps = {
  borderRadius: 20,
  enable: true,
  backgroundColor: '#EEEEEE',
  textColor: 'black',
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
    backgroundColor: '#EAEAEA',
    width: '100%',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
