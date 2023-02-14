import { ComponentStory } from '@storybook/react';
import { Item, Section } from 'react-stately';

import ListView from './ListView';

export default {
  title: 'Components/ListView',
  component: ListView,
};

const Template: ComponentStory<typeof ListView> = (args) => (
  <ListView {...args}>
    <Item>Hola</Item>
    <Item>Hola</Item>
    <Item>Hola</Item>
    <Section title={<p>a</p>}>
      <Item>Hola2</Item>
    </Section>
  </ListView>
);

export const Example = Template.bind({});
Example.args = {};
