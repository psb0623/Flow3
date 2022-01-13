import {AppStackNavigationProp} from "../page/stack/AppStack";
import {Button} from "react-native";
import {useCallback} from "react";

export const BackButton = ({navigation} : AppStackNavigationProp) => {

    const goBack = useCallback(() => {
        navigation.goBack()
    }, [])

    return <Button title={"뒤로"} onPress={goBack}></Button>
}
