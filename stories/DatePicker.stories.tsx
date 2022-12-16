import { ComponentStory } from '@storybook/react'
import React from 'react'
import { DatePicker } from '../src'


export default {
  title: 'Components/DatePicker',
  component: DatePicker,
}

const Template: ComponentStory<typeof DatePicker> = (args) => <DatePicker {...args} />

export const Example = Template.bind({})
Example.args = {
    label: "Appointment date"
}
