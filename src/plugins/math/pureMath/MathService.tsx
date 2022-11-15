import React, { createContext } from 'react';


export type THistoryFormulas = {
  history: string;
};

let historyFormulas = { history: '' };
const MathServiceContext: React.Context<THistoryFormulas> = createContext(null);

function MathServiceComponent(props: { children: JSX.Element }) {
  return <MathServiceContext.Provider value={historyFormulas}>{props.children}</MathServiceContext.Provider>;
}


export { historyFormulas, MathServiceContext, MathServiceComponent };
