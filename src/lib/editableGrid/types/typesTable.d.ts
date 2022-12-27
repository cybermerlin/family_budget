declare type TTableProps = {
  columns: TColumn[];
  data: any[];
  skipReset: boolean;
  dispatch: (arg?: { [key: string]: any }) => void;
}
declare type TRenderRowProps = {
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
declare type TColumn = {
  id: string;
  label: string;
  accessor?: string;
  dataType: EDataTypes;
  options?: TOptionsColumn[];
  width?: number;
  maxWidth?: number;
  minWidth?: number;
  disableResizing?: boolean;
  isResizing?: boolean;
}
declare type TRow = {
  allCells: TRowCells[];
  cells: TRowCells[];
  depth: number;
  getRowProps: (props?: { [key: string]: any }) => { [key: string]: any };
  id: string;
  index: number;
  original: TRowOriginal;
  originalSubRows: any[];
  subRows: any[];
  values?: string | number;
}
declare type TRowCells = {
  column: TColumn[];
  row: TRow[];
  value?: string | number;
  getCellProps: () => { [key: string]: any };
  render: (type?: string, props?: { [key: string]: any }) => any;
}
declare type TRowOriginal = {
  ID: number;
  age: number;
  email: string;
  firstName: string;
  lastName: string;
  music: string;
}
declare type TUseTableProps = {
  getTableProps: () => { [key: string]: any };
  getTableBodyProps: () => { [key: string]: any };
  headerGroups: THeaderGroups[],
  rows: TRow[],
  prepareRow: (row: TRow) => void,
  totalColumnsWidth: number,
}
declare type THeaderGroups = {
  getFooterGroupProps: (props?: { [key: string]: any }) => any;
  getHeaderGroupProps: (props?: { [key: string]: any }) => any;
  headers: { [key: string]: any }[];
}
