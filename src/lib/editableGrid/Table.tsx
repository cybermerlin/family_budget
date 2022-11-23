import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { useBlockLayout, useResizeColumns, useSortBy, useTable } from 'react-table';
import { FixedSizeList } from 'react-window';

import Cell from './Cell';
import Header from './Header';
import PlusIcon from './img/Plus';
import scrollbarWidth from './scrollbarWidth';
import type { RenderRowProps, TableProps, TRow, TRowCells, TUseTableProps } from './types/typesTable'
import { EActionTypes } from './utils';


let defaultColumn = {
  minWidth: 50,
  width: 150,
  maxWidth: 400,
  Cell: Cell,
  Header: Header,
  sortType: 'alphanumericFalsyLast'
};


export default function Table({
                                columns,
                                data,
                                dispatch: dataDispatch,
                                skipReset
                              }: TableProps) {

  let sortTypes = useMemo(
      () => ({
        alphanumericFalsyLast(rowA: TRow, rowB: TRow, columnId: string, desc: boolean): number | string {

          if (!rowA.values[columnId] && !rowB.values[columnId]) {
            return 0;
          }

          if (!rowA.values[columnId]) {
            return desc ? -1 : 1;
          }

          if (!rowB.values[columnId]) {
            return desc ? 1 : -1;
          }

          return isNaN(rowA.values[columnId])
                 ? rowA.values[columnId].localeCompare(rowB.values[columnId])
                 : rowA.values[columnId] - rowB.values[columnId];
        }
      }),
      []
  );

  let {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth
  }: TUseTableProps = useTable(
      {
        columns,
        data,
        defaultColumn,
        dataDispatch,
        autoResetSortBy: !skipReset,
        autoResetFilters: !skipReset,
        autoResetRowState: !skipReset,
        sortTypes
      },
      useBlockLayout,
      useResizeColumns,
      useSortBy
  );

  let tabindexCell = 0;

  let RenderRow = useCallback(
      ({ index, style }: RenderRowProps) => {
        let row = rows[index];

        prepareRow(row);

        return (
            <div {...row.getRowProps({ style })} className="tr" key={crypto.randomUUID()}>
              {row.cells.map((cell, icell) => (
                  <div {...cell.getCellProps()} tabIndex={tabindexCell++} className="td" key={icell}>
                    {cell.render('Cell')}
                  </div>
              ))}
            </div>
        );
      },
      [prepareRow, rows, tabindexCell]
  );

  function isTableResizing() {
    for (let headerGroup of headerGroups) {
      for (let column of headerGroup.headers) {
        if (column.isResizing) {
          return true;
        }
      }
    }

    return false;
  }

  return (
      <>
        <div
            key={crypto.randomUUID()}
            {...getTableProps()}
            className={clsx('table', isTableResizing() && 'noselect')}
        >
          <div key={crypto.randomUUID()}>
            {headerGroups.map((headerGroup, index) => (
                <div
                    {...headerGroup.getHeaderGroupProps()}
                    className="tr"
                    key={index}
                >
                  <>
                    {headerGroup.headers.map((column: TRowCells, icol) =>
                        (<div key={icol}>{column.render('Header')}</div>))}
                  </>
                </div>
            ))}
          </div>

          <div {...getTableBodyProps()} key={crypto.randomUUID()}>
            <FixedSizeList
                height={window.innerHeight - 100}
                itemCount={rows.length}
                itemSize={40}
                width={totalColumnsWidth + scrollbarWidth()}
            >
              {RenderRow}
            </FixedSizeList>
            <div
                className="tr add-row"
                onClick={() => dataDispatch({ type: EActionTypes.ADD_ROW })}
            >
            <span className="svg-icon svg-gray icon-margin">
              <PlusIcon/>
            </span>
              New
            </div>
          </div>
        </div>
      </>
  );
}
