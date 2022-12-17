import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import EditableGrid from './EditableGrid';


describe('lib.math.editableGrid.Cell', () => {
  test('Should select all text into the cell by first click', async () => {
    const user = userEvent.setup()
    render(
        <EditableGrid />
    );

    let cells = screen.getAllByText(/(?<![-.])\b[0-9]+\b(?!\.[0-9])/);

    await user.click(cells[0])
    expect(cells[0]).toHaveFocus();

    let selection = document.getSelection()?.toString();
    expect(cells[0].innerHTML).toBe(selection);
  });

  test('Should remove the selection into the cell by second click', async () => {
    const user = userEvent.setup()
    render(
        <EditableGrid />
    );

    let cells = screen.getAllByText(/(?<![-.])\b[0-9]+\b(?!\.[0-9])/);

    await user.click(cells[0])
    expect(cells[0]).toHaveFocus();
    
    await user.click(cells[0])
    expect(cells[0]).toHaveFocus();

    let selection = document.getSelection()?.toString()
    expect(selection).toBe('');
  });
});
