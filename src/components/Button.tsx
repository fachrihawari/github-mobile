import React, { ReactNode } from "react";
import {
  Text,
  StyleProp,
  TextStyle,
  StyleSheet,
  ViewStyle,
  View
} from "react-native";

import Touchable from "./Touchable";
import { color } from "../config";

interface IButtonProps {
  onPress: Function;
  wrapperStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: String;
}

const style = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  text: {
    color: "white",
    fontSize: 16
  }
});

function Button(props: IButtonProps) {
  return (
    <Touchable onPress={props.onPress}>
      <View style={[style.button, props.wrapperStyle]}>
        <Text style={[style.text, props.textStyle]}>{props.children}</Text>
      </View>
    </Touchable>
  );
}

export default Button;
