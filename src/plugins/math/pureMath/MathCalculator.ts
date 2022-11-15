import { historyFormulas } from './MathService'


/**
 * Перевод\статичные фразы-ответов пользователю
 */
const ERROR_MESSAGES = Object.freeze({
  formula: 'Проверьте формулу, она некорректна',
  symbols:
    "Некорректные символы в формуле!\n Допустимы цифры 0-9, -, +, *, /, (, ), . \n Формула должна начинаться с '='"
});


/**
 * Функция вычисления любых формул переданных строкой через параметр
 */
function MathCalculator(formula: string): number | Error {
  let result: number | Error = new Error(ERROR_MESSAGES.symbols);

  //   Проверка корректности формулы
  if (!formula.slice(1).match(/[^0-9.+-/*()]/g)) {
    //   Вычисление формулы
    try {
      // eslint-disable-next-line no-eval
      result = eval(formula.slice(1)); //NOSONAR
    } catch (err) {}

    //   Контроль успеха вычисления
    if (!Number.isFinite(result)) {
      //     Обработка НЕ успеха вычисления
      result = new Error(ERROR_MESSAGES.formula);

    } else {

      //     Обработка успеха
      //       Добавление в историю последних ис-ых формул
      let arr = historyFormulas.history.split(',');

      if (arr.length > 5) {
        arr.shift();
      }
      arr.push(formula);
      if (arr[0] === '') {
        arr.shift();
      }
      historyFormulas.history = arr.join(',');
    }
  }

  return result;
}

export { MathCalculator };
