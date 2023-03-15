import { Dispatch, SetStateAction, useState } from 'react';

export type TableRowSelectionState = Record<string, boolean>;
export interface RowSelectionState {
  rowSelection: TableRowSelectionState;
  setRowSelection: Dispatch<SetStateAction<TableRowSelectionState>>;
  toggleSelection: (index: number) => void;
  reset: () => void;
}
export const EmptyRowSelectionState: RowSelectionState = {
  rowSelection: {},
  setRowSelection: () => undefined,
  toggleSelection: () => undefined,
  reset: () => undefined,
};
export const useRowSelection = (): RowSelectionState => {
  const [rowSelection, setRowSelection] = useState<TableRowSelectionState>({});

  const toggleSelection = (index: number) => {
    setRowSelection((_rowSelection) => ({
      ..._rowSelection,
      [index]: !_rowSelection[index],
    }));
  };
  const reset = () => {
    if (Object.keys(rowSelection).length > 0) setRowSelection({});
  };
  return { rowSelection, setRowSelection, toggleSelection, reset };
};
