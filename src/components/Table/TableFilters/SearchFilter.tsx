import { Column, Table } from '@tanstack/react-table';
import React, { useEffect, useRef } from 'react';
import { useOverlayTriggerState } from 'react-stately';

import { useFocus } from '../../../hooks';
import { Input } from '../../Input';
import { InputType } from '../../Input/Input';
import { Popover } from '../../Popover';
import { FilterButton, FilterSearchIcon } from '../Table.styled';

export const SearchFilter = ({
  column,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) => {
  const state = useOverlayTriggerState({});
  const [inputRef, focus] = useFocus();
  const buttonRef = useRef(null);
  const columnFilterValue = (column.getFilterValue() ?? '') as string;
  const headerName =
    column.columnDef.header?.toString().toLocaleLowerCase() ?? '';
  const hasFilterValue = columnFilterValue.length > 0;
  useEffect(() => {
    if (state.isOpen) focus();
  }, [state.isOpen, focus]);
  const handleButtonClick = () => {
    state.toggle();
  };
  const handleInputChange = (value: string) => {
    column.setFilterValue(value);
  };
  return (
    <React.Fragment>
      <FilterButton ref={buttonRef} onClick={handleButtonClick}>
        <FilterSearchIcon hasFilterValue={hasFilterValue} />
      </FilterButton>
      {state.isOpen && (
        <Popover
          state={state}
          triggerRef={buttonRef}
          placement="bottom end"
          tw="mt-2"
        >
          <div tw="p-1">
            <Input
              size="sm"
              type={InputType.TEXT}
              placeholder={`Buscar ${headerName}`}
              inputRef={inputRef}
              value={columnFilterValue}
              onChange={handleInputChange}
            />
          </div>
        </Popover>
      )}
    </React.Fragment>
  );
};
