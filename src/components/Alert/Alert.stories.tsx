import { ComponentStory } from '@storybook/react';

import Alert from './Alert';

export default {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    message: {
      control: 'text',
    },
  },
  args: {
    message: 'Test',
  },
};

export const Basic: ComponentStory<typeof Alert> = (args) => {
  return (
    <div tw="flex flex-col gap-2 max-w-5xl mx-auto">
      <Alert {...args} variant="error" />
      <Alert {...args} variant="warning" />
      <Alert {...args} variant="success" />
      <Alert {...args} variant="info" />
    </div>
  );
};
