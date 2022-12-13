import React, { useEffect, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

import { findFormula } from '../../plugins/math/pureMath/handlersCountCellsData';
import Badge from './Badge';
import { grey } from './colors';
import PlusIcon from './img/Plus';
import type { CellProps, OptionsColumn } from './types/typesCell'
import { DATA_TYPES, EActionTypes, randomColor } from './utils';

let selectCell = 0;

export default function Cell({
                               value: initialValue,
                               row: { index },
                               column: { id, dataType, options },
                               dataDispatch
                             }: CellProps) {
  let [value, setValue] = useState({ value: initialValue, update: false });
  let [selectRef, setSelectRef] = useState(null);
  let [selectPop, setSelectPop] = useState(null);
  let [showSelect, setShowSelect] = useState(false);
  let [showAdd, setShowAdd] = useState(false);
  let [addSelectRef, setAddSelectRef] = useState(null);
  let { styles, attributes } = usePopper(selectRef, selectPop, {
    placement: 'bottom-start',
    strategy: 'fixed'
  });

  function handleOptionKeyDown(e: React.KeyboardEvent<Element>) {
    if (e.target instanceof HTMLInputElement) {
      let target = e.target as HTMLInputElement;

      if (e.key === 'Enter') {
        if (target.value !== '') {
          dataDispatch({
            type: EActionTypes.ADD_OPTION_TO_COLUMN,
            option: e.target.value,
            backgroundColor: randomColor(),
            columnId: id
          });
        }
        setShowAdd(false);
      }
    }
  }

  function handleAddOption(e: React.MouseEvent<Element>) {
    setShowAdd(true);
  }

  function handleOptionBlur(e: React.FocusEvent<Element>) {
    if (e.target instanceof HTMLInputElement) {
      let target = e.target as HTMLInputElement;

      if (target.value !== '') {
        dataDispatch({
          type: EActionTypes.ADD_OPTION_TO_COLUMN,
          option: e.target.value,
          backgroundColor: randomColor(),
          columnId: id
        });
      }
      setShowAdd(false);
    }
  }

  function getColor() {
    let match = options.find(option => option.label === value.value);

    return (match && match.backgroundColor) || grey(200);
  }

  function onChange(e: ContentEditableEvent) {
    setValue({ value: e.target.value, update: false });
  }

  /**
   * This function is needed to prevent the saving of incomplete formulas (saves the last entered formula in the cell)
   */
  function onBlur(e: React.FocusEvent<Element>) {
    let formula = findFormula((e.target.parentNode as HTMLElement).tabIndex);

    if (formula) {
      setValue({ value: formula.result, update: true });
    }
    else {
      setValue((old) => ({ value: old.value, update: true }));
    }
  }

  /**
   * This function is needed to select text in number-cells via first click on the cell
   */
  function onClick(e: React.MouseEvent<Element>) {
    if (e.target instanceof HTMLDivElement && e.detail === 1) {
      let idCell = (e.target.parentNode as HTMLElement).tabIndex;
      let selection = window.getSelection().toString();

      if (selectCell !== idCell && !selection) {
        let range = document.createRange();
        let select = window.getSelection();

        range.selectNodeContents(e.target);
        select.removeAllRanges();
        select.addRange(range);

      } else if (selectCell !== idCell && selection) {
        window.getSelection().removeAllRanges();
        selectCell = idCell;
      }
    }
  }

  function handleOptionClick(option: OptionsColumn) {
    setValue({ value: option.label, update: true });
    setShowSelect(false);
  }

  function getCellElement() {
    switch (dataType) {
      case DATA_TYPES.TEXT:
        return (
            <ContentEditable
                html={(value.value && value.value.toString()) || ''}
                onChange={onChange}
                onBlur={onBlur}
                className="data-input data-input-text"
            />
        );
      case DATA_TYPES.NUMBER:
        return (
            <ContentEditable
                html={(value.value && value.value.toString()) || ''}
                onClick={onClick}
                onChange={onChange}
                onBlur={onBlur}
                className="data-input data-input-number text-align-right"
            />
        );
      case DATA_TYPES.SELECT:
        return (
            <>
              <div
                  ref={setSelectRef}
                  className="cell-padding d-flex cursor-default align-items-center flex-1"
                  onClick={() => setShowSelect(true)}
              >
                {value.value && (
                    <Badge value={value.value} backgroundColor={getColor()}/>
                )}
              </div>
              {showSelect && (
                  <div className="overlay" onClick={() => setShowSelect(false)}/>
              )}
              {showSelect
               && createPortal(
                      <div
                          className="shadow-5 bg-white border-radius-md"
                          ref={setSelectPop}
                          {...attributes.popper}
                          style={{
                            ...styles.popper,
                            zIndex: 4,
                            minWidth: 200,
                            maxWidth: 320,
                            maxHeight: 400,
                            padding: '0.75rem',
                            overflow: 'auto'
                          }}
                      >
                        <div
                            className="d-flex flex-wrap-wrap"
                            style={{ marginTop: '-0.5rem' }}
                        >
                          {options.map((option, io) => (
                              <div
                                  key={io}
                                  className="cursor-pointer mr-5 mt-5"
                                  onClick={() => handleOptionClick(option)}
                              >
                                <Badge
                                    value={option.label}
                                    backgroundColor={option.backgroundColor}
                                />
                              </div>
                          ))}
                          {showAdd && (
                              <div
                                  className="mr-5 mt-5 bg-grey-200 border-radius-sm"
                                  style={{
                                    width: 120,
                                    padding: '2px 4px'
                                  }}
                              >
                                <input
                                    type="text"
                                    className="option-input"
                                    onBlur={handleOptionBlur}
                                    ref={setAddSelectRef}
                                    onKeyDown={handleOptionKeyDown}
                                />
                              </div>
                          )}
                          <div
                              className="cursor-pointer mr-5 mt-5"
                              onClick={handleAddOption}
                          >
                            <Badge
                                value={
                                  <span className="svg-icon-sm svg-text">
                            <PlusIcon/>
                          </span>
                                }
                                backgroundColor={grey(200)}
                            />
                          </div>
                        </div>
                      </div>,
                      document.querySelector('#popper-portal')
                  )}
            </>
        );
      default:
        return <span></span>;
    }
  }

  useEffect(() => {
    if (addSelectRef && showAdd) {
      addSelectRef.focus();
    }
  }, [addSelectRef, showAdd]);

  useEffect(() => {
    setValue({ value: initialValue, update: false });
  }, [initialValue]);

  useEffect(() => {
    if (value.update) {
      dataDispatch({
        type: EActionTypes.UPDATE_CELL,
        columnId: id,
        rowIndex: index,
        value: value.value
      });
    }
  }, [value, dataDispatch, id, index]);

  return getCellElement();
}
