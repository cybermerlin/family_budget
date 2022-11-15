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

    const cell = document.querySelector("[data-testid='keypress']") as Element;
    cell.innerHTML = '=2+2';

    act(() => {
      cell.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true, keyCode: 13 }));
    });

    expect(cell.innerHTML).toBe('4');
  });


  it('On focus shows formula into the cell', () => {
    act(() => {
      root.render(
        <>
        <div tabIndex={33} onKeyPress={handleKeyPress} onFocus={handleFocus}>
          <div tabIndex={44} className="data-input-number" data-testid="focus"></div>
        </div>
        <div>
          <div className="data-input-number" data-testid="change-focus"></div>
        </div>
        </>
      );
    });

    const CELL: HTMLElement|null = document.querySelector("[data-testid='focus']"),
      CELL_NEXT: HTMLElement|null = document.querySelector("[data-testid='change-focus']");

    expect(CELL && CELL_NEXT).not.toBeNull();

    (CELL as HTMLElement).innerHTML = '=3+3';
    
    act(() => {
      CELL?.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true, keyCode: 13 }));
    });
    act(() => {
      CELL_NEXT?.click();
    });
    expect(CELL?.innerHTML).toBe('6');
    
    act(() => {
      CELL?.focus();
    });
    
    expect(CELL).toHaveFocus();
    expect(CELL?.innerHTML).toEqual('=3+3');
  });


  it('On blur shows result of previous count formula into the cell', () => {
    act(() => {
      root.render(
        <div tabIndex={55} onKeyPress={handleKeyPress} onFocus={handleFocus} onBlur={handleBlur}>
          <div tabIndex={66} className="data-input-number" data-testid="blur"></div>
        </div>
      );
    });

    const CELL: HTMLElement|null = document.querySelector("[data-testid='blur']");

    expect(CELL).not.toBeNull();

    (CELL as HTMLElement).innerHTML = '=4+4';
    
    act(() => {
      CELL?.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true, keyCode: 13 }));
    });
    expect(CELL?.innerHTML).toBe('8');
    
    act(() => {
      CELL?.blur();
    });
    
    expect(CELL).not.toHaveFocus();
    expect(CELL?.innerHTML).toBe('8');
  });


  it('The function finds formula into the store', () => {
    act(() => {
      root.render(
        <div tabIndex={77} onKeyPress={handleKeyPress} onFocus={handleFocus} onBlur={handleBlur}>
          <div className="data-input-number" data-testid="blur"></div>
        </div>
      );
    });

    const CELL: HTMLElement|null = document.querySelector("[data-testid='blur']");
    let findFormulaElem: TFormulaObj = {formula: '', id: 0, result: ''};

    expect(CELL).not.toBeNull();

    (CELL as HTMLElement).innerHTML = '=4+4';
    
    act(() => {
      CELL?.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true, keyCode: 13 }));
    });
    expect(CELL?.innerHTML).toBe('8');
    
    act(() => {
      findFormulaElem = findFormula(77);
    });
    
    expect({"formula": "=4+4", "id": 77, "result": "8"}).toEqual(findFormulaElem);
  });
});
