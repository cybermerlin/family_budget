import { AnyAction } from '@reduxjs/toolkit';
import { legacy_createStore as createStore } from 'redux';


export type TFormulaObj = {
  type?: string;
  id: number;
  formula: string;
  result: string;
};

const ADD_FORMULA = 'ADD_FORMULA';

const storeMath = createStore(reducerMath);

function add_formula(formula: string, result: string, id: number): AnyAction {
  return {
    type: ADD_FORMULA,
    id: id,
    formula: formula,
    result: result,
  };
}

function reducerMath(state: TFormulaObj[] = [], action: AnyAction): TFormulaObj[] {
  switch (action.type) {
    case ADD_FORMULA:
      state.push({ id: action.id, formula: action.formula, result: action.result });
      return state;
    default:
      return state;
  }
}

export { storeMath, reducerMath, add_formula };
