// @flow
import * as React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Splash} from '../Splash/Splash';
import {useCallback, useState} from 'react';
import {authService} from '../../api';
import {TextInput} from 'react-native';
import {AppStackNavigationProp} from '../stack/AppStack';

type Props = {} & AppStackNavigationProp;
export const Login = ({navigation}: Props) => {
  const [nickname, setNickname] = useState<string>('');

  const login = useCallback(() => {
    (async () => {
      await authService.login(nickname);
      setNickname('');
      navigation.navigate('Main');
    })();
  }, [nickname]);

  return (
    <View style={styles.container}>
      <Splash />
      <View style={styles.textInputContainer}>
        <TextInput
          value={nickname}
          style={styles.textInput}
          onChangeText={(text) => {
            setNickname(text);
          }}
          placeholder={'닉네임을 입력해주세요.'}
        />
      </View>
      <Button title={'로그인'} onPress={login}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '60%',
  },
  textInputContainer: {
    width: '100%',
    padding: 20,
  },
  textInput: {
    width: '100%',
    height: 50,
  },
});
