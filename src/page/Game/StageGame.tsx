import * as React from 'react';
import {Button, FlatList, SafeAreaView, StyleSheet} from "react-native";
import {useCallback, useLayoutEffect, useMemo, useRef} from "react";
import {StageStartButton} from "../../components/StageStartButton";
import {FlatGrid} from "react-native-super-grid";
import {AppStackNavigationProp} from "../stack/AppStack";
import {BackButton} from "../../components/BackButton";

type Props = {

};

export const StageGame = ({navigation}: Props & AppStackNavigationProp) => {

    const stage = useRef(new Array(100).fill(null));

    const goStageGameScene = useCallback((gameStageNumber: number) => {
        navigation.push('StageGameScene', {gameStageNumber})
    }, [])

    return (
        <SafeAreaView>
            <BackButton navigation={navigation}></BackButton>
            <FlatGrid data={stage.current}
                      renderItem={({index}) => <StageStartButton key={index} title={index.toString()}
                      onPressed={() => {
                          goStageGameScene(index)
                      }} />}
                      keyExtractor={() => {
                          return Math.random().toString()
                      }}
                      />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    gameContainer: {
    }
})
