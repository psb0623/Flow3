// @flow
import * as React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {StageGameStackNavigationProp} from '../../stack/StageGameStack';
import {BasicButton} from '../../../components/BasicButton';
import ModalSelector from 'react-native-modal-selector';
import {Pattern} from '../Pattern/Pattern';
import {Splash} from '../../Splash/Splash';

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
      <View style={styles.titleContainer}>
        <Splash />
      </View>
      <View style={styles.buttonContainer}>
        <BasicButton
          text={'게임 시작하기'}
          onPressed={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <ModalSelector
        selectStyle={{
          display: 'none',
        }}
        data={new Array({id: 1, label: '3 X 3'}, {id: 2, label: '4 X 4'})}
        keyExtractor={(item) => item.id}
        labelExtractor={({label}) => {
          return label ?? '';
        }}
        visible={modalVisible}
        onModalClose={() => {
          setModalVisible(false);
        }}
        onChange={(option) => {
          if (option.id == 1) {
            goStage3();
          }
          if (option.id == 2) {
            goStage4();
          }
        }}
        cancelText={'취소'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  titleContainer: {
    width: '100%',
    height: '70%',
    paddingBottom: 20,
  },
  title: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 35,
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
  },
  patternContainer: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    height: 50,
    width: '100%',
  },
});
