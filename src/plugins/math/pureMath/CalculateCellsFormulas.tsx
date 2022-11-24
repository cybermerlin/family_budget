import { handleBlur, handleFocus, handleKeyPress } from "./handlersCountCellsData";
import HistoryFormulas from "./historyFormulas";
import { MathServiceComponent } from "./MathService";


export default function CalculateCellsFormulas(props: { children: JSX.Element }) {
  return (
      <MathServiceComponent>
        <>
          <HistoryFormulas/>
          <div onFocus={handleFocus} onBlur={handleBlur} onKeyPress={handleKeyPress}>
            {props.children}
          </div>
        </>
      </MathServiceComponent>
  );
}
