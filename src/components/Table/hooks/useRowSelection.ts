import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export type TableRowSelectionState = Record<string, boolean>;
export interface RowSelectionState {
  rowSelection: TableRowSelectionState;
  setRowSelection: Dispatch<SetStateAction<TableRowSelectionState>>;
  reset: () => void;
}
export const EmptyRowSelectionState: RowSelectionState = {
  rowSelection: {},
  setRowSelection: () => undefined,
  reset: () => undefined,
};
export const useRowSelection = (): RowSelectionState => {
  const [rowSelection, setRowSelection] = useState<TableRowSelectionState>({});

  const reset = useCallback(() => {
    if (Object.keys(rowSelection).length > 0) setRowSelection({});
  }, [rowSelection]);
  return { rowSelection, setRowSelection, reset };
};
