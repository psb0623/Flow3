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
    <View style={styles.buttonWrapper}>
      <View
        style={[
          styles.button,
          {
            alignItems: 'center',
          },
        ]}>
        <BasicButton borderRadius={25} text={title} onPressed={onPressed} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  button: {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
