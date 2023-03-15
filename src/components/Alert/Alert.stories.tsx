import { ComponentStory } from '@storybook/react';

import { Alert } from './Alert';

export const Variants: ComponentStory<typeof Alert> = (args) => {
  return (
    <div tw="flex flex-row justify-center items-center gap-4 my-10">
      <Alert {...args} />
    </div>
  );
};
