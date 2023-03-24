import { ComponentStory } from '@storybook/react';

import Spinner from './Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['primary', 'success', 'info', 'warning', 'error'],
      },
    },
  },
};

export const Example: ComponentStory<typeof Spinner> = (args) => {
  return (
    <div tw="flex flex-row justify-center items-center gap-4 my-10">
      <Spinner {...args} tw="h-[10rem] w-[10rem]" />
    </div>
  );
};
