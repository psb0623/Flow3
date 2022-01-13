import { useCallback } from "react";
import { Button, View } from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {PageTypes} from "../util/PageType";

interface Props {
  navigation: StackNavigationProp<any, 'Login'>;
}

export const Main = ({navigation} : Props) => {
  const goGame = useCallback(() => {
    navigation.navigate('Game')
  }, []);
  return (
    <View>
      <Button title={"시작"} onPress={goGame}></Button>
    </View>
  );
};
