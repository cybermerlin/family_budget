export type HeaderProps = {
  column: HeaderColumn;
  setSortBy: (arg: any[]) => void;
  dataDispatch: (arg: {[key: string]: any}) => void;
}
export type HeaderColumn = {
  id: number;
  created?: boolean;
  label: string;
  dataType: string;
  getResizerProps: () => any[];
  getHeaderProps: () => any[];
}
export type TButtonEvent = React.MouseEvent<Element>;
