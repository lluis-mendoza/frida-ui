import { ComponentStory } from '@storybook/react'
import React from 'react'
import { Button } from '../src'


export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['primary', 'success', 'info', 'warning', 'error'],
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ['text', 'contained', 'outlined'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
    isDisabled: { control: 'boolean' },
    children: { control: 'text' },
  },
}

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Example = Template.bind({})
Example.args = {
  color: 'primary',
  variant: 'contained',
  size: 'sm',
  children: 'Button Text',
  disabled: true
}
