import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import { handleKeyPress, handleFocus, handleBlur, findFormula } from './handlersCountCellsData';
import { TFormulaObj } from './storeMath';


globalThis.IS_REACT_ACT_ENVIRONMENT = true;
let container: null | HTMLDivElement = null;
let root: Root;

beforeEach(() => {
  container = document.createElement('div');
  root = createRoot(container);
  document.body.appendChild(container);
});

afterEach(() => {
  if (container instanceof HTMLDivElement) {
    act(() => root.unmount());
    container.remove();
    container = null;
  }
});

describe('plugins.math.pureMath.handlersCountCellsData', () => {
  it('On "Enter" counts formula and set value to the cell', () => {
    act(() => {
      root.render(
        <div onKeyPress={handleKeyPress}>
          <div className="data-input-number" data-testid="keypress"></div>
        </div>
      );
    });

    let cell = document.querySelector("[data-testid='keypress']") as HTMLElement;

    cell.innerHTML = '=2+2';
    act(() => {
      cell.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true, keyCode: 13 }));
    });

    expect(cell.innerHTML).toBe('4');
  });


  it('On focus shows formula into the cell', () => {
    act(() => {
      root.render(
        <div tabIndex={33} onKeyPress={handleKeyPress} onFocus={handleFocus}>
          <div tabIndex={44} className="data-input-number"></div>
        </div>
      );
    });

    let cell = document.querySelector('.data-input-number') as HTMLElement;

    expect(cell).not.toBeNull();
    cell.innerHTML = '=3+3';

    act(() => {
      cell.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true, keyCode: 13 }));
    });
    expect(cell.innerHTML).toBe('6');

    act(() => {
      cell.focus();
    });

    expect(cell).toHaveFocus();
    expect(cell.innerHTML).toEqual('=3+3');
  });


  it('On blur shows result of previous count formula into the cell', () => {
    act(() => {
      root.render(
        <div tabIndex={55} onKeyPress={handleKeyPress} onFocus={handleFocus} onBlur={handleBlur}>
          <div tabIndex={66} className="data-input-number"></div>
        </div>
      );
    });

    let cell = document.querySelector('.data-input-number') as HTMLElement;

    expect(cell).not.toBeNull();
    cell.innerHTML = '=4+4';

    act(() => {
      cell.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true, keyCode: 13 }));
    });
    expect(cell.innerHTML).toBe('8');

    act(() => {
      cell.blur();
    });

    expect(cell).not.toHaveFocus();
    expect(cell.innerHTML).toBe('8');
  });


  it('The function finds formula into the store', () => {
    act(() => {
      root.render(
        <div tabIndex={77} onKeyPress={handleKeyPress} onFocus={handleFocus} onBlur={handleBlur}>
          <div className="data-input-number"></div>
        </div>
      );
    });

    let cell = document.querySelector('.data-input-number') as HTMLElement;
    let findFormulaElem: TFormulaObj = { formula: '', id: 0, result: '' };

    expect(cell).not.toBeNull();
    cell.innerHTML = '=4+4';

    act(() => {
      cell.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true, keyCode: 13 }));
    });
    expect(cell.innerHTML).toBe('8');

    act(() => {
      findFormulaElem = findFormula(77);
    });

    expect({ formula: '=4+4', id: 77, result: '8' }).toEqual(findFormulaElem);
  });
});
