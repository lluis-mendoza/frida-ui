import { ComponentStory } from '@storybook/react';

import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
};

export const Basic: ComponentStory<typeof Input> = (args) => {
  return (
    <div tw="h-[30rem] flex">
      <Input {...args} />
    </div>
  );
};

Basic.args = {
  label: 'Appointment date',
  isRequired: true,
};
