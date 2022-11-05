import { useEffect, useReducer } from 'react';
import update from 'immutability-helper';

import Table from './Table';
import "./style.css";
import {
  randomColor,
  shortId,
  makeData,
  ACTION_TYPES,
  DATA_TYPES
} from './utils';


function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_OPTION_TO_COLUMN:
      let optionIndex = state.columns.findIndex(
          column => column.id === action.columnId
      );

      return update(state, {
        skipReset: { $set: true },
        columns: {
          [optionIndex]: {
            options: {
              $push: [
                {
                  label: action.option,
                  backgroundColor: action.backgroundColor
                }
              ]
            }
          }
        }
      });
    case ACTION_TYPES.ADD_ROW:
      return update(state, {
        skipReset: { $set: true },
        data: { $push: [{}] }
      });
    case ACTION_TYPES.UPDATE_COLUMN_TYPE:
      const TYPE_INDEX = state.columns.findIndex(
          column => column.id === action.columnId
      );

      switch (action.dataType) {
        case DATA_TYPES.NUMBER:
          if (state.columns[TYPE_INDEX].dataType === DATA_TYPES.NUMBER) {
            return state;
          }
          else {
            return update(state, {
              skipReset: { $set: true },
              columns: { [TYPE_INDEX]: { dataType: { $set: action.dataType } } },
              data: {
                $apply: data =>
                    data.map(row => ({
                      ...row,
                      [action.columnId]: isNaN(row[action.columnId])
                                         ? ''
                                         : Number.parseInt(row[action.columnId])
                    }))
              }
            });
          }
        case DATA_TYPES.SELECT:
          if (state.columns[TYPE_INDEX].dataType === DATA_TYPES.SELECT) {
            return state;
          }
          else {
            let options = [];

            state.data.forEach(row => {
              if (row[action.columnId]) {
                options.push({
                  label: row[action.columnId],
                  backgroundColor: randomColor()
                });
              }
            });

            return update(state, {
              skipReset: { $set: true },
              columns: {
                [TYPE_INDEX]: {
                  dataType: { $set: action.dataType },
                  options: { $push: options }
                }
              }
            });
          }
        case DATA_TYPES.TEXT:
          if (state.columns[TYPE_INDEX].dataType === DATA_TYPES.TEXT) {
            return state;
          }
          else if (state.columns[TYPE_INDEX].dataType === DATA_TYPES.SELECT) {
            return update(state, {
              skipReset: { $set: true },
              columns: { [TYPE_INDEX]: { dataType: { $set: action.dataType } } }
            });
          }
          else {
            return update(state, {
              skipReset: { $set: true },
              columns: { [TYPE_INDEX]: { dataType: { $set: action.dataType } } },
              data: {
                $apply: data =>
                    data.map(row => ({
                      ...row,
                      [action.columnId]: row[action.columnId].toString()
                    }))
              }
            });
          }
        default:
          return state;
      }
    case ACTION_TYPES.UPDATE_COLUMN_HEADER:
      const index = state.columns.findIndex(
          column => column.id === action.columnId
      );

      return update(state, {
        skipReset: { $set: true },
        columns: { [index]: { label: { $set: action.label } } }
      });
    case ACTION_TYPES.UPDATE_CELL:
      return update(state, {
        skipReset: { $set: true },
        data: {
          [action.rowIndex]: { [action.columnId]: { $set: action.value } }
        }
      });
    case ACTION_TYPES.ADD_COLUMN_TO_LEFT:
      const leftIndex = state.columns.findIndex(
          column => column.id === action.columnId
      );
      let leftId = shortId();

      return update(state, {
        skipReset: { $set: true },
        columns: {
          $splice: [
            [
              leftIndex,
              0,
              {
                id: leftId,
                label: 'Column',
                accessor: leftId,
                dataType: DATA_TYPES.TEXT,
                created: action.focus && true,
                options: []
              }
            ]
          ]
        }
      });
    case ACTION_TYPES.ADD_COLUMN_TO_RIGHT:
      const rightIndex = state.columns.findIndex(
          column => column.id === action.columnId
      );
      const rightId = shortId();

      return update(state, {
        skipReset: { $set: true },
        columns: {
          $splice: [
            [
              rightIndex + 1,
              0,
              {
                id: rightId,
                label: 'Column',
                accessor: rightId,
                dataType: DATA_TYPES.TEXT,
                created: action.focus && true,
                options: []
              }
            ]
          ]
        }
      });
    case ACTION_TYPES.DELETE_COLUMN:
      const deleteIndex = state.columns.findIndex(
          column => column.id === action.columnId
      );

      return update(state, {
        skipReset: { $set: true },
        columns: { $splice: [[deleteIndex, 1]] }
      });
    case ACTION_TYPES.ENABLE_RESET:
      return update(state, { skipReset: { $set: true } });
    default:
      return state;
  }
}

function EditableGrid() {
  const [state, dispatch] = useReducer(reducer, makeData(1000));

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.ENABLE_RESET });
  }, [state.data, state.columns]);

  return (
      <div
          className="overflow-y-hidden"
          style={{
            width: '100vw',
            height: '100vh'
          }}
      >
        <Table
            columns={state.columns}
            data={state.data}
            dispatch={dispatch}
            skipReset={state.skipReset}
        />
        <div id="popper-portal"></div>
      </div>
  );
}

export default EditableGrid;
