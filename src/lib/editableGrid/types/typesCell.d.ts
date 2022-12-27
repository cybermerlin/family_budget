declare type TCellProps = {
  value: string;
  row: { index: number };
  column: { id: string, dataType: EDataTypes, options: TOptionsColumn[] };
  dataDispatch: (arg: { [key: string]: any }) => void;
}

declare type TOptionsColumn = { label: string, backgroundColor: string }
