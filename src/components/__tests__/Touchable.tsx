import "react-native";
import { Text } from "react-native";
import React from "react";
import render from "react-test-renderer";

import Touchable from "../Touchable";

it("render default Touchable", () => {
  const handlePress = jest.fn();
  const tree = render
    .create(
      <Touchable onPress={handlePress}>
        <Text>Awesome Touchable</Text>
      </Touchable>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
