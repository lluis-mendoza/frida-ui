import { Table } from '@tanstack/react-table';
import { createContext, RefObject, useContext } from 'react';

import { RowFocused } from './Table.model';

interface IProps extends ITableContext {
  children: React.ReactNode;
}

interface ITableContext {
  table: Table<any>;
  containerRef: RefObject<HTMLDivElement>;
  onClick?: (index: number) => void;
  onDoubleClick?: (index: number) => void;
  onKeyboardUpdate?: (index: number) => void;
  rowFocused: RowFocused;
  rowsDisabled: number[];
  scrollDown?: boolean;
  setScrollDown?: (data: boolean) => void;
  enableKeyboard?: boolean;
  loading?: boolean;
}

const TableContext = createContext<ITableContext>({
  table: {} as any,
  containerRef: {} as any,
  onClick: () => undefined,
  onDoubleClick: () => undefined,
  onKeyboardUpdate: () => undefined,
  rowFocused: null,
  rowsDisabled: [],
  scrollDown: false,
  setScrollDown: () => undefined,
  enableKeyboard: undefined,
  loading: undefined,
});
export const TableProvider = ({ children, ...props }: IProps) => {
  return (
    <TableContext.Provider value={{ ...props }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error('TableContext must be within a TableProvider');
  }
  return context;
};
