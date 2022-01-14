import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {StageGame} from '../Game/StageGame';
import {StageGameScene} from '../Game/StageGameScene';
import {GameType} from '../Game/GameType';
import {StageSelect} from '../Game/StageSelect';

export type StageGameStackType = {
  StageSelect: undefined;
  StageGame: {gameType: GameType};
  StageGameScene: {gameStageNumber: number; gameType: GameType};
};

export type StageGameTypes = keyof StageGameStackType;

export type StageGameStackNavigationProp = {
  navigation: StackNavigationProp<StageGameStackType, StageGameTypes>;
};

export type StageGameStackRouteProp<T extends StageGameTypes> = Required<{
  route: Required<{
    params: StageGameStackType[T];
  }>;
}>;

const _StageGameStack = createStackNavigator<StageGameStackType>();

export const StageGameStack = () => {
  return (
    <_StageGameStack.Navigator screenOptions={{headerShown: false}}>
      <_StageGameStack.Screen name={'StageSelect'} component={StageSelect} />
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
