import { ComponentStory } from '@storybook/react';
import { FaCheck, FaTelegramPlane } from 'react-icons/fa';

import { Group } from '../../styled-components';
import ToggleButton from './ToggleButton';
export default {
  title: 'Components/ToggleButton',
  component: ToggleButton,
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
  args: {
    children: 'ToggleButton',
  },
};

export const Sizes: ComponentStory<typeof ToggleButton> = (args) => {
  return (
    <div tw="flex flex-row justify-center items-center gap-4 my-10">
      <ToggleButton size="sm" {...args} />
      <ToggleButton size="md" {...args} />
      <ToggleButton size="lg" {...args} />
    </div>
  );
};
export const Colors: ComponentStory<typeof ToggleButton> = (args) => {
  return (
    <div tw="flex flex-row justify-center items-center gap-4 my-10">
      <ToggleButton color="primary" {...args} />
      <ToggleButton color="success" {...args} />
      <ToggleButton color="info" {...args} />
      <ToggleButton color="warning" {...args} />
      <ToggleButton color="error" {...args} />
    </div>
  );
};
export const Icons: ComponentStory<typeof ToggleButton> = (args) => {
  return (
    <div tw="flex flex-row justify-center items-center gap-4 my-10">
      <ToggleButton prefix={<FaTelegramPlane />} {...args} />
      <ToggleButton sufix={<FaCheck />} {...args} />
    </div>
  );
};
export const Block: ComponentStory<typeof ToggleButton> = (args) => (
  <ToggleButton {...args} block />
);

export const GroupToggleButton: ComponentStory<typeof ToggleButton> = (
  args
) => (
  <Group>
    <ToggleButton {...args} prefix={<FaCheck tw="w-6 h-6" />} color="error" />
    <ToggleButton {...args} prefix={<FaTelegramPlane tw="w-6 h-6" />} />
    <ToggleButton {...args} prefix={<FaTelegramPlane tw="w-6 h-6" />} />
  </Group>
);
