import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import Button from '../Button';


describe('rendering', () => {
  
  let wrapper: ShallowWrapper
  const handlePress = jest.fn()
  const buttonLabel = 'Awesome Button'

  beforeEach(() => {
    wrapper = shallow(<Button onPress={handlePress}>{buttonLabel}</Button>)
  })

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
  
  it('should render <Touchable/>', () => {
    expect(wrapper.find('Touchable')).toHaveLength(1);
  });

  it('has correct button label', () => {
    expect(wrapper.find('Text').contains(buttonLabel)).toBe(true)
  })

  it('has pressed the button', () => {
    wrapper.simulate('press')
    expect(handlePress).toHaveBeenCalledTimes(1)
  })
})
