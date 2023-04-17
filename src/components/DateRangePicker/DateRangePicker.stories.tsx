import { ComponentStory } from '@storybook/react';

import DateRangePicker from './DateRangePicker';

export default {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
};

const Template: ComponentStory<typeof DateRangePicker> = (args) => (
  <DateRangePicker {...args} />
);

export const Example = Template.bind({});
Example.args = {
  label: 'Appointment date',
};
