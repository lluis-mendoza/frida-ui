import { ComponentStory } from '@storybook/react';
import { FaCheck, FaTelegramPlane } from 'react-icons/fa';

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
};

export const Variants: ComponentStory<typeof Button> = (args) => {
  return (
    <div tw="flex flex-row justify-center items-center gap-4 my-10">
      <Button variant="contained" {...args}>
        Button
      </Button>
      <Button variant="outlined" {...args}>
        Button
      </Button>
      <Button variant="text" {...args}>
        Button
      </Button>
    </div>
  );
};
export const Sizes: ComponentStory<typeof Button> = (args) => {
  return (
    <div tw="flex flex-row justify-center items-center gap-4 my-10">
      <Button size="sm" {...args}>
        Button
      </Button>
      <Button size="md" {...args}>
        Button
      </Button>
      <Button size="lg" {...args}>
        Button
      </Button>
    </div>
  );
};
export const Colors: ComponentStory<typeof Button> = (args) => {
  return (
    <div tw="flex flex-row justify-center items-center gap-4 my-10">
      <Button color="primary" {...args}>
        Button
      </Button>
      <Button color="success" {...args}>
        Button
      </Button>
      <Button color="info" {...args}>
        Button
      </Button>
      <Button color="warning" {...args}>
        Button
      </Button>
      <Button color="error" {...args}>
        Button
      </Button>
    </div>
  );
};
export const Icons: ComponentStory<typeof Button> = (args) => {
  return (
    <div tw="flex flex-row justify-center items-center gap-4 my-10">
      <Button prefix={<FaTelegramPlane />} {...args}>
        Button
      </Button>
      <Button sufix={<FaCheck />} {...args}>
        Button
      </Button>
    </div>
  );
};
export const Loading: ComponentStory<typeof Button> = (args) => {
  return (
    <div tw="flex flex-row justify-center items-center gap-4 my-10">
      <Button loading {...args}>
        Button
      </Button>
    </div>
  );
};
export const Block: ComponentStory<typeof Button> = (args) => (
  <Button {...args} block>
    Button
  </Button>
);
