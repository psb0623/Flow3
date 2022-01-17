import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Main} from '../Main/Main';
import {NavigationContainer} from '@react-navigation/native';

export type AppStackType = {
  Main: undefined;
  BeforeStart: undefined;
  Logout: undefined;
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

type Props = {};

export const AppStack = ({}: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Main'} component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
