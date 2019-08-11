import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';

import LoginScreen from './screens/auth/login/index';
import OTPScreen from './screens/auth/otp/index';
import PasswordScreen from './screens/auth/password/index';
import LoaderScreen from './screens/loader/index';
import CommitScreen from './screens/main/commit';
import HomeScreen from './screens/main/home';

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
    initialRouteName: 'Loader'
  }
);

export const AppContainer = createAppContainer(AppNavigator);
