import { ComponentStory } from '@storybook/react'
import React from 'react'
import { Input } from '../src'


export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    children: { control: 'text' },
  },
}

const Template = (args) =>  <Input {...args} />;

export const Default = Template.bind({})
Default.args = {
  color: 'primary',
  variant: 'contained',
  size: 'sm',
  children: 'Button Text',
}

export const Password = Template.bind({})
Password.args = {
  color: 'primary',
  variant: 'contained',
  size: 'sm',
  children: 'Button Text',
}