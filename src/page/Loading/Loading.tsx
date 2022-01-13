import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import {PageTypes} from "../util/PageType";
import {StackNavigationProp} from "@react-navigation/stack";

interface Props {
  navigation: StackNavigationProp<any, 'Login'>;
}


export const Loading = ({navigation} : Props) => {
  const [loading, setLoading] = useState<Boolean>(false);

  const goMain = useCallback(() => {
    navigation.navigate(PageTypes.Main)
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (loading) {
      goMain();
    }
  }, [loading]);

  return <View>{"Loading..."}</View>;
};
