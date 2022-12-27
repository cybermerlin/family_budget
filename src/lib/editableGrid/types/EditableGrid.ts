export type TAction = {
  type: EActionTypes;
  value?: string;
  columnId?: string;
  option?: string;
  backgroundColor?: string;
  dataType?: EDataTypes;
  label?: string;
  rowIndex?: number;
  focus?: boolean;
}

/**
 * For actions for the EditableGrid column's header
 */
export enum EActionTypes {
  ADD_OPTION_TO_COLUMN = 'add_option_to_column',
  ADD_ROW = 'add_row',
  UPDATE_COLUMN_TYPE = 'update_column_type',
  UPDATE_COLUMN_HEADER = 'update_column_header',
  UPDATE_CELL = 'update_cell',
  ADD_COLUMN_TO_LEFT = 'add_column_to_left',
  ADD_COLUMN_TO_RIGHT = 'add_column_to_right',
  DELETE_COLUMN = 'delete_column',
  ENABLE_RESET = 'enable_reset'
}

export enum EDataTypes {
  NUMBER = 'number',
  TEXT = 'text',
  SELECT = 'select',
  UNDEFINED = 'null'
}

export type TCellProps = {
  value: string;
  row: { index: number };
  column: { id: string, dataType: EDataTypes, options: TOptionsColumn[] };
  dataDispatch: (arg: { [key: string]: any }) => void;
};
