export type TState = {
  columns: any[];
  data: any[];
  skipReset: boolean;
}
export type TAction = {
  type: string;
  value?: string;
  columnId?: string;
  option?: string;
  backgroundColor?: string;
  dataType?: string;
  label?: string;
  rowIndex?: number;
  focus?: boolean;
}
