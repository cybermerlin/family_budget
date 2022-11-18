import { useContext, useState } from "react";
import { MathServiceContext } from "./MathService";


export default function HistoryFormulas() {
  let value = useContext(MathServiceContext);
  let [history, setHistory] = useState(value.history);

  document.addEventListener("keyup", (e) => {
    e.key === "Enter" && setHistory(value.history);
  });

  return (
    <div>
      <h4>История формул:</h4>
      <ol>
        {history.split(",").map((elem) => (
          <li key={elem}>{elem}</li>
        ))}
      </ol>
    </div>
  );
}
