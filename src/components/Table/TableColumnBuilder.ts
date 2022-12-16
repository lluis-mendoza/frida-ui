import { ColumnDef } from '@tanstack/react-table';

import { TableColumn } from './TableColumn';

export class TableColumnBuilder<T> {
  headers: Array<TableColumn<T>> = [];

  addAt(
    position: number | undefined,
    idOrKey: keyof T | string,
    fn?: (column: TableColumn<T>) => TableColumn<T>,
    toAdd: boolean = true
  ): TableColumnBuilder<T> {
    if (!toAdd) return this;

    let header = new TableColumn(idOrKey);

    header = fn != null ? fn(header) : header;

    if (position === undefined) this.headers.push(header);
    else this.headers.splice(position, 0, header);

    return this;
  }

  add(
    idOrKey: keyof T | string,
    fn?: (column: TableColumn<T>) => TableColumn<T>,
    toAdd: boolean = true
  ): TableColumnBuilder<T> {
    return this.addAt(undefined, idOrKey, fn, toAdd);
  }

  build(): Array<ColumnDef<T>> {
    return this.headers.map((header) => header.build());
  }
}
