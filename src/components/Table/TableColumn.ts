import {
  AccessorFn,
  ColumnDef,
  GroupingColumnDef,
  Row,
} from '@tanstack/react-table';

export class TableColumn<T extends unknown> {
  private readonly id?: string;
  private readonly key: keyof T;
  private _cell?: ColumnDef<T>['cell'];
  private _aggregatedCell?: GroupingColumnDef<T, unknown>['aggregatedCell'];
  private _aggregationFn?: GroupingColumnDef<T, unknown>['aggregationFn'];

  private _accessorFn?: AccessorFn<T>;
  private _header?: ColumnDef<T>['header'];
  private _footer?: ColumnDef<T>['footer'];
  private _meta?: ColumnDef<T>['meta'];
  private _size?: ColumnDef<T>['size'];
  private _enableColumnFilter?: ColumnDef<T>['enableColumnFilter'];

  constructor(idOrKey: keyof T | string) {
    this.id = idOrKey as string;
    this.key = idOrKey as keyof T;
  }

  cell(ele: (value: unknown) => JSX.Element): TableColumn<T> {
    this._cell = (info) => ele(info.getValue());
    return this;
  }

  aggregatedCell(ele: (value: unknown) => JSX.Element): TableColumn<T> {
    this._aggregatedCell = (info) => ele(info.getValue());
    return this;
  }

  aggregatedFn(
    fn: (
      columnId: string,
      leafRows: Array<Row<T>>,
      childRows: Array<Row<T>>
    ) => unknown
  ): TableColumn<T> {
    this._aggregationFn = fn;
    return this;
  }

  header(header: ColumnDef<T>['header']): TableColumn<T> {
    this._header = header;
    return this;
  }

  footer(footer: ColumnDef<T>['footer']): TableColumn<T> {
    this._footer = footer;
    return this;
  }

  meta(meta: ColumnDef<T>['meta']): TableColumn<T> {
    this._meta = meta;
    return this;
  }

  enableColumnFilter(
    enableColumnFilter: ColumnDef<T>['enableColumnFilter']
  ): TableColumn<T> {
    this._enableColumnFilter = enableColumnFilter;
    return this;
  }

  size(size: ColumnDef<T>['size']): TableColumn<T> {
    this._size = size;
    return this;
  }

  accessorFn(fn: (row: T, index: number) => unknown): TableColumn<T> {
    this._accessorFn = fn;
    return this;
  }

  build(): ColumnDef<T> {
    const column: ColumnDef<T> = {
      id: this.id,
      header: this._header ?? this.id,
      footer: this._footer,
      accessorKey: this.key,
      accessorFn: this._accessorFn,
      enableColumnFilter: this._enableColumnFilter,
      meta: this._meta,
      size: this._size,
    };
    if (this._cell !== undefined) {
      column.cell = this._cell;
    }
    if (this._aggregatedCell !== undefined) {
      column.aggregatedCell = this._aggregatedCell;
    }
    if (this._aggregationFn !== undefined) {
      column.aggregationFn = this._aggregationFn;
    }
    if (this._accessorFn != null)
      // @ts-expect-error: accessorFn property isn't available on ColumnDef
      column.accessorFn = this._accessorFn;

    return column;
  }
}
