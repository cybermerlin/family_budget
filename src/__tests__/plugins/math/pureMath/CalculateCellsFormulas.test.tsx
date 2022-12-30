import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import CalculateCellsFormulas from 'src/plugins/math/pureMath/CalculateCellsFormulas';


describe('plugins.math.pureMath.CalculateCellsFormulas', () => {
  test('Should counts formula on "Enter", set value to the cell and HistoryFormulas', () => {
    render(
        <CalculateCellsFormulas>
          <div id="cell-22" tabIndex={22}>
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
          <div id="cell-33" tabIndex={33}>
            <div id="cell-55" tabIndex={55} className="data-input-number" data-testid="focus-blur"></div>
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
