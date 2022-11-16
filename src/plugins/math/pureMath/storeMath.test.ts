import { reducerMath, add_formula, TFormulaObj } from './storeMath';


describe('plugins.math.pureMath.StoreMath', () => {
  it('Should return the initial state', () => {
    expect(reducerMath(undefined, { type: undefined })).toEqual([]);
  });


  it('Should handle a formula being added to an empty list', () => {
    let previousState: TFormulaObj[] = [];

    expect(reducerMath(previousState, add_formula('=2+2', '4', 1))).toEqual([
      { id: 1, formula: '=2+2', result: '4' }
    ]);
  });


  it('Should handle a formula being added to an existing list', () => {
    let previousState: TFormulaObj[] = [{ id: 2, formula: '=3+3', result: '6' }];

    expect(reducerMath(previousState, add_formula('=4+4', '8', 3))).toEqual([
      { id: 2, formula: '=3+3', result: '6' },
      { id: 3, formula: '=4+4', result: '8' },
    ]);
  });
});
