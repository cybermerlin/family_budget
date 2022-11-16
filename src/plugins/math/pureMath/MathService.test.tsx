import React, { useContext } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

import { MathServiceContext, MathServiceComponent, addFormulaToHistory } from './MathService';


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

function ComponentForContext() {
  let value = useContext(MathServiceContext);

  return <div className="history-formulas">{value.history}</div>;
}

describe('plugins.math.pureMath.MathService', () => {
  it('Should provide empty context', () => {
    act(() => {
      root.render(
        <MathServiceComponent>
          <ComponentForContext />
        </MathServiceComponent>
      );
    });

    let providedContext = document.querySelector('.history-formulas')?.innerHTML;

    expect(providedContext).toBe('');
  });


  it('Should provide context with formulas', () => {
    act(() => {
      addFormulaToHistory('=2+2');
      addFormulaToHistory('=3+3');
    });

    act(() => {
      root.render(
        <MathServiceComponent>
          <ComponentForContext />
        </MathServiceComponent>
      );
    });

    let providedContext = document.querySelector('.history-formulas')?.innerHTML;

    expect(providedContext).toBe('=2+2,=3+3');
  });
});
