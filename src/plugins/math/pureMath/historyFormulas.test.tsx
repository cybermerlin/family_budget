import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import HistoryFormulas from './historyFormulas';
import { addFormulaToHistory, MathServiceComponent } from './MathService';


describe('plugins.math.pureMath.historyFormulas', () => {
  test('On "Enter" adds formula and render it to the history component', async () => {
    render(
        <MathServiceComponent>
          <HistoryFormulas/>
        </MathServiceComponent>
    );

    addFormulaToHistory('=2+2');
    userEvent.keyboard('{Enter}');

    let formula = await screen.findByText('=2+2');

    expect(formula.innerHTML).toBe('=2+2');
  });


  it('The length of the list should not be more than 6', async () => {
    render(
        <MathServiceComponent>
          <HistoryFormulas/>
        </MathServiceComponent>
    );

    for (let i = 0; i < 10; i++) {
      addFormulaToHistory(`=3+3+${i}`);
      userEvent.keyboard('{Enter}');
    }

    // This line hold finding list of formulas below, till render all formulas
    await screen.findByText('=3+3+5');

    let list = await screen.findByRole('list');
    let { getAllByRole } = within(list);
    let formulas = getAllByRole('listitem');

    expect(formulas[0].innerHTML).toBe('=3+3+4');
    expect(formulas[5].innerHTML).toBe('=3+3+9');
    expect(formulas.length).toBe(6);
  });
});
