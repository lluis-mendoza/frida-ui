import {
  createContext,
  ReactElement,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import useScrollbarSize from 'react-scrollbar-size';

import { useTableContext } from './Table.context';
import { DEFAULT_COL_SIZE } from './Table.model';
import { Container, TableElement } from './Table.styled';

interface TableContainerProps {
  children: ReactElement | ReactElement[];
}
interface ITableContainerContext {
  containerRef: RefObject<HTMLDivElement>;
}

const TableContainerContext = createContext<ITableContainerContext>({
  containerRef: {} as any,
});

export const TableContainer = ({ children }: TableContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [isValid, setIsValid] = useState(false);

  const { table } = useTableContext();
  const { width: widthScrollbar } = useScrollbarSize();

  useEffect(() => {
    if (width === undefined) return;
    const columns = table.getAllColumns();

    setIsValid(true);
    const hasTableContainerColumns = columns.some(
      (column) => column.columnDef.meta?.autoSize
    );
    if (!hasTableContainerColumns) return;

    const columnsWidth = columns
      .map((column) =>
        column.columnDef.meta?.autoSize ?? false
          ? DEFAULT_COL_SIZE
          : column.getSize()
      )
      .reduce((sum, size) => sum + size, 0);
    const tableWidth = width ?? columnsWidth;
    const extraSize = Math.max(tableWidth - columnsWidth - widthScrollbar, 0);
    const columnsWithTableContainer = columns.filter(
      (column) => column.columnDef.meta?.autoSize
    );
    const extraSizePerColumn = extraSize / columnsWithTableContainer.length;

    table.setColumnSizing(
      columns.reduce(
        (a, v) => ({
          ...a,
          [v.id]:
            v.columnDef.meta?.autoSize ?? false
              ? DEFAULT_COL_SIZE + extraSizePerColumn
              : v.getSize(),
        }),
        {}
      )
    );
  }, [table, width, widthScrollbar]);

  const updateSize = () => {
    if (containerRef.current === null) return;
    const width = containerRef.current.offsetWidth;
    setWidth(width);
  };

  useEffect(() => {
    updateSize();
  }, [containerRef]);
  useEffect(() => {
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return (
    <TableContainerContext.Provider value={{ containerRef }}>
      <Container ref={containerRef}>
        {isValid && <TableElement>{children}</TableElement>}
      </Container>
    </TableContainerContext.Provider>
  );
};

export const useTableContainerContext = () => {
  const context = useContext(TableContainerContext);
  if (context === undefined) {
    throw new Error(
      'TableContainerContext must be within a TableContainerProvider'
    );
  }
  return context;
};
