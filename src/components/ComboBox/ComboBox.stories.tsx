import { ComponentStory } from '@storybook/react';
import { Item } from 'react-stately';

import ComboBox from './ComboBox';

export default {
  title: 'Components/ComboBox',
  component: ComboBox,
};
const data = [
  { id: 1, name: 'Paco' },
  { id: 2, name: 'Pedro' },
];
export const Basic: ComponentStory<typeof ComboBox> = (args) => {
  return (
    <div tw="h-[30rem] flex">
      <ComboBox {...args} defaultItems={data}>
        {(item) => <Item>{item.name}</Item>}
      </ComboBox>
    </div>
  );
};
Basic.args = {
  label: 'Appointment date',
  isRequired: true,
};
