// @flow
import * as React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {AppStackNavigationProp, AppStackRouteProp} from "../stack/AppStack";
import {BackButton} from "../../components/BackButton";

type Props = {
} & AppStackNavigationProp & AppStackRouteProp;

export const StageGameScene = ({navigation, route }: Props) => {
    return (
        <SafeAreaView>
            <BackButton navigation={navigation}></BackButton>
            <Text>{route.params?.gameStageNumber}</Text>
        </SafeAreaView>
    );
};
