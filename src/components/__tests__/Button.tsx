import "react-native";
import React from "react";
import render from "react-test-renderer";

import Button from "../Button";

it("render default Button", () => {
  const handlePress = jest.fn();
  const tree = render
    .create(<Button onPress={handlePress}>Awesome Button</Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
