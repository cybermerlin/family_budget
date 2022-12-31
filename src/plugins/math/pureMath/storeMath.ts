import { AnyAction } from '@reduxjs/toolkit';
import { legacy_createStore as createStore } from 'redux';


export interface IFormulaObj {
  formula: string;
  id: string;
  result: string;
  type?: string;
}


const ADD_FORMULA = 'ADD_FORMULA';

const STORE_MATH = createStore(reducerMath);

function addFormula(formula: string, result: string, id: string): AnyAction {
  return {
    id,
    formula,
    result,
    type: ADD_FORMULA
  };
}

/**
 * This reduser is used only in Redux and change state of cells (fomula and result)
 */
function reducerMath(state: IFormulaObj[] = [], action: AnyAction): IFormulaObj[] {
  switch (action.type) {
    case ADD_FORMULA:
      state.push({ id: action.id, formula: action.formula, result: action.result });
      break;
  }

  return state;
}

export { STORE_MATH, reducerMath, addFormula };
