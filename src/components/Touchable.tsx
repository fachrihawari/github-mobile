import React, { ReactNode, ReactType } from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";

interface ITouchableProps {
  onPress: Function;
  children: ReactNode;
}

function Touchable({ children, onPress }: ITouchableProps) {
  const Component: ReactType =
    Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

  return <Component onPress={onPress}>{children}</Component>;
}

export default Touchable;
