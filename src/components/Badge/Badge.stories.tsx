import { ComponentStory } from '@storybook/react';

import Badge from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['green', 'yellow', 'blue', 'red', 'gray'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md'],
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ['contained', 'outlined'],
      },
    },
    children: { control: 'text', default: 'test' },
  },
  args: {
    children: 'badge',
  },
};

export const Basic: ComponentStory<typeof Badge> = (args) => {
  return (
    <div tw="h-[30rem] flex">
      <Badge {...args} />
    </div>
  );
};
