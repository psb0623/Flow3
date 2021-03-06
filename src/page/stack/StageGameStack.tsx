import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {StageGame} from '../Game/StageGame/StageGame';
import {StageGameScene} from '../Game/StageGame/StageGameScene';
import {GameType} from '../Game/StageGame/GameType';
import {StageSelect} from '../Game/StageGame/StageSelect';
import {StageGameSuccess} from '../Game/StageGame/StageGameSucess';

export type StageGameStackType = {
  StageSelect: undefined;
  StageGame: {gameType: GameType; beforeGameStageNumber?: number};
  StageGameScene: {gameStageNumber: number; gameType: GameType};
  StageGameSuccess: {gameType: GameType};
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
          } - 스테이지 ${gameStageNumber}`;
          return {
            title,
          };
        }}
      />
      <_StageGameStack.Screen
        name={'StageGameSuccess'}
        component={StageGameSuccess}
        options={({
          route: {
            params: {gameType},
          },
        }) => {
          const title = `${
            gameType == 'Three' ? '3 X 3' : '4 X 4'
          } - Success!!`;
          return {
            title,
          };
        }}
      />
    </_StageGameStack.Navigator>
  );
};
