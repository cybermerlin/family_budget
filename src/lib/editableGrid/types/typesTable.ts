export type TableProps = {
  columns: TColumn[];
  data: any[];
  skipReset: boolean;
  dispatch: (arg?: {[key: string]: any}) => void;
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
  getRowProps: (props?: {[key: string]: any}) => {[key: string]: any};
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
  getCellProps: () => {[key: string]: any};
  render: (type?: string, props?: {[key: string]: any}) => any;
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
  getTableProps: () => {[key: string]: any};
  getTableBodyProps: () => {[key: string]: any};
  headerGroups: THeaderGroups[],
  rows: TRow[],
  prepareRow: (row: TRow) => void,
  totalColumnsWidth: number,
}
export type THeaderGroups = {
  getFooterGroupProps: (props?: {[key: string]: any}) => any;
  getHeaderGroupProps: (props?: {[key: string]: any}) => any;
  headers: {[key: string]: any}[];
}
