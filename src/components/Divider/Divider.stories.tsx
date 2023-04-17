import { ComponentStory } from '@storybook/react';

import { Button } from '../Button';
import Divider from './Divider';

export default {
  title: 'Components/Divider',
  component: Divider,
};

export const Vertical: ComponentStory<typeof Divider> = () => {
  return (
    <div tw="h-[30rem] w-[30rem] mx-auto">
      <Button block>Content</Button>
      <Divider>OR</Divider>
      <Button block>Content</Button>
    </div>
  );
};

export const Horizontal: ComponentStory<typeof Divider> = () => {
  return (
    <div tw="h-[30rem] w-[30rem] mx-auto flex flex-row">
      <Button block>Content</Button>
      <Divider horizontal>OR</Divider>
      <Button block>Content</Button>
    </div>
  );
};
