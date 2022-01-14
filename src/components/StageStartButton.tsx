import {
  Button,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleSheet,
  View,
} from 'react-native';
import {stageService} from '../api';
import {useEffect} from 'react';

interface Props {
  title: string;
  onPressed: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

export const StageStartButton = ({title, onPressed}: Props) => {
  return <Button title={title} onPress={onPressed}></Button>;
};

const styles = StyleSheet.create({});
