import React from 'react';
import { MathCalculator } from './MathCalculator';
import { storeMath, add_formula, TFormulaObj } from './storeMath';

function handleKeyPress(e: React.KeyboardEvent) {
  if (e.target instanceof Element) {
    let target = e.target;
    let formula = target.innerHTML;

    if (e.key === 'Enter' && formula.startsWith('=') && target.classList.contains('data-input-number')) {
      e.preventDefault();
      let result = MathCalculator(formula);

      if (Number.isInteger(result) && target.parentNode instanceof HTMLElement) {
        target.innerHTML = result.toString();
        storeMath.dispatch(add_formula(formula, result.toString(), target.parentNode.tabIndex));
      }
      if (result instanceof Error) { alert(result.message); }
    }
  }
}

function handleFocus(e: React.FocusEvent) {
  let target = e.target;

  if (target.classList.contains('data-input-number') && target.parentNode instanceof HTMLElement) {
    let result = findFormula(target.parentNode.tabIndex);
    if (result) { target.innerHTML = result.formula; }
  }
}

function handleBlur(e: React.FocusEvent) {
  let target = e.target;

  if (target.classList.contains('data-input-number') && target.parentNode instanceof HTMLElement) {
    let result = findFormula(target.parentNode.tabIndex);
    if (result) { target.innerHTML = result.result; }
  }
}

function findFormula(tabIndex: number): TFormulaObj {
  let elem = storeMath.getState().find((item) => item.id === tabIndex);
  return elem;
}

export { handleKeyPress, handleFocus, handleBlur, findFormula };
