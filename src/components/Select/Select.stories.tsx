import { ComponentStory } from '@storybook/react';
import { Item } from 'react-stately';

import Select from './Select';

export default {
  title: 'Components/Select',
  component: Select,
};

const data = [
  { id: 1, name: 'Paco' },
  { id: 2, name: 'Pedro' },
];
export const Basic: ComponentStory<typeof Select> = (args) => {
  return (
    <div tw="h-[30rem] flex">
      <Select {...args} items={data}>
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </Select>
    </div>
  );
};
