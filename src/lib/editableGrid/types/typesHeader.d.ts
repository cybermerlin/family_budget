declare type HeaderProps = {
  column: HeaderColumn;
  setSortBy: (arg: any[]) => void;
  dataDispatch: (arg: { [key: string]: any }) => void;
}
declare type HeaderColumn = {
  id: number;
  created?: boolean;
  label: string;
  dataType: string;
  getResizerProps: () => any[];
  getHeaderProps: () => any[];
}
declare type TButtonEvent = React.MouseEvent<Element>;
