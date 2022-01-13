import * as React from "react";
import { Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppStack } from "./src/page/util/AppStack";

export default function App() {
  return <AppStack></AppStack>;
}
