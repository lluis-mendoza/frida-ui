import { ComponentStory } from '@storybook/react';
import { FaCheck, FaTelegramPlane } from 'react-icons/fa';

import { Group } from '../../styled-components';
import Button from './Button';
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
  args: {
    children: 'Button',
  },
};

export const Variants: ComponentStory<typeof Button> = (args) => {
  return (
    <div tw="flex flex-row justify-center items-center gap-4 my-10">
      <Button variant="contained" {...args} />
      <Button variant="outlined" {...args} />
      <Button variant="text" {...args} />
    </div>
  );
};
export const Sizes: ComponentStory<typeof Button> = (args) => {
  return (
    <div tw="flex flex-row justify-center items-center gap-4 my-10">
      <Button size="sm" {...args} />
      <Button size="md" {...args} />
      <Button size="lg" {...args} />
    </div>
  );
};
export const Colors: ComponentStory<typeof Button> = (args) => {
  return (
    <div tw="flex flex-row justify-center items-center gap-4 my-10">
      <Button color="primary" {...args} />
      <Button color="success" {...args} />
      <Button color="info" {...args} />
      <Button color="warning" {...args} />
      <Button color="error" {...args} />
    </div>
  );
};
export const Icons: ComponentStory<typeof Button> = (args) => {
  return (
    <div tw="flex flex-row justify-center items-center gap-4 my-10">
      <Button prefix={<FaTelegramPlane />} {...args} />
      <Button sufix={<FaCheck />} {...args} />
    </div>
  );
};
export const Loading: ComponentStory<typeof Button> = (args) => {
  return (
    <div tw="flex flex-row justify-center items-center gap-4 my-10">
      <Button isLoading {...args} />
    </div>
  );
};
export const Block: ComponentStory<typeof Button> = (args) => (
  <Button {...args} block />
);

export const GroupButton: ComponentStory<typeof Button> = (args) => (
  <Group>
    <Button {...args} block>
      Button
    </Button>
    <Button {...args} block>
      Button
    </Button>
    <Button {...args} block>
      Button
    </Button>
  </Group>
);
