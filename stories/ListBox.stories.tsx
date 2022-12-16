import { ComponentStory } from '@storybook/react'
import React from 'react'
import { Item, ListBox } from '../src'


export default {
  title: 'Components/ListBox',
  component: ListBox,
}

const Template: ComponentStory<typeof ListBox> = (args) => 
<ListBox {...args} defaultSelectedKeys="all">
    <Item>Test</Item>
    <Item>Test2</Item>
    <Item>Test3</Item>
</ListBox>

export const Example = Template.bind({})
Example.args = {
  color: 'primary',
  variant: 'contained',
  size: 'sm',
  children: 'Button Text',
  disabled: true
}
