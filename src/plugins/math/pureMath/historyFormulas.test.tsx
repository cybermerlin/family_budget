import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import HistoryFormulas from './historyFormulas';
import { MathServiceComponent, addFormulaToHistory } from './MathService';


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


describe('plugins.math.pureMath.historyFormulas', () => {
  it('On "Enter" adds formula and render it to the history component', () => {
    
    act(() => {
      root.render(<MathServiceComponent><HistoryFormulas /></MathServiceComponent>);
    });
    
    act(() => {
      addFormulaToHistory('=2+2');
      document.body.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, keyCode: 13, key: 'Enter' }));
    });

    let formula = document.querySelectorAll('li')[0];

    expect(formula.innerHTML).toBe('=2+2');
  });

 
  it('The length of the list should not be more than 6', () => {

    act(() => {
      root.render(<MathServiceComponent><HistoryFormulas /></MathServiceComponent>);
    });
    
    act(() => {
      for (let i = 0; i < 10; i++){
        addFormulaToHistory(`=3+3+${i}`);
        document.body.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, keyCode: 13, key: 'Enter' }));
      }
    });

    let formula = document.querySelectorAll('li');

    expect(formula[0].innerHTML).toBe('=3+3+4');
    expect(formula[5].innerHTML).toBe('=3+3+9');
    expect(formula.length).toBe(6);
  });
});
