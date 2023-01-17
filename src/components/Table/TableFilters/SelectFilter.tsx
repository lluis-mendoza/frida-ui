import { Column, Table } from '@tanstack/react-table';
import React, { useEffect, useRef } from 'react';
import { BiFilter } from 'react-icons/bi';
import { useOverlayTriggerState } from 'react-stately';

import { Popover } from '../../Popover';

export const SelectFilter = ({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) => {
  const state = useOverlayTriggerState({});
  const buttonRef = useRef(null);
  useEffect(() => {
    state.open();
  }, [state]);
  return (
    <React.Fragment>
      <button ref={buttonRef}>
        <BiFilter />
      </button>
      <Popover state={state} triggerRef={buttonRef}>
        Hola
      </Popover>
    </React.Fragment>
  );
};
