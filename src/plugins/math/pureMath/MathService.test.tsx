import { render, screen } from '@testing-library/react';
import React, { useContext } from 'react';

import { addFormulaToHistory, MathServiceComponent, MathServiceContext } from './MathService';


function ComponentForContext() {
  let value = useContext(MathServiceContext);

  return (
      <div className="history-formulas" data-testid="history">
        {value.history}
      </div>
  );
}


describe('plugins.math.pureMath.MathService', () => {
  test('Should provide empty context', () => {
    render(
        <MathServiceComponent>
          <ComponentForContext/>
        </MathServiceComponent>
    );

    let providedContext = screen.getByTestId('history');

    expect(providedContext.innerHTML).toBe('');
  });


  test('Should provide context with formulas', () => {
    addFormulaToHistory('=2+2');
    addFormulaToHistory('=3+3');

    render(
        <MathServiceComponent>
          <ComponentForContext/>
        </MathServiceComponent>
    );

    let providedContext = screen.getByTestId('history');

    expect(providedContext.innerHTML).toBe('=2+2,=3+3');
  });
});
