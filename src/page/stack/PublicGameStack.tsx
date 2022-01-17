import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {IPattern, SharePattern} from '../Game/Public/SharePattern';
import {SharePatternScene} from '../Game/Public/SharePatternScene';

export type PublicGameStackType = {
  PublicGameSelect: undefined;
  PublicGameScene: {pattern: IPattern};
};

export type PublicGameTypes = keyof PublicGameStackType;

export type PublicGameStackNavigationProp = {
  navigation: StackNavigationProp<PublicGameStackType, PublicGameTypes>;
};

export type PublicGameStackRouteProp<T extends PublicGameTypes> = Required<{
  route: Required<{
    params: PublicGameStackType[T];
  }>;
}>;

const _PublicGameStack = createStackNavigator<PublicGameStackType>();

export const PublicGameStack = () => {
  return (
    <_PublicGameStack.Navigator screenOptions={{headerShown: false}}>
      <_PublicGameStack.Screen
        name={'PublicGameSelect'}
        component={SharePattern}
        options={{
          title: '패턴 공유',
        }}
      />
      <_PublicGameStack.Screen
        name={'PublicGameScene'}
        component={SharePatternScene}
        options={({route}) => {
          return {
            title: `${route.params.pattern.writer}의 게임`,
          };
        }}
      />
    </_PublicGameStack.Navigator>
  );
};
