import React, { useContext, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { NavigationContext } from 'react-navigation';

import Button from '../../../components/Button';
import style from './style';

function LoginScreen() {
  const [username, setUsername] = useState<string>('');
  const navigation = useContext(NavigationContext);

  function handleContinue() {
    if (!username.trim()) {
      return Alert.alert('Username required!');
    }

    navigation.navigate('Password', {
      username
    });
  }

  function handleUsernameChange(value: string) {
    setUsername(value);
  }

  return (
    <View style={style.container}>
      <TextInput
        placeholder="Username"
        autoCapitalize="none"
        autoFocus={true}
        style={style.usernameInput}
        onChangeText={handleUsernameChange}
        returnKeyType="done"
        onSubmitEditing={handleContinue}
      />
      <Button wrapperStyle={style.continueButton} onPress={handleContinue}>
        Continue
      </Button>
    </View>
  );
}

LoginScreen.navigationOptions = {
  title: 'Github Login'
};

export default LoginScreen;
