import { MathCalculator } from './MathCalculator';


describe('plugins.math.pureMath.MathCalculator', () => {
  it('Returns a number for a correct formula', () => {
    const SOLUTION = MathCalculator('=2+2');

    expect(typeof SOLUTION).toBe('number');
  });

  it('Returns an Error for uncorrect symbols in a formula', () => {
    const SOLUTION = MathCalculator('=some uncorrect symbols');

    expect(typeof SOLUTION).toEqual(typeof new Error());
  });

  it('Returns an Error for uncorrect syntax in a formula', () => {
    const SOLUTION = MathCalculator('=2+2(3+3)))');

    expect(typeof SOLUTION).toEqual(typeof new Error());
  });

  it('Returns an Error when solution of a formula is Infinity', () => {
    const SOLUTION = MathCalculator('=100/0');

    expect(typeof SOLUTION).toEqual(typeof new Error());
  });
});
