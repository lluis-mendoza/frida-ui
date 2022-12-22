import { Table } from '@tanstack/react-table';
import { createContext, useContext } from 'react';

import { RowFocused } from './Table.model';

interface IProps {
  children: React.ReactNode;
  table: Table<any>;
  onClick?: (index: number) => void;
  onDoubleClick?: (index: number) => void;
  onKeyboardUpdate?: (index: number) => void;
  rowFocused: RowFocused;
  scrollDown?: boolean;
  setScrollDown?: (data: boolean) => void;
  enableKeyboard?: boolean;
}

interface ITableContext {
  table: Table<any>;
  onClick?: (index: number) => void;
  onDoubleClick?: (index: number) => void;
  onKeyboardUpdate?: (index: number) => void;
  rowFocused: RowFocused;
  scrollDown?: boolean;
  setScrollDown?: (data: boolean) => void;
  enableKeyboard?: boolean;
}

const TableContext = createContext<ITableContext>({
  table: {} as any,
  onClick: () => undefined,
  onDoubleClick: () => undefined,
  onKeyboardUpdate: () => undefined,
  rowFocused: null,
  scrollDown: false,
  setScrollDown: () => undefined,
  enableKeyboard: undefined,
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
