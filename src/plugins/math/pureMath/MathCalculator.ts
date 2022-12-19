import { addFormulaToHistory } from './MathService'


/**
 * Redirection\static phrases-answers to the user
 */
const ERROR_MESSAGES = Object.freeze({
  formula: 'Проверьте формулу, она некорректна',
  symbols:
      "Некорректные символы в формуле!\n Допустимы цифры 0-9, -, +, *, /, (, ), . \n Формула должна начинаться с '='"
});

/**
 * The function of calculating any formulas passed as a string through a parameter
 */
export default function MathCalculator(formula: string): number | Error {
  let result: number | Error = new Error(ERROR_MESSAGES.symbols);

  //   Formula validation
  if (!formula.slice(1).match(/[^\d()*+-/]/g)) {
    //   Formula calculation
    try {
      // eslint-disable-next-line no-eval
      result = eval(formula.slice(1)); //NOSONAR
    }
    catch (err) {}

    //   Calculation success control
    if (!Number.isFinite(result)) {
      //     Handling failure
      result = new Error(ERROR_MESSAGES.formula);

    }
    else {
      //     Handling success
      //     Adding to recently used formulas history
      addFormulaToHistory(formula);
    }
  }

  return result;
}
