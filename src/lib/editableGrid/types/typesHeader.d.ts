export {};

declare type THeaderProps = {
  column: THeaderColumn;
  setSortBy: (arg: any[]) => void;
  dataDispatch: (arg: { [key: EDataTypes]: any }) => void;
}
declare type THeaderColumn = {
  id: string;
  created?: boolean;
  label: string;
  dataType: EDataTypes;
  getResizerProps: () => any[];
  getHeaderProps: () => any[];
}
declare type TButtonEvent = React.MouseEvent<Element>;
