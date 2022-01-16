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
    <_StageGameStack.Navigator>
      <_StageGameStack.Screen
        name={'StageSelect'}
        component={StageSelect}
        options={{
          title: '일반 모드',
        }}
      />
      <_StageGameStack.Screen
        name={'StageGame'}
        component={StageGame}
        options={({route}) => {
          if (route.params.gameType === 'Three') {
            return {
              title: '3 X 3',
            };
          }
          return {
            title: '4 X 4',
          };
        }}
      />
      <_StageGameStack.Screen
        name={'StageGameScene'}
        component={StageGameScene}
        options={({
          route: {
            params: {gameType, gameStageNumber},
          },
        }) => {
          const title = `${
            gameType == 'Three' ? '3 X 3' : '4 X 4'
          } - ${gameStageNumber}`;
          return {
            title,
          };
        }}
      />
    </_StageGameStack.Navigator>
  );
};
