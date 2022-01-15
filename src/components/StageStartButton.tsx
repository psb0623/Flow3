import {
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleSheet,
  View,
} from 'react-native';
import {stageService} from '../api';
import {useEffect} from 'react';
import {BasicButton} from './BasicButton';

interface Props {
  title: string;
  onPressed: (...args: any[]) => void;
}

export const StageStartButton = ({title, onPressed}: Props) => {
  return (
    <View style={styles.buttonContainer}>
      <View style={styles.button}>
        <BasicButton
          borderRadius={10}
          text={title}
          onPressed={onPressed}></BasicButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 50,
    height: 50,
  },
});
