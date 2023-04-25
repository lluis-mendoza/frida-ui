import { ComponentStory } from '@storybook/react';
import { useRef } from 'react';
import { useTooltipTrigger } from 'react-aria';
import { useTooltipTriggerState } from 'react-stately';

import { Button } from '../Button';
import Tooltip from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export const Basic: ComponentStory<typeof Tooltip> = (args) => {
  const props = {
    delay: 0,
  };
  const state = useTooltipTriggerState(props);
  const ref = useRef(null);
  const { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref);
  return (
    <div tw="my-20 mx-auto w-20">
      <div tw="relative inline-block">
        <div tw="relative inline-block" ref={ref} {...triggerProps}>
          <Button>Hover Me</Button>
        </div>

        <Tooltip state={state} {...tooltipProps} {...args}>
          Hello!
        </Tooltip>
      </div>
    </div>
  );
};
