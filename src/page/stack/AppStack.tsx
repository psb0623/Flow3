import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Main} from '../Main';
import {NavigationContainer} from '@react-navigation/native';
import {BeforeStart} from '../BeforeStart';

export type AppStackType = {
  Main: undefined;
  BeforeStart: undefined;
};

export type AppTypes = keyof AppStackType;

export type AppStackNavigationProp = {
  navigation: StackNavigationProp<AppStackType, AppTypes>;
};

export type AppStackRouteProp = Required<{
  route: Required<{
    params: AppStackType[AppTypes];
  }>;
}>;

const Stack = createStackNavigator<AppStackType>();

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

export const AppStack = ({}: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={'BeforeStart'}
          component={BeforeStart}></Stack.Screen>
        <Stack.Screen name={'Main'} component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
