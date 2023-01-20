import { Column, Row, RowData, Table } from '@tanstack/react-table';
import React, { useRef } from 'react';
import { BiFilter } from 'react-icons/bi';
import { useOverlayTriggerState } from 'react-stately';

import { Checkbox } from '../../Checkbox';
import { Popover } from '../../Popover';
import { FilterButton } from '../Table.styled';

const multiSelectFilter = <TData extends RowData>(
  row: Row<TData>,
  columnId: string,
  filterValue: string[]
) => {
  return (
    filterValue.length === 0 || filterValue.includes(row.getValue(columnId))
  );
};
export const SelectFilter = ({
  column,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) => {
  const state = useOverlayTriggerState({});
  column.columnDef.filterFn = multiSelectFilter;
  const columnFilterValues = (column.getFilterValue() ?? []) as string[];
  const buttonRef = useRef(null);
  const uniqueValues = Array.from(
    column.getFacetedUniqueValues().keys()
  ) as string[];

  const handleButtonClick = () => {
    state.toggle();
  };
  const handleChangeCheckbox = (isSelected: boolean, value: string) => {
    if (isSelected) column.setFilterValue([value, ...columnFilterValues]);
    else column.setFilterValue(columnFilterValues.filter((e) => e !== value));
  };
  return (
    <React.Fragment>
      <FilterButton ref={buttonRef} onClick={handleButtonClick}>
        <BiFilter />
      </FilterButton>
      {state.isOpen && (
        <Popover
          state={state}
          triggerRef={buttonRef}
          placement="bottom end"
          tw="mt-2"
        >
          <div tw="p-1">
            {uniqueValues.map((value, index) => (
              <div key={index} tw="flex flex-row gap-2">
                <Checkbox
                  isSelected={columnFilterValues.includes(value)}
                  onChange={(isSelected) =>
                    handleChangeCheckbox(isSelected, value)
                  }
                />
                <span tw="text-base text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </Popover>
      )}
    </React.Fragment>
  );
};
