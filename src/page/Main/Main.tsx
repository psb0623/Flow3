import { useCallback } from "react";
import { Button, View } from "react-native";

export const Main = ({navigation}) => {
  const goGame = useCallback(() => {
    console.log(navigation)
  }, []);
  return (
    <View>
      {"main"}
    </View>
  );
};
