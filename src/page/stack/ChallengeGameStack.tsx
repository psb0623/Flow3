import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Arcade} from '../Game/ChallengeGame/Arcade';
import {SpeedRun} from '../Game/ChallengeGame/SpeedRun';
import {ChallengeGameSelect} from '../Game/ChallengeGame/ChallengeGameSelect';
import {SpeedRunDifficulty} from '../Game/ChallengeGame/SpeedRunDifficulty';

export type ChallengeGameStackType = {
  ChallengeGameSelect: undefined;
  Arcade: undefined;
  SpeedRun: {
    difficulty: SpeedRunDifficulty;
  };
};

export type ChallengeGameTypes = keyof ChallengeGameStackType;

export type ChallengeGameStackNavigationProp = {
  navigation: StackNavigationProp<ChallengeGameStackType, ChallengeGameTypes>;
};

export type ChallengeGameStackRouteProp<T extends ChallengeGameTypes> =
  Required<{
    route: Required<{
      params: ChallengeGameStackType[T];
    }>;
  }>;

const _ChallengeGameStack = createStackNavigator<ChallengeGameStackType>();

export const ChallengeGameStack = () => {
  return (
    <_ChallengeGameStack.Navigator>
      <_ChallengeGameStack.Screen
        name={'ChallengeGameSelect'}
        component={ChallengeGameSelect}
        options={{
          title: '도전 모드',
        }}
      />
      <_ChallengeGameStack.Screen
        name={'Arcade'}
        component={Arcade}
        options={{
          title: '아케이드',
        }}
      />
      <_ChallengeGameStack.Screen
        name={'SpeedRun'}
        component={SpeedRun}
        options={(router) => {
          if (router.route.params.difficulty === 'High') {
            return {
              title: 'SpeedRun - High',
            };
          }

          if (router.route.params.difficulty === 'Intermediate') {
            return {
              title: 'SpeedRun - Intermediate',
            };
          }

          if (router.route.params.difficulty === 'Low') {
            return {
              title: 'SpeedRun - Low',
            };
          }
          return {};
        }}
      />
    </_ChallengeGameStack.Navigator>
  );
};
