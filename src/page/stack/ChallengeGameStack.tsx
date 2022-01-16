import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Arcade} from '../Game/ChallengeGame/Arcade';
import {SpeedRun} from '../Game/ChallengeGame/SpeedRun';
import {ChallengeGameSelect} from '../Game/ChallengeGame/ChallengeGameSelect';

export type ChallengeGameStackType = {
  ChallengeGameSelect: undefined;
  Arcade: undefined;
  SpeedRun: undefined;
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
        options={{
          title: '스피드런',
        }}
      />
    </_ChallengeGameStack.Navigator>
  );
};
