import { ComponentStory } from '@storybook/react';

import { Button } from '../Button';
import Tooltip from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export const Basic: ComponentStory<typeof Tooltip> = (args) => {
  return (
    <div tw="my-20 mx-auto w-20">
      <div tw="relative inline-block">
        <Tooltip {...args}>
          <Button>Hover Me</Button>
        </Tooltip>
      </div>
    </div>
  );
};
