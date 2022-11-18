import { reducerMath, addFormula, IFormulaObj } from './storeMath';


describe('plugins.math.pureMath.StoreMath', () => {
  test('Should return the initial state', () => {
    expect(reducerMath(undefined, { type: undefined })).toEqual([]);
  });


  test('Should handle a formula being added to an empty list', () => {
    let previousState: IFormulaObj[] = [];

    expect(reducerMath(previousState, addFormula('=2+2', '4', 1))).toEqual([
      { id: 1, formula: '=2+2', result: '4' }
    ]);
  });


  test('Should handle a formula being added to an existing list', () => {
    let previousState: IFormulaObj[] = [{ id: 2, formula: '=3+3', result: '6' }];

    expect(reducerMath(previousState, addFormula('=4+4', '8', 3))).toEqual([
      { id: 2, formula: '=3+3', result: '6' },
      { id: 3, formula: '=4+4', result: '8' },
    ]);
  });
});
