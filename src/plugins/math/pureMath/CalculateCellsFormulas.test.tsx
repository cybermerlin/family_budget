import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import CalculateCellsFormulas from './CalculateCellsFormulas';


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


describe('plugins.math.pureMath.CalculateCellsFormulas', () => {
  it('Should counts formula on "Enter", set value to the cell and HistoryFormulas', () => {
    act(() => {
      root.render(
        <CalculateCellsFormulas>
          <div tabIndex={22}>
            <div className="data-input-number" data-testid="keypress"></div>
          </div>
        </CalculateCellsFormulas>
      );
    });

    let cell = document.querySelector("[data-testid='keypress']") as Element;
    cell.innerHTML = '=2+2';

    act(() => {
      cell.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true, keyCode: 13 }));
    });

    expect(cell.innerHTML).toBe('4');
  });


  it('Should shows formula "on focus" and shows result "on blur" for lase entered ("on enter") formula', () => {
    act(() => {
      root.render(
        <CalculateCellsFormulas>
            <div tabIndex={33}>
              <div tabIndex={55} className="data-input-number"></div>
            </div>
        </CalculateCellsFormulas>
      );
    });

    let cell = document.querySelector(".data-input-number") as HTMLElement;
    cell.innerHTML = '=3+3';
    
    act(() => {
      cell.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true, keyCode: 13 }));
    });
    expect(cell.innerHTML).toBe('6');
    
    
    cell.innerHTML = '=3+3+3';
    act(() => {
      cell.focus();
    });
    expect(cell.innerHTML).toBe('=3+3');
    
    
    cell.innerHTML = '=3+3+3';
    act(() => {
      cell.blur();
    });
    expect(cell.innerHTML).toBe('6');
  });
  
});
