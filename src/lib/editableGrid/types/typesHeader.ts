export type HeaderProps = {
  column: HeaderColumn;
  setSortBy: ([]) => void;
  dataDispatch: ({}) => void;
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
