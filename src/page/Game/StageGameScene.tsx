// @flow
import * as React from 'react';
import {SafeAreaView, Text, StyleSheet, Button} from 'react-native';
import {BackButton} from "../../components/BackButton";
import {useCallback, useRef} from "react";
import {StageGameStackNavigationProp, StageGameStackRouteProp} from "../stack/StageGameStack";
import {Pattern} from "./Pattern/Pattern";

type Props = {

} & StageGameStackNavigationProp & StageGameStackRouteProp;

export const StageGameScene = ({navigation, route : { params }}: Props) => {
    const gameStageNumber = params?.gameStageNumber as number

    const goNextGameStage = useCallback((gameStageNumber) => {
        navigation.navigate('StageGameScene', {gameStageNumber: (gameStageNumber)} )
    }, [])

    return (
        <SafeAreaView>
            <BackButton navigation={navigation}></BackButton>
            <Button title={"next"} onPress={() => {goNextGameStage(gameStageNumber + 1)}}></Button>
            <Text>{gameStageNumber}</Text>
            <Pattern message={"Hello"} onCheck={(res) => {return true} } rowCount={3} activeColor={"#8E91A8"} columnCount={3} errorColor={"#D93609"} patternMargin={25} inactiveColor={"#8E91A8"}></Pattern>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        backgroundColor: "#61dafb",
        width: 80,
        height: 80,
        borderRadius: 4,
    },
});
