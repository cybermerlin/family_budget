import { useCallback, useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { EActionTypes, EDataTypes, TCellProps } from 'src/lib/editableGrid/types/EditableGrid';
import { findFormula } from 'src/plugins/math/pureMath/handlersCountCellsData';
import Badge from './Badge';
import { gray } from './colors';
import PlusIcon from './img/Plus';
import { randomColor } from './utils';


/**
 * New template for Cell.
 * @param {string} initialValue
 * @param {number} index
 * @param {string} id
 * @param {EDataTypes} dataType
 * @param {TOptionsColumn[]} options
 * @param {(arg: {[p: string]: any}) => void} dataDispatch
 * @returns {JSX.Element}
 * @constructor
 */
export default function Cell({
                               value: initialValue,
                               row: { index },
                               column: { id, dataType, options },
                               dataDispatch
                             }: TCellProps): JSX.Element {
  let [value, setValue] = useState({ value: initialValue, update: false }),
      el = useRef(null),
      fnOnBlur = useCallback(() => { _onBlur(); }, []),
      fnOnFocus = useCallback(() => { _onFocus(); }, []),
      fnOnChange = useCallback(() => { _onChange(value); }, [value]);
  let [selectRef, setSelectRef] = useState(null);
  let [selectPop, setSelectPop] = useState(null);
  let [showSelect, setShowSelect] = useState(false);
  let [showAdd, setShowAdd] = useState(false);
  let [addSelectRef, setAddSelectRef] = useState(null);
  let { styles, attributes } = usePopper(selectRef, selectPop, {
    placement: 'bottom-start',
    strategy: 'fixed'
  });

  function handleOptionKeyDown(e: React.KeyboardEvent) {
    if (e.target instanceof HTMLInputElement && e.key === 'Enter') {
      if (e.target.value !== '') {

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

  function handleAddOption() {
    setShowAdd(true);
  }

  function handleOptionBlur(e: React.FocusEvent) {

    if (e.target instanceof HTMLInputElement) {
      if (e.target.value) {

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

    return (match && match.backgroundColor) || gray(200);
  }

  function _onChange(value) {
    setValue({ value, update: false });
  }

  /**
   * This function is needed to prevent the saving of incomplete formulas (saves the last entered formula in the cell)
   */
  function _onBlur() {
    if (value.value === el.current.lastHtml) {
      return;
    }

    let idCell = (el.current.el.current.parentNode as HTMLElement).id,
        formula = findFormula(idCell);

    if (formula) {
      setValue({ value: formula.result, update: true });
    }
    else {
      setValue((old) => ({ value: old.value, update: true }));
    }
  }

  function _onFocus() {
    selectInnerText(el.current.el.current);
  }

  function selectInnerText(node: HTMLDivElement) {
    let range = document.createRange(),
        selection = window.getSelection();

    selection.removeAllRanges();
    range.selectNodeContents(node);
    selection.addRange(range);
  }

  function handleOptionClick(option: TOptionsColumn) {
    setValue({ value: option.label, update: true });
    setShowSelect(false);
  }

  /**
   * Returns prepared JSX.Element by inputted DataType.
   * @param {EDataTypes} type
   * @returns {JSX.Element}
   */
  function _getCellElement(type: EDataTypes): JSX.Element {
    switch (type) {
      case EDataTypes.TEXT:
        return _getHTMLOfTextCell();
      case EDataTypes.NUMBER:
        return _getHTMLOfNumberCell();
      case EDataTypes.SELECT:
        return _getHTMLOfSelectCell();
      default:
        return <span></span>;
    }
  }

  /**
   * Return an Element for the Cell with DataType.SELECT.
   * @returns {JSX.Element}
   * @private
   */
  function _getHTMLOfSelectCell(): JSX.Element {
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
                            backgroundColor={gray(200)}
                        />
                      </div>
                    </div>
                  </div>,
                  document.querySelector('#popper-portal')
              )}
        </>
    );
  }

  /**
   * Return an Element for the Cell with DataType.Number.
   * @returns {JSX.Element}
   * @private
   */
  function _getHTMLOfNumberCell(): JSX.Element {
    return (
        <ContentEditable
            ref={el}
            html={(value.value && value.value.toString()) || ''}
            onChange={fnOnChange}
            onBlur={fnOnBlur}
            onFocus={fnOnFocus}
            className="data-input data-input-number text-align-right"
        />
    );
  }

  /**
   * Return Element for DataType.TEXT for a Cell.
   * @returns {JSX.Element}
   * @private
   */
  function _getHTMLOfTextCell(): JSX.Element {
    return (
        <ContentEditable
            ref={el}
            html={(value.value && value.value.toString()) || ''}
            onChange={fnOnChange}
            onBlur={fnOnBlur}
            className="data-input data-input-text"
        />
    );
  }

  // Focus Combobox on add?
  useEffect(() => {
    if (addSelectRef && showAdd) {
      addSelectRef.focus();
    }
  }, [addSelectRef, showAdd]);

  // Preset initial value
  useEffect(() => {
    setValue({ value: initialValue, update: false });
  }, [initialValue]);

  // Update value
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

  return _getCellElement(dataType);
}
