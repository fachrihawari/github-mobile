import React, { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';

import { color } from '../config';
import Touchable, { ITouchableProps } from './Touchable';

interface IButtonProps extends ITouchableProps {
  onPress: () => void;
  wrapperStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: string;
}

const style = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  text: {
    color: 'white',
    fontSize: 16
  }
});

function Button(props: IButtonProps) {
  return (
    <Touchable {...props} onPress={props.onPress}>
      <View style={[style.button, props.wrapperStyle]}>
        <Text style={[style.text, props.textStyle]}>{props.children}</Text>
      </View>
    </Touchable>
  );
}

export default Button;
