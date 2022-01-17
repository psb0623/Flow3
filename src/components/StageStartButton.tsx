import {
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleSheet,
  View,
} from 'react-native';
import {BasicButton} from './BasicButton';

interface Props {
  title: string;
  onPressed: (...args: any[]) => void;
  enable: boolean;
}

export const StageStartButton = ({title, onPressed, enable}: Props) => {
  return (
    <View
      style={[
        styles.buttonWrapper,
        {
          backgroundColor: `${enable ? '#2196F3' : '#D3D3D3'}`,
        },
      ]}>
      <View
        style={[
          styles.button,
          {
            alignItems: 'center',
          },
        ]}>
        <BasicButton
          borderRadius={25}
          text={title}
          onPressed={onPressed}
          enable={enable}
        />
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
