import {useCallback, useMemo, useRef, useState} from "react";
import {Button, SafeAreaView, StyleSheet, Text} from "react-native";
import {AppStackNavigationProp} from "../stack/AppStack";

interface Props {

}

export const Main = ({navigation} : Props & AppStackNavigationProp) => {

  const goStageGame = useCallback(() => {
    navigation.navigate('StageGame')
  }, []);

  return (
      <SafeAreaView style={
          styles.mainContainer
      }>
        <Text>Pattern Game</Text>
        <Button title={"GO STAGE"} onPress={goStageGame}></Button>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center'
  }
})
