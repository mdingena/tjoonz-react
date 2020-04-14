import React from 'react';
import Icon from '../Icon';
import Button from './Button';

export default {
  title: 'Button',
  component: Button
};

export const button = () => (
  <Button
    onClick={() => console.log('Clicked button')}
    text='This is a button'
    Icon={Icon.CaretSquareDown}
  />
);
