import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {StageGame} from '../Game/StageGame';
import {StageGameScene} from '../Game/StageGameScene';

export type StageGameStackType = {
  StageGame: undefined;
  StageGameScene: {gameStageNumber: number};
};

export type StageGameTypes = keyof StageGameStackType;

export type StageGameStackNavigationProp = {
  navigation: StackNavigationProp<StageGameStackType, StageGameTypes>;
};

export type StageGameStackRouteProp = Required<{
  route: Required<{
    params: StageGameStackType[StageGameTypes];
  }>;
}>;

const _StageGameStack = createStackNavigator<StageGameStackType>();

export const StageGameStack = () => {
  return (
    <_StageGameStack.Navigator screenOptions={{headerShown: false}}>
      <_StageGameStack.Screen
        name={'StageGame'}
        component={StageGame}></_StageGameStack.Screen>
      <_StageGameStack.Screen
        name={'StageGameScene'}
        component={StageGameScene}
      />
    </_StageGameStack.Navigator>
  );
};
