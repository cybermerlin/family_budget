export default function checkCellsFormula(formula) {
  if (!formula.slice(1).match(/[^0-9.+-/*()]/g)) return true;
  return false;
}
