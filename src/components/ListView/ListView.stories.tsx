import { ComponentStory } from '@storybook/react';
import { Item } from 'react-stately';

import ListView from './ListView';

export default {
  title: 'Components/ListView',
  component: ListView,
};

const Template: ComponentStory<typeof ListView> = (args) => (
  <div tw="w-[40rem] h-[30rem] flex mx-auto">
    <ListView {...args} label="Test list" selectionMode="multiple">
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item>Hola</Item>
      <Item title={<p>o</p>}>
        <Item title={<p>a</p>}>
          <Item>Node</Item>
        </Item>
        <Item title={<p>b</p>}>
          <Item>Node</Item>
        </Item>
        <Item>c</Item>
      </Item>
    </ListView>
  </div>
);

export const Example = Template.bind({});
Example.args = {};
