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
  const isFiltered = column.getIsFiltered();
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
        <FilterSearchIcon isFiltered={isFiltered} />
      </FilterButton>
      {state.isOpen && (
        <Popover
          state={state}
          triggerRef={buttonRef}
          placement="bottom start"
          tw="mt-2"
        >
          <div tw="p-1">
            <Input
              size="sm"
              aria-label={headerName}
              type={InputType.TEXT}
              placeholder={`Buscar ${headerName}`}
              inputRef={inputRef}
              value={columnFilterValue}
              onChange={handleInputChange}
              onInput={(e) => e.stopPropagation()}
            />
          </div>
        </Popover>
      )}
    </React.Fragment>
  );
};
