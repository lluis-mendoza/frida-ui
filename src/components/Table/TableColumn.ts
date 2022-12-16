import { AccessorFn, ColumnDef } from '@tanstack/react-table';

export class TableColumn<T extends unknown> {
  private readonly id?: string;
  private readonly key: keyof T;
  private _cell?: ColumnDef<T>['cell'];
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

  cell(ele: (value: string) => JSX.Element): TableColumn<T> {
    this._cell = (info) => ele(info.getValue() as string);
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

    // @ts-expect-error: accessorFn property isn't available on ColumnDef
    if (this._accessorFn != null) column.accessorFn = this._accessorFn;

    return column;
  }
}
