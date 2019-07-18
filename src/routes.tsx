import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import LoaderScreen from "./screens/loader/index";
import LoginScreen from "./screens/auth/login/index";
import HomeScreen from "./screens/main/home";

const authNavigator = createStackNavigator(
  {
    Login: LoginScreen
  },
  {
    headerMode: "none"
  }
);

const mainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    }
  },
  {
    headerMode: "none"
  }
);

const AppNavigator = createSwitchNavigator(
  {
    Loader: LoaderScreen,
    Auth: authNavigator,
    Main: mainNavigator
  },
  {
    initialRouteName: "Loader"
  }
);

export const AppContainer = createAppContainer(AppNavigator);
