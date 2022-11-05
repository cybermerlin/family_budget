import React, { createContext } from "react";


export type THistoryFormulas = {
  history: string;
};


const ERROR_MESSAGES = Object.freeze({
  formula: "Проверьте формулу, она некорректна",
  symbols:
    "Некорректные символы в формуле!\n Допустимы цифры 0-9, -, +, *, /, (, ), . \n Формула должна начинаться с '='",
});
let historyFormulas = { history: "" };
const MathServiceContext: React.Context<THistoryFormulas> = createContext(null);

function MathService(props: { children: JSX.Element }) {
  return <MathServiceContext.Provider value={historyFormulas}>{props.children}</MathServiceContext.Provider>;
}

function MathCounter(formula: string): number | Error {
  let result: number | Error = new Error(ERROR_MESSAGES.symbols);

  if (!formula.slice(1).match(/[^0-9.+-/*()]/g)) {
    try {
      result = eval(formula.slice(1));
    } catch (err) {}
    if (!Number.isFinite(result)) {
      result = new Error(ERROR_MESSAGES.formula);
    } else {
      let arr = historyFormulas.history.split(",");

      if (arr.length > 5) arr.shift();
      arr.push(formula);
      historyFormulas.history = arr.join(",");
    }
  }

  return result;
}

export { MathCounter, MathServiceContext, MathService };
