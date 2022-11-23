import MathCalculator from './MathCalculator';
import { addFormula, IFormulaObj, STORE_MATH } from './storeMath';


function handleKeyPress(e: React.KeyboardEvent) {
  if (e.target instanceof Element) {
    let { target } = e;
    let formula = target.innerHTML;

    if (e.key === 'Enter' && formula.startsWith('=') && target.classList.contains('data-input-number')) {
      e.preventDefault();
      let result = MathCalculator(formula);

      if (Number.isInteger(result)) {
        target.innerHTML = result.toString();
        STORE_MATH.dispatch(addFormula(formula, result.toString(), target.parentElement.tabIndex));
      }
      if (result instanceof Error) { alert(result.message); }
    }
  }
}

function handleFocus(e: React.FocusEvent) {
  let { target } = e;

  if (target.classList.contains('data-input-number')) {
    let result = findFormula(target.parentElement.tabIndex);

    if (result) { target.innerHTML = result.formula; }
  }
}

function handleBlur(e: React.FocusEvent) {
  let { target } = e;

  if (target.classList.contains('data-input-number')) {
    let result = findFormula(target.parentElement.tabIndex);

    if (result) { target.innerHTML = result.result; }
  }
}

function findFormula(tabIndex: number): IFormulaObj {

  return STORE_MATH.getState().find(({ id }) => id === tabIndex);
}

export { handleKeyPress, handleFocus, handleBlur, findFormula };
