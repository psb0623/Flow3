import { createStackNavigator } from "@react-navigation/stack";
import { Main } from "../Main/Main";
import { Loading } from "../Loading/Loading";
import { NavigationContainer } from "@react-navigation/native";
import {AppStackType, PageTypes} from "./PageType";

const Stack = createStackNavigator<AppStackType>();
export const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={PageTypes.Loading} component={Loading} />
        <Stack.Screen name={PageTypes.Main} component={Main} />
          <Stack.Screen name={PageTypes.Game} component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
