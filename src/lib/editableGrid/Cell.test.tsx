import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import EditableGrid from './EditableGrid';


describe('lib.math.editableGrid.Cell', () => {
  test('Should select all text into the cell by first click', async () => {
    const USER = userEvent.setup();

    render(
        <EditableGrid />
    );

    let cells = screen.getAllByText(/(?<![.-])\b\d+\b(?!\.\d)/);

    await USER.click(cells[0])
    expect(cells[0]).toHaveFocus();

    let selection = document.getSelection()?.toString();

    expect(cells[0].innerHTML).toBe(selection);
  });

  test('Should remove the selection into the cell by second click', async () => {
    const USER = userEvent.setup();

    render(
        <EditableGrid />
    );

    let cells = screen.getAllByText(/(?<![.-])\b\d+\b(?!\.\d)/);

    await USER.click(cells[0])
    expect(cells[0]).toHaveFocus();

    await USER.click(cells[0])
    expect(cells[0]).toHaveFocus();

    let selection = document.getSelection()?.toString();

    expect(selection).toBe('');
  });

  test('Shouldn\'t work if the cell is not instance of DIV', async () => {
    const USER = userEvent.setup();

    render(
        <EditableGrid />
    );

    // Get all cells
    let cells = screen.getAllByText(/(?<![.-])\b\d+\b(?!\.\d)/);

    // Сreate new cell with span-tag
    let newCell = document.createElement("span");

    newCell.setAttribute("id", "newCell");

    let text = document.createTextNode(cells[0].innerHTML);

    newCell.appendChild(text);

    // Insert span-cell
    // eslint-disable-next-line testing-library/no-node-access
    cells[0].parentNode?.replaceChild(newCell, cells[0]);

    // Get new cells
    let newCells = screen.getAllByText(/(?<![.-])\b\d+\b(?!\.\d)/);

    expect(newCells[0].innerHTML).toBe(cells[0].innerHTML);

    // Span-cell doesn't work
    await USER.click(newCells[0])
    expect(newCells[0]).not.toHaveFocus();

    let noSelection = document.getSelection()?.toString();

    expect(noSelection).toBe('');

    // Div-cell(normal) works
    await USER.click(newCells[2])
    expect(newCells[2]).toHaveFocus();

    let selection = document.getSelection()?.toString();

    expect(selection).toBe(newCells[2].innerHTML);
  });
});
