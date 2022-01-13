// @flow
import * as React from 'react';
import {Animated, PanResponder, SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {AppStackNavigationProp, AppStackRouteProp} from "../stack/AppStack";
import {BackButton} from "../../components/BackButton";
import {useRef} from "react";

type Props = {
} & AppStackNavigationProp & AppStackRouteProp;

export const StageGameScene = ({navigation, route : { params }}: Props) => {
    const gameStageNumber = params?.gameStageNumber as number

    return (
        <SafeAreaView>
            <BackButton navigation={navigation}></BackButton>
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
