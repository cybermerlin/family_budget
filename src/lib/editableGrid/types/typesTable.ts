export type TableProps = {
  columns: TColumn[];
  data: any[];
  skipReset: boolean;
  dispatch: (arg?: {}) => void;
}
export type RenderRowProps = {
  index: number,
  style: {
    heigth: number,
    left: number,
    right?: number,
    position: string,
    top: number,
    width: string,
  }
}
export type TColumn = {
  id: string;
  label: string;
  accessor: string;
  minWidth: number;
  dataType: string;
  options: any[];
  width?: number;
  maxWidth?: number;
  disableResizing?: boolean;
  isResizing?: boolean;
}
export type TRow = {
  allCells: TRowCells[];
  cells: TRowCells[];
  depth: number;
  getRowProps: (props?: {}) => {};
  id: string;
  index: number;
  original: TRowOriginal;
  originalSubRows: any[];
  subRows: any[];
  values?: string | number;
}
export type TRowCells = {
  column: TColumn[];
  row: TRow[];
  value?: string | number;
  getCellProps: () => {};
  render: (type?: string, props?: {}) => any;
}
export type TRowOriginal = {
  ID: number;
  age: number;
  email: string;
  firstName: string;
  lastName: string;
  music: string;
}
export type TUseTableProps = {
  getTableProps: () => {};
  getTableBodyProps: () => {};
  headerGroups: THeaderGroups[],
  rows: TRow[],
  prepareRow: (row: TRow) => void,
  totalColumnsWidth: number,
}
export type THeaderGroups = {
  getFooterGroupProps: (props?: {}) => any;
  getHeaderGroupProps: (props?: {}) => any;
  headers: {[key: string]: any}[];
}
