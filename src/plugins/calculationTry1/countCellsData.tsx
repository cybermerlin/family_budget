import React from "react";
import handleKeyPress from "./handleKeyPress";

export default function CountCellsData(prop: JSX.Element) {
  return <div onKeyPress={handleKeyPress}>{prop}</div>;
}
