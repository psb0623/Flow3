// @flow
import * as React from 'react';
import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {PatternModule} from './PatternModule/PatternModule';
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {dailyRepository} from '../../repository/DailyRepository';
import {useIsFocused} from '@react-navigation/native';
import {hintRepository} from '../../repository/HintRepository';
import {PatternRandomGenerator} from './PatternRandomGenerator';
import {MainTabNavigationProp} from '../Main/Main';
import {RandomGeneratorService} from '../../api/service/RandomGeneratorService';
import {randomGeneratorService} from '../../api';

type Props = {} & MainTabNavigationProp;
export const DailyPattern = ({navigation}: Props) => {
  const [initialPattern, setInitialPattern] = useState<null | Array<number>>(
    null,
  );
  const [daily, setDaily] = useState(Date.now());
  const isFocused = useIsFocused();
  const [canSolve, setCanSolve] = useState(true);
  const [canSolvedDateLower, setCanSolvedDateLower] = useState<number>(
    Date.now(),
  );
  const [modal, setModal] = useState(false);

  useEffect(() => {
    (async () => {
      const {data} = await randomGeneratorService.getRandomPattern(2);
      setInitialPattern(data);
    })();
  }, []);

  const onSuccess = useCallback(() => {
    (async () => {
      await hintRepository.plusHintCount();
      setDaily(await dailyRepository.setSolvedAt(Date.now()));
    })();
  }, []);

  const onSuccessModalPressed = useCallback(() => {
    (async () => {
      setModal(false);
      navigation.navigate('StageGameStack');
      const {data} = await randomGeneratorService.getRandomPattern(2);
      setInitialPattern(data);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (!isFocused) {
        return;
      }
      console.log(1);
      const _daily = await dailyRepository.getSolvedAt();
      const _currentDate = new Date(_daily);
      const _canSolvedDateLower = _currentDate.setDate(
        _currentDate.getDate() + 1,
      );

      setCanSolvedDateLower(_canSolvedDateLower);
      setDaily(_daily);
      if (_canSolvedDateLower <= Date.now()) {
        setCanSolve(true);
      } else {
        setModal(true);
        setCanSolve(false);
      }
    })();
  }, [isFocused, daily]);
  console.log(modal);

  let [countDown, setCountDown] = useState<number>(
    canSolvedDateLower - Date.now(),
  );
  let second = ((countDown / 1000) >> 0) % 60;
  let minute = ((countDown / 60000) >> 0) % 60;
  let hour = ((countDown / (60000 * 60)) >> 0) % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(canSolvedDateLower - Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [canSolvedDateLower]);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: '80%',
          height: '80%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {initialPattern && (
          <PatternModule answerIndices={initialPattern} onSuccess={onSuccess} />
        )}
        <Modal
          animationType="fade"
          transparent={false}
          visible={modal}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button]}
                onPress={onSuccessModalPressed}>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.titleStyle}>
                    일일 챌린지를 완료했습니다!
                  </Text>

                  <Text
                    style={{fontSize: 20, color: '#2196F3', marginBottom: 10}}>
                    {'보상'}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 50,
                    }}>
                    <Image
                      source={require('./StageGame/eletronic.png')}
                      style={{width: 50, height: 50}}
                    />
                    <Text style={{fontSize: 40, color: '#2196F3'}}>
                      {'+1 '}
                    </Text>
                  </View>

                  <Text
                    style={{fontSize: 20, color: '#242424', marginBottom: 10}}>
                    다음 챌린지까지
                  </Text>

                  <Text
                    style={{
                      fontSize: 35,
                      color: '#242424',
                      marginBottom: 10,
                    }}>{`${hour}:${minute}:${second}`}</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  titleStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 50,
  },

  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
