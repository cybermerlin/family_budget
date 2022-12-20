import { faker } from '@faker-js/faker/locale/ru';

//#region StringOfLength
type StringOfLength<TMin extends number, TMax extends number> = string & {
  readonly STRING_OF_LENGTH: unique symbol
};

// This is a type guard function which can be used to assert that a string
// is of type StringOfLength<Min,Max>
let isStringOfLength = <TMin extends number, TMax extends number>(
    str: string,
    min: TMin,
    max: TMax
): str is StringOfLength<TMin, TMax> => str.length >= min && str.length <= max;

// Type constructor function
export function stringOfLength<TMin extends number, TMax extends number>(input: unknown, min: TMin, max: TMax)
    : StringOfLength<TMin, TMax> {
  if (typeof input !== "string") {
    throw new Error("invalid input");
  }

  if (!isStringOfLength(input, min, max)) {
    throw new Error("input is not between specified min and max");
  }

  return input;
}

//#endregion

export function random(): number {
  return parseInt(crypto.getRandomValues(new Uint32Array(2)).toString().replace(',', ''));
}

export function shortId(): StringOfLength<8, 8> {
  return <StringOfLength<9, 9>>`_${random().toString(36).slice(0, 7)}`;
}

export function randomColor() {
  return `hsl(${Math.floor(random() * 360)}, 95%, 90%)`;
}

export function makeData(count: number) {
  let data = [];
  let options = [];

  for (let i = 0; i < count; i++) {
    let row = {
      ID: faker.mersenne.rand(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      age: Math.floor(20 + random() * 20),
      music: faker.music.genre()
    };

    options.push({ label: row.music, backgroundColor: randomColor() });

    data.push(row);
  }

  let columns = [
    {
      id: 'firstName',
      label: 'First Name',
      accessor: 'firstName',
      minWidth: 100,
      dataType: DATA_TYPES.TEXT,
      options: []
    },
    {
      id: 'lastName',
      label: 'Last Name',
      accessor: 'lastName',
      minWidth: 100,
      dataType: DATA_TYPES.TEXT,
      options: []
    },
    {
      id: 'age',
      label: 'Age',
      accessor: 'age',
      width: 80,
      dataType: DATA_TYPES.NUMBER,
      options: []
    },
    {
      id: 'email',
      label: 'E-Mail',
      accessor: 'email',
      width: 300,
      dataType: DATA_TYPES.TEXT,
      options: []
    },
    {
      id: 'music',
      label: 'Music Preference',
      accessor: 'music',
      dataType: DATA_TYPES.SELECT,
      width: 200,
      options: options
    },
    {
      id: 999999,
      width: 20,
      label: '+',
      disableResizing: true,
      dataType: 'null'
    }
  ];

  return { columns: columns, data: data, skipReset: false };
}


/**
 * For actions for the EditableGrid
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


export const DATA_TYPES = {
  NUMBER: 'number',
  TEXT: 'text',
  SELECT: 'select'
}
