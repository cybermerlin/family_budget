import MathCalculator from './MathCalculator';


describe('plugins.math.pureMath.MathCalculator', () => {
  test('Returns a number for a correct formula', () => {
    const SOLUTION = MathCalculator('=2+2');

    expect(typeof SOLUTION).toBe('number');
  });

  test('Returns an Error for uncorrect symbols in a formula', () => {
    const SOLUTION = MathCalculator('=some uncorrect symbols');

    expect(SOLUTION).toBeInstanceOf(Error);
  });

  test('Returns an Error for uncorrect syntax in a formula', () => {
    const SOLUTION = MathCalculator('=2+2(3+3)))');

    expect(SOLUTION).toBeInstanceOf(Error);
  });

  test('Returns an Error when solution of a formula is Infinity', () => {
    const SOLUTION = MathCalculator('=100/0');

    expect(SOLUTION).toBeInstanceOf(Error);
  });
});
