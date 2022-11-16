import React, { createContext } from 'react';


export type THistoryFormulas = {
  history: string;
};

let historyFormulas = { history: '' };
const MathServiceContext: React.Context<THistoryFormulas> = createContext(null);

function MathServiceComponent(props: { children: JSX.Element }) {
  return <MathServiceContext.Provider value={historyFormulas}>{props.children}</MathServiceContext.Provider>;
}

function addFormulaToHistory(formula: string): void {
  let arr = historyFormulas.history.split(',');
  let index = arr.findIndex(item => item === formula);

  if (arr[0] === '') { arr.shift(); }

  if (index !== -1){ arr.splice(index, 1); }

  if (arr.length > 5) { arr.shift(); }

  arr.push(formula);
  historyFormulas.history = arr.join(',');
}

export { MathServiceContext, MathServiceComponent, addFormulaToHistory };
