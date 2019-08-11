import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import LoaderScreen from "./screens/loader/index";
import LoginScreen from "./screens/auth/login/index";
import PasswordScreen from "./screens/auth/password/index";
import OTPScreen from "./screens/auth/otp/index";
import HomeScreen from "./screens/main/home";
import CommitScreen from "./screens/main/commit";

const authNavigator = createStackNavigator({
  Login: LoginScreen,
  Password: PasswordScreen,
  OTP: OTPScreen,
});

const mainNavigator = createStackNavigator({
  Home: HomeScreen,
  Commit: CommitScreen
});

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
