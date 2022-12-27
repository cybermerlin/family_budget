import { EDataTypes } from './EditableGrid';


export type TColumn = {
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

export declare type TRowCells = {
  column: TColumn[];
  row: TRow[];
  value?: string | number;
  getCellProps: () => { [key: string]: any };
  render: (type?: string, props?: { [key: string]: any }) => any;
}

export declare type TTableProps = {
  columns: TColumn[];
  data: any[];
  skipReset: boolean;
  dispatch: (arg?: Record<string, any>) => void;
}
