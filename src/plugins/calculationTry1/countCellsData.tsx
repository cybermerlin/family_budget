import React from "react";
import { handleKeyPress, handleFocus, handleBlur } from "./handlersCountCellsData";
import HistoryFormulas from "./historyFormulas";
import { MathService } from "./MathService";


export default function CountCellsData(props: { children: JSX.Element }) {
  return (
    <MathService>
      <>
        <HistoryFormulas />
        <div onFocus={handleFocus} onBlur={handleBlur} onKeyPress={handleKeyPress}>
          {props.children}
        </div>
      </>
    </MathService>
  );
}
