import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import CalculateCellsFormulas from './CalculateCellsFormulas';


describe('plugins.math.pureMath.CalculateCellsFormulas', () => {
  test('Should counts formula on "Enter", set value to the cell and HistoryFormulas', () => {
    render(
      <CalculateCellsFormulas>
        <div tabIndex={22}>
          <div className="data-input-number" data-testid="keypress"></div>
        </div>
      </CalculateCellsFormulas>
    );

    let cell = screen.getByTestId('keypress');

    expect(cell).not.toBeNull();

    cell.innerHTML = '=2+2';
    fireEvent.keyPress(cell, { charCode: 13 });

    expect(cell.innerHTML).toBe('4');
  });


  test('Should shows formula "on focus" and shows result "on blur" for lase entered ("on enter") formula', () => {
    render(
      <CalculateCellsFormulas>
        <div tabIndex={33}>
          <div tabIndex={55} className="data-input-number" data-testid="focus-blur"></div>
        </div>
      </CalculateCellsFormulas>
    );

    let cell = screen.getByTestId('focus-blur');

    expect(cell).not.toBeNull();

    cell.innerHTML = '=3+3';
    fireEvent.keyPress(cell, { charCode: 13 });

    expect(cell.innerHTML).toBe('6');

    cell.innerHTML = '=3+3+3';
    cell.focus();

    expect(cell.innerHTML).toBe('=3+3');

    cell.innerHTML = '=3+3+3';
    cell.blur();

    expect(cell.innerHTML).toBe('6');
  });
});
