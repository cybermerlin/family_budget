declare type TButtonEvent = React.MouseEvent<Element>;

declare type TState = {
  columns: any[];
  data: any[];
  skipReset: boolean;
}

declare type TOptionsColumn = { label: string, backgroundColor: string }

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
  headers: Record<string, any>[];
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
