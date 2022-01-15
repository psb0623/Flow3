// @flow
import * as React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {StageGameStackNavigationProp} from '../stack/StageGameStack';
import {PatternRenderer} from '../../components/Renderer/PatternRenderer';
import {BasicButton} from '../../components/BasicButton';
import ModalSelector from 'react-native-modal-selector';

type Props = {} & StageGameStackNavigationProp;

export const StageSelect = ({navigation}: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const goStage3 = useCallback(() => {
    navigation.push('StageGame', {
      gameType: 'Three',
    });
  }, []);

  const goStage4 = useCallback(() => {
    navigation.push('StageGame', {
      gameType: 'Four',
    });
  }, []);

  useEffect(() => {
    return () => {
      setModalVisible(false);
    };
  }, []);

  return (
    <View style={styles.container}>
      <BasicButton
        text={'게임 시작하기'}
        onPressed={() => {
          setModalVisible(true);
        }}></BasicButton>
      <ModalSelector
        data={new Array({id: 1, label: '1'})}
        keyExtractor={(item) => item.id}
        visible={modalVisible}
        labelExtractor={({label}) => {
          return label ?? '';
        }}
        onModalClose={() => {
          setModalVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
