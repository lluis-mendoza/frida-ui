import { ComponentStory } from '@storybook/react';

import Table from './Table';

export default {
  title: 'Components/Table',
  component: Table,
};

const columns = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
];
const data = [
  { firstName: 'Pedro', lastName: 'Picapiedra' },
  { firstName: 'Pedro', lastName: 'Martínez' },
  { firstName: 'Alberto', lastName: 'Picapiedra' },
  { firstName: 'Alberto', lastName: 'Ramírez' },
  { firstName: 'Paco', lastName: 'Merla' },
  { firstName: 'Elena', lastName: 'Nito' },
  { firstName: 'Alberto', lastName: 'Picapiedra' },
  { firstName: 'Alberto', lastName: 'Ramírez' },
  { firstName: 'Paco', lastName: 'Merla' },
  { firstName: 'Elena', lastName: 'Nito' },
  { firstName: 'Alberto', lastName: 'Picapiedra' },
  { firstName: 'Alberto', lastName: 'Ramírez' },
  { firstName: 'Paco', lastName: 'Merla' },
  { firstName: 'Elena', lastName: 'Nito' },
  { firstName: 'Alberto', lastName: 'Picapiedra' },
  { firstName: 'Alberto', lastName: 'Ramírez' },
  { firstName: 'Paco', lastName: 'Merla' },
  { firstName: 'Elena', lastName: 'Nito' },
];
export const Basic: ComponentStory<typeof Table> = (args) => {
  return (
    <div tw="h-[30rem] flex">
      <Table {...args} data={data} columns={columns} groupBy={['firstName']} />
    </div>
  );
};
