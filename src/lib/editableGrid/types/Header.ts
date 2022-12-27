import { EDataTypes } from "./EditableGrid";


export declare type THeaderProps = {
  column: THeaderColumn;
  setSortBy: (arg: any[]) => void;
  dataDispatch: (arg: Record<string, any>) => void;
}

export declare type THeaderColumn = {
  id: string;
  created?: boolean;
  label: string;
  dataType: EDataTypes;
  getResizerProps: () => any[];
  getHeaderProps: () => any[];
}
