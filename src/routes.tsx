import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "./screens/home";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

export const AppContainer = createAppContainer(AppNavigator);
