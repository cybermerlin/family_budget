import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ContentEditable from 'react-contenteditable';
import { usePopper } from 'react-popper';
import Badge from './Badge';
import { grey } from './colors';
import PlusIcon from './img/Plus';
import { ACTION_TYPES, DATA_TYPES, randomColor } from './utils';
import { findFormula } from "../../plugins/math/pureMath/handlersCountCellsData";


export default function Cell({
                               value: initialValue,
                               row: { index },
                               column: { id, dataType, options },
                               dataDispatch
                             }) {
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

  function handleOptionKeyDown(e) {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        dataDispatch({
          type: ACTION_TYPES.ADD_OPTION_TO_COLUMN,
          option: e.target.value,
          backgroundColor: randomColor(),
          columnId: id
        });
      }
      setShowAdd(false);
    }
  }

  function handleAddOption(e) {
    setShowAdd(true);
  }

  function handleOptionBlur(e) {
    if (e.target.value !== '') {
      dataDispatch({
        type: ACTION_TYPES.ADD_OPTION_TO_COLUMN,
        option: e.target.value,
        backgroundColor: randomColor(),
        columnId: id
      });
    }
    setShowAdd(false);
  }

  function getColor() {
    let match = options.find(option => option.label === value.value);
    return (match && match.backgroundColor) || grey(200);
  }

  function onChange(e) {
    setValue({ value: e.target.value, update: false });
  }

  /**
 * This function is needed to prevent the saving of incomplete formulas (saves the last entered formula in the cell)
 */
  function onBlur(e) {
    let formula = findFormula(e.target.parentNode.tabIndex);
    if (formula) {
      setValue({ value: formula.result, update: true });
    } else {
      setValue((old) => ({ value: old.value, update: true }));
    }
  }

  function handleOptionClick(option) {
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
              {showSelect &&
               createPortal(
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
        type: ACTION_TYPES.UPDATE_CELL,
        columnId: id,
        rowIndex: index,
        value: value.value
      });
    }
  }, [value, dataDispatch, id, index]);

  return getCellElement();
}
