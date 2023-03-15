import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Column, Table } from '@tanstack/react-table';

import { TypeWithKey } from '../../../utilities/type-with-key';
import { SearchFilter } from './SearchFilter';
import { SelectFilter } from './SelectFilter';

interface TableFilterProps {
  column: Column<any, unknown>;
  table: Table<any>;
}
const tableFilters: TypeWithKey<
  (props: TableFilterProps) => EmotionJSX.Element
> = {
  search: SearchFilter,
  select: SelectFilter,
};

export const TableFilter = (props: TableFilterProps) => {
  const filterType = props.column.columnDef.meta?.filterType;
  const Component = tableFilters[filterType as string] ?? SearchFilter;
  return <Component {...props} />;
};
