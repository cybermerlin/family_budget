import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { findFormula, handleBlur, handleFocus, handleKeyPress } from './handlersCountCellsData';
import { IFormulaObj } from './storeMath';


describe('plugins.math.pureMath.handlersCountCellsData', () => {
  test('On "Enter" counts formula and set value to the cell', () => {
    render(
        <div onKeyPress={handleKeyPress}>
          <div className="data-input-number" data-testid="keypress"></div>
        </div>
    );

    let cell = screen.getByTestId('keypress');

    expect(cell).not.toBeNull();

    cell.innerHTML = '=2+2';
    fireEvent.keyPress(cell, { charCode: 13 });

    expect(cell.innerHTML).toBe('4');
  });


  test('On focus shows formula into the cell', () => {
    render(
        <div id="cell-33" tabIndex={33} onKeyPress={handleKeyPress} onFocus={handleFocus}>
          <div id="cell-44" tabIndex={44} className="data-input-number" data-testid="focus"></div>
        </div>
    );

    let cell = screen.getByTestId('focus');

    expect(cell).not.toBeNull();

    cell.innerHTML = '=3+3';
    fireEvent.keyPress(cell, { charCode: 13 });

    expect(cell.innerHTML).toBe('6');

    cell.focus();

    expect(cell).toHaveFocus();
    expect(cell.innerHTML).toBe('=3+3');
  });


  test('On blur shows result of previous count formula into the cell', () => {
    render(
        <div id="cell-55" tabIndex={55} onKeyPress={handleKeyPress} onFocus={handleFocus} onBlur={handleBlur}>
          <div id="cell-66" tabIndex={66} className="data-input-number" data-testid="blur"></div>
        </div>
    );

    let cell = screen.getByTestId('blur');

    expect(cell).not.toBeNull();

    cell.innerHTML = '=4+4';
    fireEvent.keyPress(cell, { charCode: 13 });

    expect(cell.innerHTML).toBe('8');

    cell.blur();

    expect(cell).not.toHaveFocus();
    expect(cell.innerHTML).toBe('8');
  });


  test('The function finds formula into the store', () => {
    render(
        <div id="cell-77" tabIndex={77} onKeyPress={handleKeyPress} onFocus={handleFocus} onBlur={handleBlur}>
          <div className="data-input-number" data-testid="find"></div>
        </div>
    );

    let cell = screen.getByTestId('find');
    let findFormulaElem: IFormulaObj = { formula: '', id: '', result: '' };

    expect(cell).not.toBeNull();

    cell.innerHTML = '=5+5';
    fireEvent.keyPress(cell, { charCode: 13 });

    expect(cell.innerHTML).toBe('10');

    findFormulaElem = findFormula('cell-77');

    expect({ formula: '=5+5', id: 'cell-77', result: '10' }).toEqual(findFormulaElem);
  });
});
