import update from 'immutability-helper';
import { useEffect, useReducer } from 'react';

import './style.scss';
import Table from './Table';
import { EActionTypes, EDataTypes, TAction } from './types/EditableGrid';
import { makeData, randomColor, shortId } from './utils';


function reducer(state: TState, action: TAction) {
  switch (action.type) {
    case EActionTypes.ADD_OPTION_TO_COLUMN:
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
    case EActionTypes.ADD_ROW:
      return update(state, {
        skipReset: { $set: true },
        data: { $push: [{}] }
      });
    case EActionTypes.UPDATE_COLUMN_TYPE:
      const TYPE_INDEX = state.columns.findIndex(
          column => column.id === action.columnId
      );

      switch (action.dataType) {
        case EDataTypes.NUMBER:
          if (state.columns[TYPE_INDEX].dataType === EDataTypes.NUMBER) {
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
        case EDataTypes.SELECT:
          if (state.columns[TYPE_INDEX].dataType === EDataTypes.SELECT) {
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
        case EDataTypes.TEXT:
          if (state.columns[TYPE_INDEX].dataType === EDataTypes.TEXT) {
            return state;
          }
          else if (state.columns[TYPE_INDEX].dataType === EDataTypes.SELECT) {
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
    case EActionTypes.UPDATE_COLUMN_HEADER:
      let index = state.columns.findIndex(
          column => column.id === action.columnId
      );

      return update(state, {
        skipReset: { $set: true },
        columns: { [index]: { label: { $set: action.label } } }
      });
    case EActionTypes.UPDATE_CELL:
      return update(state, {
        skipReset: { $set: true },
        data: {
          [action.rowIndex]: { [action.columnId]: { $set: action.value } }
        }
      });
    case EActionTypes.ADD_COLUMN_TO_LEFT:
      let leftIndex = state.columns.findIndex(
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
                dataType: EDataTypes.TEXT,
                created: action.focus && true,
                options: []
              }
            ]
          ]
        }
      });
    case EActionTypes.ADD_COLUMN_TO_RIGHT:
      let rightIndex = state.columns.findIndex(
          column => column.id === action.columnId
      );
      let rightId = shortId();

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
                dataType: EDataTypes.TEXT,
                created: action.focus && true,
                options: []
              }
            ]
          ]
        }
      });
    case EActionTypes.DELETE_COLUMN:
      let deleteIndex = state.columns.findIndex(
          column => column.id === action.columnId
      );

      return update(state, {
        skipReset: { $set: true },
        columns: { $splice: [[deleteIndex, 1]] }
      });
    case EActionTypes.ENABLE_RESET:
      return update(state, { skipReset: { $set: true } });
    default:
      return state;
  }
}

function EditableGrid() {
  let [state, dispatch] = useReducer(reducer, makeData(10));

  useEffect(() => {
    dispatch({ type: EActionTypes.ENABLE_RESET });
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
