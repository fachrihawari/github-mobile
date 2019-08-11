import React from 'react';
import 'react-native';
import render from 'react-test-renderer';

import Login from './index';

it('render default Login', () => {
  const tree = render.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});
