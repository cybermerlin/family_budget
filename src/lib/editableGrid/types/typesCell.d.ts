declare type CellProps = {
  value: string;
  row: { index: number };
  column: { id: string, dataType: string, options: OptionsColumn[] };
  dataDispatch: (arg: { [key: string]: any }) => void;
}
declare type OptionsColumn = { label: string, backgroundColor: string }
