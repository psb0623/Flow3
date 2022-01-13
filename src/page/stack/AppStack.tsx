import {createStackNavigator, StackNavigationProp} from "@react-navigation/stack";
import { Main } from "../Main";
import { NavigationContainer } from "@react-navigation/native";
import {StageGame} from "../Game";
import {StageGameScene} from "../Game/StageGameScene";


export type AppStackType = {
    Main : undefined,
    StageGame: undefined,
    StageGameScene: {gameStageNumber: number}
}

export type AppTypes = keyof AppStackType

export type AppStackNavigationProp = {
    navigation: StackNavigationProp<AppStackType, AppTypes>;
}

export type AppStackRouteProp = Required<{
    route: Required<{
        params: AppStackType[keyof AppStackType]
    }>
}>

const Stack = createStackNavigator<AppStackType>();

export const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'Main'} component={Main} />
        <Stack.Screen name={'StageGame'} component={StageGame} />
         <Stack.Screen name={'StageGameScene'} component={StageGameScene} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
